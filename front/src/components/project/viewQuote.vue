<template>
    <v-row justify="center" style="margin: 0px;">
      <v-dialog
        v-model="dialogVisible"
        max-width="1024"
      >
        <template v-slot:activator="{ props }">
            <v-btn 
				size="small" 
				v-bind="props" 
                color="surface-variant"
				variant="text" 
				icon="mdi-note-edit"
			></v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Quotes: {{ product['name'] }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <!--<v-col
                  cols="12"
                  sm="12"
                  md="12"
                >
					<v-table>
						<thead>
							<tr>
								<th class="text-left">
								Url
								</th>
								<th class="text-left">
								Description
								</th>
								<th class="text-left">
								Price
								</th>
								<th class="text-left">
								Arrival
								</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="quote in quote_list"
								:key="quote._id"
							>
								<td>{{ quote.url }}</td>
								<td>{{ quote.description }}</td>
								<td>{{ quote.price }}</td>
								<td>{{ quote.available }}</td>
							</tr>
						</tbody>
					</v-table>
				</v-col>-->
				<v-col
                  cols="6"
                  sm="6"
                  md="2"
                >
					<add-quote @quoteAdded="getProductInfo" v-model="addQuote" :productId="productId" />
				</v-col>
				<v-col
					cols="12"
					sm="12"
					md="12"
				>
					<div>
						<v-expansion-panels expand-icon="mdi-chevron-down" hide-actions>
							<v-expansion-panel 
								v-for="(quote, index) in quote_list" 
								:key="index"
							>
								<v-expansion-panel-title expand-icon="mdi-menu-down">
										<v-row no-gutters>
											<v-col 
												cols="10" 
												class="d-flex justify-start">
												{{ quote.description }}
											</v-col>
											<v-col
												cols="2"
												class="text--secondary"
											>
												<v-fade-transition leave-absolute>
													<v-btn 
														@click.stop="removeQuote(quote._id)" 
														size="small" 
														color="surface-variant" 
														variant="text" 
														icon="mdi-delete"
													></v-btn>
												</v-fade-transition>
											</v-col>
										</v-row>
								</v-expansion-panel-title>
								<v-expansion-panel-text>
									<v-row>
										<v-col cols="12">
										<p><strong>URL:</strong> {{ quote.url }}</p>
										<p><strong>Price:</strong> {{ quote.price }}</p>
										<p><strong>Arrival Date:</strong> {{ formatDate(quote.available) }}</p>
										</v-col>
									</v-row>
								</v-expansion-panel-text>
							</v-expansion-panel>
						</v-expansion-panels>
					</div>
				</v-col>
              </v-row>
            </v-container>
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
	import type { Quote } from '../../interfaces/quote';
	import AddQuote from './addQuote.vue';


    export default {

        data () {
            return {
                dialogVisible: false,
                store: useStore(),
                project: {} as Project,
                product: {} as Product,
				quote_list: [] as Array<Quote>,
            }
        },
        props: {
            productId: {
                type: String,
                required: true
            }
        },
		components: {
			AddQuote
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
					this.quote_list = []
					this.product["quotes"].forEach((quote_id: any) => {
						backendService.get('api/product/quoteById?id=' + quote_id, false).then((response) => {
							this.quote_list.push(response);
						})
					});
				});
            },
			addQuote() {  },
			editQuote() {  },
			removeQuote(quote_id: number) { 
				backendService.post('/api/product/removeQuote', {id: quote_id}, false).then( () => {
					// Update local store to reflect changes
					backendService.get('/api/project/getProjectById?project_id=' + this.project["_id"]).then((response) => {
						this.project = response;
						this.store.dispatch("project/SelectProject", this.project).then( () => {
							this.getProductInfo();
							}
						);
					});
				});
			},
			formatDate(date: Date): String {
				// Date should be on the toISOString() format
				date = new Date(date);
				// Implement your preferred date formatting method here
				return date.toUTCString();
			},
		},
    }
</script>