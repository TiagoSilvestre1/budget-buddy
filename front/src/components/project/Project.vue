<template>
    <h1 class="main-title">{{ project["title"] }}</h1>
    <v-card
        class="mx-auto"
        max-width="800"
    >
        <v-card-title>
            <h2 class="font-weight-light">
                <v-icon
                size="big"
                icon="mdi-shopping"
                ></v-icon> 
                Product List
                <v-btn size="small" variant="text" class="text-right" icon="ml-10 mdi-plus" @click="addProduct"></v-btn>
            </h2>
        </v-card-title> 

        <v-container fluid>
        <v-row dense>
            <v-col
                v-for="products in product_list"
                :key="products.title"
                :cols="products.flex"
            >
                <v-card>
                    <v-img
                    :src="products.src"
                    class="align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                    cover
                    >
                    <v-card-title class="text-white" v-text="products.title"></v-card-title>
                    </v-img>

                    <v-card-actions>
                    
                    <v-spacer></v-spacer>
                    
                    <v-btn size="small" variant="text" icon="mdi-cog" @click="seeProject"></v-btn>

                    <v-btn size="small" color="surface-variant" variant="text" icon="mdi-delete"></v-btn>

                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        </v-container>
    </v-card>
    <v-card
        class="mx-auto"
        max-width="800"
    >
        <v-card-title>
            <h2 class="font-weight-light">
                <v-icon
                size=" big"
                icon="mdi-account-hard-hat"
                ></v-icon> 
                Services List
            </h2>
        </v-card-title> 

        <v-container fluid>
        <v-row dense>
            <v-col
                v-for="service in services_list"
                :key="service.title"
                :cols="service.flex"
            >
                <v-card>
                    <v-img
                    :src="service.src"
                    class="align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                    cover
                    >
                    <v-card-title class="text-white" v-text="service.title"></v-card-title>
                    </v-img>

                    <v-card-actions>
                    
                    <v-spacer></v-spacer>
                    
                    <v-btn size="small" variant="text" icon="mdi-cog" @click="seeProject"></v-btn>

                    <v-btn size="small" color="surface-variant" variant="text" icon="mdi-delete"></v-btn>

                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        </v-container>
    </v-card>
    <RouterView></RouterView>
</template>

<script lang="ts">
import { backendService, type API } from '@/services/api-service';
import { mapGetters, useStore } from 'vuex';

export default {

    data: () => ({
        store: useStore(),
        project: {
            products: [],
            _id: String,
            title: String,
            start_date: String,
            finish_date: String,
            budget: Number,
            owner: String,
            collaborators: [],
            __v: Number,
        },
        product_list: [
            { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
            { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
            { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
        ],
        services_list: [
            { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
            { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
            { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
        ],
    }),
    created() {
        this.project = this.getProject;

        /*backendService.get('api/project/byUserId?user_id=' + this.getUser.id).then((response: API) => {
        if('success' in response && response.success === true)
        {
            this.projects = response.data.owned.concat(response.data.collaborates);
        }
        });*/
    },
    computed: {
        ...mapGetters('auth', ['getUser']),
        ...mapGetters('project',['getProject'])
    },
	methods: {
		addProduct() { },
        removeProduct() { },
        seeProject() {
            console.log(this.getProject);
        }
    /*
    seeUser() {
      console.log(this.getUser);
    },
    seeProject() {
      console.log(this.getProject);
    },*/
	},
}
</script>

<style>

</style>