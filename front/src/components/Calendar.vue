<script lang="ts">
import type { Project } from '@/interfaces/project';
import { backendService, type API } from '@/services/api-service';
import { ref } from 'vue';
import { mapGetters } from 'vuex';

export default {

  created() {
    this.generate_original_attribs();
    this.filter_selection();
  },
    computed: {
    ...mapGetters('auth', ['getUser']),
    ...mapGetters('project',['getProject'])
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
    
    preSelected : function(newValue) {
      this.filter_selection();
    }
    
  },
  methods: {
    generate_original_attribs()
    {
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
            popover.label = 'Project ' + project.title + " interval";
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
            }) 
          });
      }
    });
    },
    filter_selection(){
      this.attributes = [];
      if(this.preSelected === 'All')
        this.attributes = this.original_attribs;
      else{
        this.attributes = this.original_attribs.filter((el: any) => {
          return el.title === this.preSelected
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
      <div class="centered">
        <v-select style="max-width: 8cm"
          :active="true"
          label="Select project"
          :items="['All',...projects]"
          
          v-model="preSelected"
        ></v-select>
      </div>
      <VCalendar expanded :attributes='attributes' />
    </div>
  </div>
</template>
