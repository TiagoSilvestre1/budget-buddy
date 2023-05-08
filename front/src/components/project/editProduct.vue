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
                color="surface-variant"
				icon="mdi-cog"
			></v-btn>
        </template>
        <v-card>
			<v-card-title>
				<span class="text-h5">Edit Product</span>
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
								v-model="product['name']"
								label="Product Name*"
                                color="orange"
                                disabled
								required
							></v-text-field>
						</v-col>
                        <v-col
							cols="12"
							sm="12"
							md="12"
						>
                            <v-checkbox
                                v-model="product['completed']"
                                :label="'Completed*'"
                                color="orange"
                            ></v-checkbox>
						</v-col>
					</v-row>
				</v-container>
				<small>Required fields marked with (*)</small>
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
					@click="editProduct"
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
    import type { Project } from '../../interfaces/project';
    import type { Product } from '../../interfaces/product';

    export default {

        data () {
            return {
                dialogVisible: false,
                store: useStore(),
                project: {} as Project,
                product: {} as Product,
            }
        },
        props: {
            productId: {
                type: String,
                required: true
            }
        },
		created() {
			this.project = this.getProject;
            this.getProductInfo();
		},
		computed: {
			...mapGetters('auth', ['getUser']),
			...mapGetters('project',['getProject'])
		},
		methods: {
            getProductInfo() {
                backendService.get('/api/product/productById?id=' + this.productId, false).then( (response: any) => {
					this.product = response;
				});
            },
            editProduct() {
                backendService.post('/api/product/setQuoteCompletedStatus', {id: this.productId, completed: this.product['completed']}, false).then( () => {
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