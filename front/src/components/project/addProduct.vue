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
				<span class="text-h5">Add Product</span>
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
								v-model="productName"
								label="Product Name*"
								required
							></v-text-field>
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
					@click="addProduct"
				>
					Save
				</v-btn>
			</v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
</template>

<script lang="ts">
	import { backendService, type API } from '@/services/api-service';
	import { mapGetters, useStore } from 'vuex';

	export default {
		data: () => ({
			dialogVisible: false,
			productName: null,
			store: useStore(),
			project: {
				products: [],
				_id: String,
				title: String,
				start_date: String,
				finish_date: String,
				budget: Number,
				owner: String,
				collaborators: [],
				__v: Number,
			},
		}),
		created() {
			this.project = this.getProject;
		},
		computed: {
			...mapGetters('auth', ['getUser']),
			...mapGetters('project',['getProject'])
		},
		methods: {
			addProduct() {
				backendService.post('/api/project/addProduct', {name: this.productName, project_id: this.project["_id"]}, false).then( () => {
					this.dialogVisible = false;
					// Update local store to reflect changes
					backendService.get('/api/project/getProjectById?project_id=' + this.project["_id"]).then((response) => {
						this.project = response
						this.store.dispatch("project/SelectProject", this.project).then( () => {
							this.$emit('productAdded');
							}
						);
					});
				});
				
        	}
		}
	}
</script>