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
    console.log("data running ...")
    return {
      projects: [] as Array<any>,
      original_attribs: [] as Array<any>,
      attributes: [] as Array<any>,
    }
  },
  mounted()
  {
    this.generate_original_attribs();
    this.filter_selection();
  },
  methods: {
    generate_original_attribs()
    {
      this.original_attribs = [];
      backendService.get('api/project/byUserId?user_id=' + this.getUser.id).then((response: API) => {
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
         
            this.original_attribs.push({
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
                        this.original_attribs.push({
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

                        this.original_attribs.push({
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
    },
    filter_selection(){
      this.attributes = [];
      if(this.getProject.title === 'All')
        this.attributes = this.original_attribs;
      else{
        this.attributes = this.original_attribs.filter((el: any) => {
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
