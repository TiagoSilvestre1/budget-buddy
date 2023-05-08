<template>
    <h1 class="main-title">{{ project["title"] }}</h1>
    
    <v-card
        class="mx-auto"
        max-width="800"
    >
        <v-card-title>
            <h2 class="font-weight-light d-flex justify-content-between">
                <v-icon size="big" icon="mdi-shopping"></v-icon> 
                Product List
                <AddProduct @productAdded="listProducts" v-model="addDialogVisible" />
            </h2>
        </v-card-title> 

        <v-container fluid>
        <v-row dense>
            <v-col
                v-for="products in product_list"
                :key="products.title"
                :cols="products.flex"
            >
                <v-card>
                    <v-img
                    :src="products.src"
                    class="align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                    cover
                    >
                    <v-card-title class="text-white" v-text="products.title"></v-card-title>
                    </v-img>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-row>
                            <v-col cols="6"></v-col>
                            <v-col cols="2">
                                <ViewQuote @productAdded="listProducts" v-model="editDialogVisible" :productId="products.id" />
                            </v-col>
                            <v-col cols="2">
                                <EditProduct @productAdded="listProducts" v-model="editDialogVisible" :productId="products.id" />
                            </v-col>
                            <v-col cols="2">
                                <v-btn size="small" color="surface-variant" variant="text" icon="mdi-delete" @click="removeProduct(products.id)"></v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        </v-container>
    </v-card>
    <v-card
        class="mx-auto"
        max-width="800"
    >
        <v-card-title>
            <h2 class="font-weight-light">
                <v-icon
                size=" big"
                icon="mdi-account-hard-hat"
                ></v-icon> 
                Services List
            </h2>
        </v-card-title> 

        <v-container fluid>
        <v-row dense>
            <v-col
                v-for="service in services_list"
                :key="service.title"
                :cols="service.flex"
            >
                <v-card>
                    <v-img
                    :src="service.src"
                    class="align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                    cover
                    >
                    <v-card-title class="text-white" v-text="service.title"></v-card-title>
                    </v-img>

                    <v-card-actions>
                    
                    <v-spacer></v-spacer>
                    
                    <v-btn size="small" variant="text" icon="mdi-cog" @click="seeProject"></v-btn>

                    <v-btn size="small" color="surface-variant" variant="text" icon="mdi-delete"></v-btn>

                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        </v-container>
    </v-card>
    <RouterView></RouterView>
</template>

<script lang="ts">
import { backendService, type API } from '@/services/api-service';
import { mapGetters, useStore } from 'vuex';
import AddProduct from './addProduct.vue';
import EditProduct from './editProduct.vue';
import ViewQuote from './viewQuote.vue';


export default {
    hello: null,
    data: () => ({
        store: useStore(),
        addDialogVisible: false,
        editDialogVisible: false,
        quoteDialogVisible: false,
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
        product_list: [ ] as Array<any>,
        services_list: [
            { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
            { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
            { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
        ],
    }),
    components: {
        AddProduct,
        EditProduct,
        ViewQuote
    },
    created() {
        this.project = this.getProject;
        this.listProducts();
    },
    computed: {
        ...mapGetters('auth', ['getUser']),
        ...mapGetters('project',['getProject'])
    },
	methods: {
        removeProduct(product_id: number) {
            backendService.get('api/project/removeProductById?product_id=' + product_id, false).then((response: API) => {
                // Update local store to reflect changes
                backendService.get('/api/project/getProjectById?project_id=' + this.project["_id"]).then((response) => {
					this.project = response
					this.store.dispatch("project/SelectProject", this.project).then(()=>{ 
                        this.listProducts();
                    });
				});
            })
         },
        seeProject() {
            console.log(this.getProject);
        },
        listProducts() {
            this.project = this.getProject;
            this.product_list = []
            this.project["products"].forEach((prod_id: any) => {
                backendService.get('api/product/productById?id=' + prod_id, false).then((response) => {
                    const entry = {title: response['name'], 
                                    id: response['_id'],
                                    src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', 
                                    flex: 6}
                    this.product_list.push(entry)
                })
            });
        }
    /*
    seeUser() {
      console.log(this.getUser);
    },
    seeProject() {
      console.log(this.getProject);
    },*/
	},
}
</script>

<style>
    .ml-auto {
    margin-left: auto;
    }
</style>