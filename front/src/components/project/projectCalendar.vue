<script lang="ts">
import type { Project } from '@/interfaces/project';
import type {Product} from '@/interfaces/product';
import type {Quote} from '@/interfaces/quote';
import { backendService, type API } from '@/services/api-service';
import project from '@/store/modules/project';
import { ref } from 'vue';
import { mapGetters } from 'vuex';
import { HttpStatusCode, type Axios, type AxiosResponse } from 'axios';

export default {

    computed: {
    ...mapGetters('auth', ['getUser']),
    ...mapGetters('project',['getProject'])
  },
  data: () => {
    return {
      projects: [] as Array<any>,
      original_attribs: [] as Array<any>,
      attributes: [] as Array<any>,
    }
  },
  async mounted()
  {
    let arr = await this.generate_original_attribs();
    this.filter_selection(arr);
  },
  methods: {
    async generate_original_attribs()
    {
      let arr: any[] = [];
      await backendService.get('api/project/byUserId?user_id=' + this.getUser.id).then((response: API) => {
      if('success' in response && response.success === true)
      {
        this.projects = response.data.owned.concat(response.data.collaborates);
        this.projects.forEach((project: Project) => {
          let dates: any;
          let popover: {
            label: string;
            visibility: 'focus'
          } = {label: '' , visibility: 'focus'};
          let highlight: any = {

          };

          let content = null;
          let dot = null;

          if(project.start_date && project.finish_date)
          {
            dates = { start: project.start_date, end: project.finish_date};
            popover.label = 'Project ' + project.title;
            

          }

          if(project.start_date && !project.finish_date)
          {
            dates = project.start_date;
            content = 'green'
            highlight = {
            color: 'green',
            fillMode: 'outline',
          }
            dot = true
            popover.label = 'Project ' + project.title + " start date";  
          }

          if(!project.start_date && project.finish_date)
          {
            dates = project.finish_date;
            dot = true
            popover.label = 'Project ' + project.title + ' end date';
          }
         
            arr.push({
              highlight: highlight,
              popover: popover,
              dates: dates,
              content: content,
              dot: dot,
              title: project.title
            });
            
            project.products.forEach((prod_id: string) => {backendService.get('api/product/productById?id=' + prod_id, true).then((res: AxiosResponse) => {
              if(res.status === HttpStatusCode.Ok)
              {
                let product: Product = res.data;

                product.quotes.forEach((el: string) => {
                  backendService.get('api/product/quoteById?id=' + el, true).then((quote_res: AxiosResponse) => {

                    if(quote_res.status === HttpStatusCode.Ok)
                    {
                      let quote: Quote = quote_res.data;

                      if(product.product)
                      {
                        arr.push({
                          highlight: highlight,
                          popover: 
                          {
                            label: product.name + " from " + quote.url + " costing " + quote.price + "€ if purchased, arrives",
                            visibility: 'focus'
                          },
                          dot: null,
                          content: 'red',
                          title: project.title,
                          dates: quote.available
                        })
                      }
                      else{
                        let quote_dates = null;
                        if(quote.available && quote.available_2)
                          quote_dates = {start: quote.available, end: quote.available_2};
                        if(quote.available && !quote.available_2)
                          quote_dates = quote.available;
                        if(!quote.available && quote.available_2)
                          quote_dates = quote.available_2;

                        arr.push({
                          highlight: highlight,
                          popover: 
                          {
                            label: "Service " + product.name + " occurs",
                            visibility: 'focus'
                          },
                          dot: null,
                          content: 'orange',
                          title: project.title,
                          dates: quote_dates
                        })
                      }
                    }
                  });
                });
              }
            })});
          });

          
      }
    });
    return arr;
    },
    filter_selection(arr: any[]){
      this.attributes = [];
      if(this.getProject.title === 'All')
        this.attributes = arr
      else{
        this.attributes = arr.filter((el: any) => {
          return el.title === this.getProject.title
        });
      }
    }
  }
}
</script>
<template>
  <h1 class="main-title">Personal calendar</h1>

  <div style="height: 15vh"></div>

  <div class="centered">
    
    <div style="width: 16cm">
      <VCalendar expanded :attributes='attributes' />
    </div>
  </div>
</template>