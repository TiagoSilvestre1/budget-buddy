<template>
    <v-row justify="center">
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
            <span class="text-h5">{{ product['name'] }} Quotes</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
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
					<v-spacer></v-spacer>

					<v-expansion-panels>
						<v-expansion-panel
							v-for="i in 3"
							:key="i"
							title="Item"
							text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
						></v-expansion-panel>
					</v-expansion-panels>
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
            <v-btn
				color="deep-orange" 
				variant="tonal"
              	@click="dialogVisible = false"
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
	import type { Quote } from '../../interfaces/quote';


    export default {

        data () {
            return {
                dialogVisible: false,
                store: useStore(),
                project: {} as Project,
                product: {} as Product,
				quote_list: [] as Array<Quote>,
				headers: [
					{
						text: 'Url',
						align: 'left',
						sortable: false,
						value: 'name',
					},
					{ text: 'Description', value: 'calories', sortable: false,},
					{ text: 'Price (€)', value: 'euros' },
					{ text: 'Arrival Date', value: 'date' },
				],
				showId: false
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
			removeQuote() {  }
		},
    }
</script>