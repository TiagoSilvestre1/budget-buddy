<script lang="ts">
export default {
  data: () => {
    return {
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
      ]
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
          :items="['All','Project one','Project two']"
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
