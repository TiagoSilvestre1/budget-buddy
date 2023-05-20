<script lang="ts">
import type { Project } from '@/interfaces/project'
import type { Product } from '@/interfaces/product'
import type { Quote } from '@/interfaces/quote'
import { backendService, type API } from '@/services/api-service'
import project from '@/store/modules/project'
import { ref } from 'vue'
import { mapGetters } from 'vuex'
import { HttpStatusCode, type Axios, type AxiosResponse } from 'axios'

export default {
  async created() {
    await this.on_mounted()
  },
  computed: {
    ...mapGetters('auth', ['getUser']),
    ...mapGetters('project', ['getProject'])
  },
  data: () => {
    return {
      projects: [] as Array<any>,
      original_attribs: [] as Array<any>,
      attributes: [] as Array<any>,
      preSelected: 'All'
    }
  },
  watch: {
    preSelected: function (newValue) {
      this.on_mounted()
    }
  },

  methods: {
    async on_mounted() {
      const res = await this.generate_original_attribs()
      this.filter_selection(res)
    },
    async generate_original_attribs() {
      let arr: any[] = []
      const response: API = await backendService.get(
        'api/project/byUserId?user_id=' + this.getUser.id
      )
      if ('success' in response && response.success === true) {
        this.projects = response.data.owned.concat(response.data.collaborates)
        for (const project of this.projects) {
          let dates: any
          let popover: {
            label: string
            visibility: 'focus'
          } = { label: '', visibility: 'focus' }
          let highlight: any = {}

          let content = null
          let dot = null

          if (project.start_date && project.finish_date) {
            dates = { start: project.start_date, end: project.finish_date }
            popover.label = 'Project ' + project.title
          }

          if (project.start_date && !project.finish_date) {
            dates = project.start_date
            content = 'green'
            highlight = {
              color: 'green',
              fillMode: 'outline'
            }
            dot = true
            popover.label = 'Project ' + project.title + ' start date'
          }

          if (!project.start_date && project.finish_date) {
            dates = project.finish_date
            dot = true
            popover.label = 'Project ' + project.title + ' end date'
          }

          arr.push({
            highlight: highlight,
            popover: popover,
            dates: dates,
            content: content,
            dot: dot,
            title: project.title
          })

          for (const prod_id of project.products) {
            const res: AxiosResponse = await backendService.get(
              'api/product/productById?id=' + prod_id,
              true
            )
            if (res.status === HttpStatusCode.Ok) {
              let product: Product = res.data

              for (const el of product.quotes) {
                const quote_res: AxiosResponse = await backendService.get(
                  'api/product/quoteById?id=' + el,
                  true
                )

                if (quote_res.status === HttpStatusCode.Ok) {
                  let quote: Quote = quote_res.data

                  if (product.product) {
                    let label_generator = (productName: string, url: any, price: any) => {
                      let label = productName

                      if (url) {
                        label += ` from ${url}`
                      }

                      if (price) {
                        label += ` costing ${price}`
                      }

                      label += ' if purchased arrives'
                      return label
                    }
                    arr.push({
                      highlight: highlight,
                      popover: {
                        label: label_generator(product.name, quote.url, quote.price),
                        visibility: 'focus'
                      },
                      dot: true,
                      content: 'blue',
                      title: project.title,
                      dates: quote.available
                    })
                  } else {
                    let quote_dates = null
                    if (quote.available && quote.available_2)
                      quote_dates = { start: quote.available, end: quote.available_2 }
                    if (quote.available && !quote.available_2) quote_dates = quote.available
                    if (!quote.available && quote.available_2) quote_dates = quote.available_2

                    arr.push({
                      highlight: null,
                      popover: {
                        label: 'Service ' + product.name + ' occurs',
                        visibility: 'focus'
                      },
                      bar: true,

                      title: project.title,
                      dates: quote_dates
                    })
                  }
                }
              }
            }
          }
        }
      }
      return arr
    },
    filter_selection(arr: any[]) {
      this.attributes = []
      if (this.preSelected === 'All') this.attributes = arr
      else {
        this.attributes = arr.filter((el: any) => {
          return el.title === this.preSelected
        })
      }
    }
  }
}
</script>
<template>
  <h1 class="main-title">Calendar</h1>

  <div style="height: 15vh"></div>

  <div class="centered">
    <div style="width: 16cm">
      <div class="centered">
        <v-select
          style="max-width: 8cm"
          :active="true"
          label="Select project"
          :items="['All', ...projects]"
          v-model="preSelected"
        ></v-select>
      </div>
      <VCalendar expanded :attributes="attributes" borderless />
    </div>
  </div>
</template>
