<template>
  <v-row justify="center">
    <v-dialog v-model="dialogVisible" max-width="512">
      <template v-slot:activator="{ props }">
        <v-btn size="small" v-bind="props" variant="text" class="ml-auto" icon="mdi-plus"></v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5" v-if="type">Add Product</span>
          <span class="text-h5" v-else>Add Service</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="productName"
                  label="Product Name*"
                  v-if="type"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="productName"
                  label="Service Name*"
                  v-else
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>Required field marked with (*)</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="deep-orange" variant="tonal" @click="dialogVisible = false"> Close </v-btn>
          <v-btn color="deep-orange" variant="tonal" @click="addProduct" v-if="type"> Save </v-btn>
          <v-btn color="deep-orange" variant="tonal" @click="addService" v-else> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { backendService, type API } from '@/services/api-service'
import { mapGetters, useStore } from 'vuex'
import type { Project } from './../../interfaces/project'

export default {
  data: () => ({
    dialogVisible: false,
    productName: null,
    store: useStore(),
    project: {} as Project
  }),
  props: {
    type: {
      // true for product, false for service
      type: Boolean,
      required: true
    }
  },
  created() {
    this.project = this.getProject
  },
  computed: {
    ...mapGetters('auth', ['getUser']),
    ...mapGetters('project', ['getProject'])
  },
  methods: {
    addProduct() {
      backendService
        .post(
          '/api/project/addProduct',
          { name: this.productName, project_id: this.project['_id'] },
          false
        )
        .then(() => {
          this.dialogVisible = false
          // Update local store to reflect changes
          backendService
            .get('/api/project/getProjectById?project_id=' + this.project['_id'])
            .then((response) => {
              this.project = response
              this.store.dispatch('project/SelectProject', this.project).then(() => {
                this.$emit('productAdded')
              })
            })
        })
    },
    addService() {
      backendService
        .post(
          '/api/project/addService',
          { name: this.productName, project_id: this.project['_id'] },
          false
        )
        .then(() => {
          this.dialogVisible = false
          // Update local store to reflect changes
          backendService
            .get('/api/project/getProjectById?project_id=' + this.project['_id'])
            .then((response) => {
              this.project = response
              this.store.dispatch('project/SelectProject', this.project).then(() => {
                this.$emit('productAdded')
                this.productName = null
              })
            })
        })
    }
  }
}
</script>
