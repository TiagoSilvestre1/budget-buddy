<script lang="ts">
import { mapGetters } from 'vuex';
import type { Project } from '@/interfaces/project';
export default {
    data() {
    return {
      edit_project_name : "",
      edit_project_budget: 0,
      edit_project_start_date: new Date(),
      edit_project_end_date: new Date(),
    }
  },
  computed: {
    ...mapGetters('auth', ['getUser']),
    ...mapGetters('project',['getProject'])
  },

  mounted() {
    const project: Project = this.getProject;
    console.log(project)
    this.edit_project_name = project.title;
    this.edit_project_budget = project.budget;
    this.edit_project_start_date = project.start_date;
    this.edit_project_end_date = project.finish_date;
  }
}
</script>

<template>
    <h2 class="main-subtitle">Project Settings</h2>
    <v-container class="container-wrapper">
    <v-row class="max-width-row">
      <v-col cols="12">
        <div class="text-center">
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="edit_project_name" label="Project Name"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-file-input  label="Project Image" prepend-icon="mdi-camera"></v-file-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
          label="Budget"
          v-model="edit_project_budget"
          prefix="€"
          type="number"
        ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">

          <h4>Start date</h4>
        <VueDatePicker v-model="edit_project_start_date" :enable-time-picker="false" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <h4>End date</h4>
                <VueDatePicker v-model="edit_project_end_date" :enable-time-picker="false" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn type="submit">Edit</v-btn>
              </v-col>
            </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<!--
            <v-text-field
          label="Budget"
          v-model="new_project_budget"
          prefix="€"
          type="number"
        ></v-text-field>
          <h4>Start date</h4>
        <VueDatePicker v-model="new_project_start_date" :enable-time-picker="false" />
        <br>
        <h4>End date</h4>
        <VueDatePicker v-model="new_project_end_date" :enable-time-picker="false" />
-->

<style>
.container-wrapper {
  display: flex;
  justify-content: center;
}

.max-width-row {
    max-width: 400px;
}
</style>