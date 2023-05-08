<template>
    <h1 class="main-title">{{ project["title"] }}</h1>
    
    <v-card
        class="mx-auto"
        max-width="800"
    >
        <v-card-title>
            <h2 class="font-weight-light d-flex justify-content-between">
                <v-icon size="big" icon="mdi-account-group-outline"></v-icon> 
                Collaborators List
                <AddCollaborator @collaboratorAdded="listCollaborators" v-model="addDialogVisible" />
            </h2>
        </v-card-title> 

        <v-container fluid>
        <v-row dense>
            <v-col
                v-for="collaborator in collaborator_list"
                :key="collaborator.name"
                :cols="collaborator.flex"
            >
                <v-card>
                    <v-img
                    :src="collaborator.src"
                    class="align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                    cover
                    >
                    <v-card-title class="text-white" v-text="collaborator.name"></v-card-title>
                    </v-img>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn size="small" color="surface-variant" variant="text" icon="mdi-delete" @click="removeCollaborator(collaborator.id)"></v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        </v-container>
    </v-card>
    <v-snackbar top color="error" v-model="errorMsg">
        You cannot remove the owner of the project
    </v-snackbar>
    <RouterView></RouterView>
</template>

<script lang="ts">
import { backendService, type API } from '@/services/api-service';
import { mapGetters, useStore } from 'vuex';
import type { User } from './../../interfaces/user';
import type { Project } from './../../interfaces/project';
import AddCollaborator from './addCollaborator.vue';

export default {
    hello: null,
    data: () => ({
        store: useStore(),
        errorMsg: false,
        addDialogVisible: false,
        editDialogVisible: false,
        quoteDialogVisible: false,
        project: { } as Project,
        collaborator_list: [ ] as Array<any>,
        user: {} as User
    }),
    components: {
        AddCollaborator,
    },
    created() {
        this.project = this.getProject;
        this.user = this.getUser
        this.listCollaborators();
    },
    computed: {
        ...mapGetters('auth', ['getUser']),
        ...mapGetters('project',['getProject'])
    },
	methods: {
        listCollaborators() {
            this.project = this.getProject;
            this.collaborator_list.splice(0,this.collaborator_list.length);
            const coll = [...this.project["collaborators"]];
            coll.push(this.user["id"]);
            coll.forEach((coll_id: String) => {
                backendService.get('/api/user/userById?user_id=' + coll_id, false).then((response) => {
                    const entry = {name: response['name'], 
                                    email: response['email'],
                                    id: response['id'],
                                    src: '/src/assets/person_photo.png', 
                                    flex: 6}
                    this.collaborator_list.push(entry)
                })
            });
        },
        removeCollaborator(person_id: String) {
            if(this.project["owner"] == person_id){
                this.errorMsg = true;
                return;
            }

            backendService.post('/api/project/removePersonById', {person_id: person_id, project_id: this.project["_id"]}, false).then((response) => {
                // Update local store to reflect changes
                backendService.get('/api/project/getProjectById?project_id=' + this.project["_id"]).then((response) => {
					this.project = response
					this.store.dispatch("project/SelectProject", this.project).then(()=>{ 
                        this.listCollaborators();
                    });
				});
            })
        }

	},
}
</script>

<style>
    .ml-auto {
        margin-left: auto;
    }
</style>