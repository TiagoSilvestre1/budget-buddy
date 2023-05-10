<template>
  <v-row justify="center">
    <v-dialog v-model="dialogVisible" max-width="512">
      <template v-slot:activator="{ props }">
        <v-btn color="deep-orange" v-bind="props"> Add Quote </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5" v-if="type">Add Quote - Product</span>
          <span class="text-h5" v-else>Add Quote - Service</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-switch color="orange-darken-3" label="Enable Tracking" v-model="trackingSwitch"></v-switch>
              </v-col>
              <v-col cols="12" sm="12" md="12" v-if="trackingSwitch">
                <v-text-field v-model="quoteUrl" label="Website URL"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="quoteDescription"
                  label="Description*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12" v-if="!trackingSwitch">
                <v-text-field v-model="quotePrice" label="Price*"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12" v-if="!trackingSwitch">
                <h4 class="text-center" v-if="type">Arrival Date*</h4>
                <h4 class="text-center" v-else>Start Date*</h4>
                <VueDatePicker
                  v-model="quoteDate"
                  :enable-time-picker="true"
                  label="Arrival Date*"
                  required
                />
              </v-col>
              <v-col cols="12" sm="12" md="12" v-if="!type && !trackingSwitch">
                <h4 class="text-center">End Date*</h4>
                <VueDatePicker
                  v-model="quoteDate_2"
                  :enable-time-picker="true"
                  label="Arrival Date*"
                  required
                />
              </v-col>
            </v-row>
          </v-container>
          <small>Required field marked with (*)</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="deep-orange" variant="tonal" @click="dialogVisible = false"> Close </v-btn>
          <v-btn color="deep-orange" variant="tonal" @click="addQuote"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { backendService, type API } from '@/services/api-service'
import { mapGetters, useStore } from 'vuex'
import type { Project } from '../../interfaces/project'
import type { Product } from '../../interfaces/product'
import type { Quote } from '../../interfaces/quote'
import { start } from '@popperjs/core'

export default {
  data: () => ({
    dialogVisible: false,
    store: useStore(),
    project: {} as Project,
    product: {} as Product,
    quoteUrl: null,
    quoteDescription: null,
    quotePrice: null,
    quoteDate: new Date(),
    quoteDate_2: new Date(),
    trackingSwitch: false,
  }),
  created() {
    this.project = this.getProject
  },
  props: {
    productId: {
      type: String,
      required: true
    },
    type: {
      // true for product, false for service
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters('auth', ['getUser']),
    ...mapGetters('project', ['getProject'])
  },
  methods: {
    addQuote() {
      console.log(this.trackingSwitch);
      this.project = this.getProject
      let endDate
      if (this.type) endDate = null
      else endDate = this.quoteDate_2.toISOString()

      let payload: any;
      if(this.trackingSwitch){
        payload = {
          product_id: this.productId,
          quote: {
            description: this.quoteDescription,
            url: this.quoteUrl,
            price: this.getRandomInt(50,500),
            available: this.addDays(new Date(), 2),
            available_2: this.addDays(new Date(), 4)
          }
        }
      }else{
        payload = {
          product_id: this.productId,
          quote: {
            description: this.quoteDescription,
            url: null,
            price: this.quotePrice,
            available: this.quoteDate.toISOString(),
            available_2: endDate
          }
        }
      }

      backendService.post('/api/product/addQuote', payload, false).then(() => {
        this.dialogVisible = false
        // Update local store to reflect changes
        backendService
          .get('/api/project/getProjectById?project_id=' + this.project['_id'])
          .then((response) => {
            this.project = response
            this.store.dispatch('project/SelectProject', this.project).then(() => {
              this.$emit('quoteAdded')
            })
          })
      })
    },
    getRandomInt(min: number, max: number) : number{
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; 
    },
    addDays(date: Date, days : number): Date{
      date.setDate(date.getDate() + days);
      return date;
    }
  }
}
</script>
