<script lang="ts">


    export enum FooterViews
    {
        GLOBAL = 'GLOBAL',
        PROJECT = 'PROJECT'
    };

    enum Redirects {
        HOME = 'HOME',
        CALENDAR = 'CALENDAR',
        SETTINGS = 'SETTINGS',
        COLLABORATORS = 'COLLABORATORS'
    }

    export default {
        data: () => {
            return {
                Redirects : Redirects,
                view: FooterViews.GLOBAL
            }
        },
        watch:{
    $route (to, from){
        this.view = to.meta.view === "GLOBAL" ? FooterViews.GLOBAL : FooterViews.PROJECT;
    }
        } ,
        methods: 
            {
                goto(location: Redirects): void
                {
                    switch (location)
                    {
                        case 'HOME': this.$router.push('../home'); break;
                        case 'CALENDAR': this.$router.push('../calendar'); break;
                        case 'SETTINGS': this.$router.push('../settings'); break;
                        case 'COLLABORATORS': this.$router.push('collaborators'); break;
                            
                    }
                }
            }
        
    }

</script>

<template>
    <div class="_container">

        <div class="block-list" v-if="view === 'GLOBAL'">

                <div class="block">
                    <v-btn class="left-navbar-button" icon="mdi-home" @click="goto(Redirects.HOME)"> </v-btn>
                </div>
                <div class="block">
                    <v-btn class="left-navbar-button" icon="mdi-calendar-month" @click="goto(Redirects.CALENDAR)"> </v-btn>
                </div>
                <div class="block">
                    <v-btn class="left-navbar-button" icon="mdi-cogs" @click="goto(Redirects.SETTINGS)"> </v-btn>
                </div>
        </div>

        <div class="block-list" v-if="view === 'PROJECT'">
            <div class="block">
                <v-btn class="left-navbar-button" icon=""> </v-btn>
            </div>
            <div class="block">
                <v-btn class="left-navbar-button" icon="mdi-account-group-outline" @click="goto(Redirects.COLLABORATORS)"> </v-btn>
            </div>
            <div class="block">
                <v-btn class="left-navbar-button" icon="mdi-calendar-month"> </v-btn>
            </div>
            <div class="block">
                <v-btn class="left-navbar-button" icon="mdi-currency-eur"> </v-btn>
            </div>
            <div class="block">
                <v-btn class="left-navbar-button" icon="mdi-cogs" @click="goto(Redirects.SETTINGS)"> </v-btn>
            </div>
        </div>


    </div>

</template>


<style>
._container
{
    display: flex;
  justify-content: center;
  align-items: center;
    min-height: 9.5vh;
}
.block {
    flex:1;
    height: 100%;

}

.block-list {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
    width: 100%;
  height: 100%;
  align-items: center;
}
</style>