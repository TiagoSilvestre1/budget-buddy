<template>
    <v-row justify="center">
		<v-dialog
			v-model="dialogVisible"
			max-width="512"
		>
            <template v-slot:activator="{ props }">
                <v-btn 
                    size="small" 
                    v-bind="props" 
                    variant="text" 
                    class="ml-auto" 
                    icon="mdi-plus"
                ></v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Add collaborator</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                                cols="12"
                                sm="12"
                                md="12"
                            >
                                <v-text-field
                                    v-model="collaboratorEmail"
                                    label="Collaborator Email*"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="12"
                                md="12"
                            >
                                <v-select
                                    v-model="permission"
                                    label="Permissions*"
                                    :items="['Read', 'Write', 'Admin']"
                                    required
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>Required field marked with (*)</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="deep-orange" 
                        variant="tonal"
                        @click="dialogVisible = false"
                    >
                    Close
                    </v-btn>
                    <v-btn
                        color="deep-orange" 
                        variant="tonal"
                        @click="addCollaborator"
                    >
                    Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar top color="error" v-model="errorMsg">
            This Person doesn't exist
        </v-snackbar>
        <v-snackbar top color="error" v-model="sameEmail">
            This Person doesn't exist
        </v-snackbar>
    </v-row>
</template>

<script lang="ts">
	import { backendService, type API } from '@/services/api-service';
	import { mapGetters, useStore } from 'vuex';
    import type { Project } from './../../interfaces/project';
    import type { User } from './../../interfaces/user';

	export default {
		data: () => ({
			dialogVisible: false,
            collaboratorEmail: null,
            errorMsg: false,
            sameEmail: false,
            permission: "Read",
            user: { } as User,
			store: useStore(),
			project: { } as Project,
		}),
		created() {
			this.project = this.getProject;
            this.user = this.getUser
		},
		computed: {
			...mapGetters('auth', ['getUser']),
			...mapGetters('project',['getProject'])
		},
		methods: {
			addCollaborator() {

                if(this.collaboratorEmail == this.user["email"]){
                    this.sameEmail = true;
                    return
                }

                this.findPerson().then((status: User | null) => {
                    if(status == null){
                        this.errorMsg = true;
                        return;
                    }

                    backendService.post('/api/project/addCollaborator', {project_id: this.project["_id"], user_id: status["id"]}, false).then( () => {
                        this.dialogVisible = false;
                        // Update local store to reflect changes
                        backendService.get('/api/project/getProjectById?project_id=' + this.project["_id"]).then((response) => {
                            this.project = response
                            this.store.dispatch("project/SelectProject", this.project).then( () => {
                                this.$emit('collaboratorAdded');
                                }
                            );
                        });
                    });
                });
				
        	},
            async findPerson(): Promise<User | null>{
                try {
                    await backendService.post('/api/user/exist', {user: this.collaboratorEmail}, false);
                    return await backendService.get('/api/user/userByEmail?email=' + this.collaboratorEmail, false);
                } catch (error) {
                    return null;
                }
            
            }
		}
	}
</script>