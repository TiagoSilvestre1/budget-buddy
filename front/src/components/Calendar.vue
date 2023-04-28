<script lang="ts">
import { backendService, type API } from '@/services/api-service';
import { mapGetters } from 'vuex';

export default {

  created() {
    backendService.get('api/project/byUserId?user_id=' + this.getUser.id).then((response: API) => {
      if('success' in response && response.success === true)
      {
        this.projects = response.data.owned.concat(response.data.collaborates);
      }
    });
  },
    computed: {
    ...mapGetters('auth', ['getUser']),
    ...mapGetters('project',['getProject'])
  },
  data: () => {
    return {
      projects: [] as Array<any>,
      attributes: [
        {
          highlight: true,
          dates: new Date(),
          popover: true
        }
      ],
      items: [
        {
          title: 'Project one',
          value: 1,
          subtitle:
            'test'
        },
        {
          title: 'Project two',
          value: 2
        },
        {
          title: 'Project three',
          value: 3
        }
      ],
      preSelected: 'All'
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
          label="Select"
          :items="['All',...this.projects]"
          v-model="preSelected"
        ></v-select>
      </div>
      <VCalendar expanded :attributes="attributes">
        <template #day-popover>
          <v-list lines="two">
            <v-list-item
              v-for="item in items"
              :key="item.title"
              :title="item.title"
              :subtitle="item.subtitle"
            ></v-list-item>
          </v-list>
        </template>
      </VCalendar>
    </div>
  </div>
</template>
