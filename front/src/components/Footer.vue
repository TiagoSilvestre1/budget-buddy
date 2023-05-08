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
        COLLABORATORS = 'COLLABORATORS',
        PROJECTSETTINGS = 'PROJECTSETTINGS',
        PROJECTCALENDAR = 'PROJECTCALENDAR',
        PROJECTBUDGET = 'PROJECTBUDGET',
        PROJECTHOME = 'PROJECTHOME'
    }

    export default {
        created()
        {
            if('view' in this.$route.meta)
            {
                this.view = this.$route.meta.view === 'GLOBAL' ? FooterViews.GLOBAL : FooterViews.PROJECT;
            }
            else{
                this.view = FooterViews.GLOBAL;
            }
        },
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
                        case 'COLLABORATORS': this.$router.push('/project/' + this.$route.params.projectId + '/collaborators'); break;
                        case 'PROJECTSETTINGS': this.$router.push('/project/' + this.$route.params.projectId + '/settings'); break;
                        case 'PROJECTCALENDAR': this.$router.push('/project/' + this.$route.params.projectId + '/calendar'); break;
                        case 'PROJECTBUDGET': this.$router.push('/project/' + this.$route.params.projectId + '/budget'); break;
                        case 'PROJECTHOME': this.$router.push('/project/' + this.$route.params.projectId); break;
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
                <v-btn class="left-navbar-button" icon="mdi-shopping" @click="goto(Redirects.PROJECTHOME)"> </v-btn>
            </div>
            <div class="block">
                <v-btn class="left-navbar-button" icon="mdi-account-group-outline" @click="goto(Redirects.COLLABORATORS)"> </v-btn>
            </div>
            <div class="block">
                <v-btn class="left-navbar-button" icon="mdi-calendar-month" @click="goto(Redirects.PROJECTCALENDAR)"> </v-btn>
            </div>
            <div class="block">
                <v-btn class="left-navbar-button" icon="mdi-currency-eur" @click="goto(Redirects.PROJECTBUDGET)"> </v-btn>
            </div>
            <div class="block">
                <v-btn class="left-navbar-button" icon="mdi-cogs" @click="goto(Redirects.PROJECTSETTINGS)"> </v-btn>
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