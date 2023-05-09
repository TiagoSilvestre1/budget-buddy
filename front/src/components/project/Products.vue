<template>
  <h1 class="main-title">{{ project['title'] }}</h1>

  <v-card class="mx-auto" max-width="800">
    <v-card-title>
      <h2 class="font-weight-light d-flex justify-content-between">
        <v-icon size="big" icon="mdi-shopping"></v-icon>
        Product List
        <AddProduct @productAdded="listProducts" v-model="addDialogVisible" :type="true" />
      </h2>
    </v-card-title>

    <v-container fluid>
      <v-row dense>
        <v-col v-for="products in product_list" :key="products.title" :cols="products.flex">
          <v-card>
            <v-img
              :src="products.src"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              cover
              style="opacity: 0.5; cursor: not-allowed"
              v-if="products.completed"
            >
              <v-card-title class="text-white" v-text="products.title"></v-card-title>
            </v-img>
            <v-img
              :src="products.src"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              cover
              v-else
            >
              <v-card-title class="text-white" v-text="products.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-row>
                <v-col cols="5"></v-col>
                <v-col cols="2">
                  <ViewQuote
                    @productAdded="listProducts"
                    v-model="editDialogVisible"
                    :productId="products.id"
                  />
                </v-col>
                <v-col cols="2">
                  <EditProduct
                    @productAdded="listProducts"
                    v-model="editDialogVisible"
                    :productId="products.id"
                  />
                </v-col>
                <v-col cols="3">
                  <v-btn
                    size="small"
                    color="surface-variant"
                    variant="text"
                    icon="mdi-delete"
                    @click="removeProduct(products.id)"
                  ></v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <v-card class="mx-auto" max-width="800">
    <v-card-title>
      <h2 class="font-weight-light d-flex justify-content-between">
        <v-icon size=" big" icon="mdi-account-hard-hat"></v-icon>
        Service List
        <AddProduct @productAdded="listProducts" v-model="addDialogVisible" :type="false" />
      </h2>
    </v-card-title>

    <v-container fluid>
      <v-row dense>
        <v-col v-for="service in services_list" :key="service.title" :cols="service.flex">
          <v-card>
            <v-img
              :src="service.src"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              cover
              style="opacity: 0.5; cursor: not-allowed"
              v-if="service.completed"
            >
              <v-card-title class="text-white" v-text="service.title"></v-card-title>
            </v-img>
            <v-img
              :src="service.src"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              cover
              v-else
            >
              <v-card-title class="text-white" v-text="service.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-row>
                <v-col cols="5"></v-col>
                <v-col cols="2">
                  <ViewQuote
                    @productAdded="listProducts"
                    v-model="editDialogVisible"
                    :productId="service.id"
                  />
                </v-col>
                <v-col cols="2">
                  <EditProduct
                    @productAdded="listProducts"
                    v-model="editDialogVisible"
                    :productId="service.id"
                  />
                </v-col>
                <v-col cols="3">
                  <v-btn
                    size="small"
                    color="surface-variant"
                    variant="text"
                    icon="mdi-delete"
                    @click="removeProduct(service.id)"
                  ></v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <RouterView></RouterView>
</template>

<script lang="ts">
import { backendService, type API } from '@/services/api-service'
import { mapGetters, useStore } from 'vuex'
import AddProduct from './addProduct.vue'
import EditProduct from './editProduct.vue'
import ViewQuote from './viewQuote.vue'
import type { Project } from './../../interfaces/project'
import type { Product } from './../../interfaces/product'

export default {
  hello: null,
  data: () => ({
    store: useStore(),
    addDialogVisible: false,
    editDialogVisible: false,
    quoteDialogVisible: false,
    project: {} as Project,
    product_list: [] as Array<any>,
    services_list: [] as Array<any>,
    possibleImages: [] as Array<String>,
    possibleImagesIndex: 6
  }),
  components: {
    AddProduct,
    EditProduct,
    ViewQuote
  },
  created() {
    this.project = this.getProject
    this.listProducts()
    this.listImages()
  },
  computed: {
    ...mapGetters('auth', ['getUser']),
    ...mapGetters('project', ['getProject'])
  },
  watch: {
    $route(to, from) {
      this.project = this.getProject
      this.listProducts()
    }
  },
  methods: {
    removeProduct(product_id: number) {
      backendService
        .get('api/project/removeProductById?product_id=' + product_id, false)
        .then((response: API) => {
          // Update local store to reflect changes
          backendService
            .get('/api/project/getProjectById?project_id=' + this.project['_id'])
            .then((response) => {
              this.project = response
              this.store.dispatch('project/SelectProject', this.project).then(() => {
                this.listProducts()
              })
            })
        })
    },
    seeProject() {
      console.log(this.getProject)
    },
    listProducts() {
      this.project = this.getProject
      this.possibleImagesIndex = 6
      this.product_list = []
      this.services_list = []
      this.project['products'].forEach((prod_id: any) => {
        backendService
          .get('api/product/productById?id=' + prod_id, false)
          .then((response: Product) => {
            const entry: any = {
              title: response['name'],
              id: response['_id'],
              completed: response['completed'],
              src: this.getNewImage(),
              flex: 6
            }
            if (
              response['product'] === true ||
              response['product'] === null ||
              !response.hasOwnProperty('product')
            )
              this.product_list.push(entry)
            else this.services_list.push(entry)
          })
      })
    },
    listImages() {
      this.possibleImages = []
      this.possibleImages.push('/src/assets/icons/614.png')
      this.possibleImages.push('/src/assets/icons/15094.png')
      this.possibleImages.push('/src/assets/icons/79761.png')
      this.possibleImages.push('/src/assets/icons/148465.png')
      this.possibleImages.push('/src/assets/icons/167096.png')
      this.possibleImages.push('/src/assets/icons/497433.png')
      this.possibleImages.push('/src/assets/icons/544081.png')
      this.possibleImages.push('/src/assets/icons/694188.png')
      this.possibleImages.push('/src/assets/icons/838064.png')
      this.possibleImages.push('/src/assets/icons/950299.png')
      this.possibleImages.push('/src/assets/icons/1022179.png')
      this.possibleImages.push('/src/assets/icons/1067555.png')
      this.possibleImages.push('/src/assets/icons/1148917.png')
      this.possibleImages.push('/src/assets/icons/1518185.png')
      this.possibleImages.push('/src/assets/icons/1548088.png')
      this.possibleImages.push('/src/assets/icons/1663834.png')
      this.possibleImages.push('/src/assets/icons/1670382.png')
      this.possibleImages.push('/src/assets/icons/1688506.png')
      this.possibleImages.push('/src/assets/icons/1716995.png')
      this.possibleImages.push('/src/assets/icons/1732035.png')
    },
    getNewImage(): String {
      return this.possibleImages[this.possibleImagesIndex++ % this.possibleImages.length]
    }
  }
}
</script>

<style>
.ml-auto {
  margin-left: auto;
}
</style>
