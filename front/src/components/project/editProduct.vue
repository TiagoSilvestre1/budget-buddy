<template>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ props }">
            <v-btn 
                size="small" 
                variant="text" 
                icon="mdi-cog" 
                v-bind="props"
            ></v-btn>
        </template>
        <v-card>
          <v-toolbar
            dark
            color="warning"
          >
            <v-btn
              icon
              dark
              @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit Product</v-toolbar-title>
            
            <v-toolbar-items>
              <v-btn
                variant="text"
                @click="dialog = false"
              >
                Save
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-list
            lines="two"
            subheader
          >
            <v-list-subheader>Info</v-list-subheader>
            <v-list-item title="Content filtering" subtitle="Set the content filtering level to restrict apps that can be downloaded"></v-list-item>
            <v-list-item title="Password" subtitle="Require password for purchase or use password to restrict purchase"></v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list
            lines="two"
            subheader
          >
            <v-list-subheader>General</v-list-subheader>
            <v-list-item title="Notifications" subtitle="Notify me about updates to apps or games that I downloaded">
              <template v-slot:prepend>
                <v-checkbox v-model="notifications"></v-checkbox>
              </template>
            </v-list-item>
            <v-list-item title="Sound" subtitle="Auto-update apps at any time. Data charges may apply">
              <template v-slot:prepend>
                <v-checkbox v-model="sound"></v-checkbox>
              </template>
            </v-list-item>
            <v-list-item title="Auto-add widgets" subtitle="Automatically add home screen widgets">
              <template v-slot:prepend>
                <v-checkbox v-model="widgets"></v-checkbox>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-dialog>
    </v-row>
</template>

<script lang="ts">
    import { backendService, type API } from '@/services/api-service';
	import { mapGetters, useStore } from 'vuex';
    import type { Project } from '../../interfaces/project';
    import type { Product } from '../../interfaces/product';

    export default {

        data () {
            return {
                dialog: false,
                notifications: false,
                sound: true,
                widgets: false,
                store: useStore(),
                project: {} as Project,
                product: {} as Product,
            }
        },
        props: {
            productId: {
                type: String,
                required: true
            }
        },
		created() {
			this.project = this.getProject;
		},
		computed: {
			...mapGetters('auth', ['getUser']),
			...mapGetters('project',['getProject'])
		},
		methods: {
            // this.$emit('productAdded');
            getProductInfo() {
                
            }
        }
    }
</script>

<style>
    .dialog-bottom-transition-enter-active,
    .dialog-bottom-transition-leave-active {
        transition: transform .2s ease-in-out;
    }
</style>