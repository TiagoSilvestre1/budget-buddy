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
                  sm="6"
                  md="4"
                >
					<v-table>
						<thead>
							<tr>
								<th class="text-left">
								Name
								</th>
								<th class="text-left">
								Calories
								</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="item in desserts"
								:key="item.name"
							>
								<td>{{ item.name }}</td>
								<td>{{ item.calories }}</td>
							</tr>
						</tbody>
					</v-table>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="dialogVisible = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue-darken-1"
              variant="text"
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

    export default {

        data () {
            return {
                dialogVisible: false,
                store: useStore(),
                project: {} as Project,
                product: {} as Product,
				desserts: [
							{
								name: 'Frozen Yogurt',
								calories: 159,
							},
							{
								name: 'Ice cream sandwich',
								calories: 237,
							},
							{
								name: 'Eclair',
								calories: 262,
							},
							{
								name: 'Cupcake',
								calories: 305,
							},
							{
								name: 'Gingerbread',
								calories: 356,
							},
							{
								name: 'Jelly bean',
								calories: 375,
							},
							{
								name: 'Lollipop',
								calories: 392,
							},
							{
								name: 'Honeycomb',
								calories: 408,
							},
							{
								name: 'Donut',
								calories: 452,
							},
							{
								name: 'KitKat',
								calories: 518,
							},
						],
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
            addQuote() {  },
			editQuote() {  },
			removeQuote() {  }
        }
    }
</script>