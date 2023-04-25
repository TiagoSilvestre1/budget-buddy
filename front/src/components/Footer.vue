<script lang="ts">

    enum FooterViews
    {
        GLOBAL = 'GLOBAL',
        PROJECT = 'PROJECT'
    };

    export default {
        data: () => {
            return {
                view: FooterViews.PROJECT
            }
        }
    }

</script>

<template>
    <div class="_container">

        <div class="block-list" v-if="view === 'GLOBAL'">

                <div class="block">
                    <v-btn class="left-navbar-button" icon="mdi-home"> </v-btn>
                </div>
                <div class="block">
                    <v-btn class="left-navbar-button" icon="mdi-calendar-month"> </v-btn>
                </div>
                <div class="block">
                    <v-btn class="left-navbar-button" icon="mdi-cogs"> </v-btn>
                </div>
        </div>

        <div class="block-list" v-if="view === 'PROJECT'">
            <div class="block">
                <v-btn class="left-navbar-button" icon=""> </v-btn>
            </div>
            <div class="block">
                <v-btn class="left-navbar-button" icon="mdi-account-group-outline"> </v-btn>
            </div>
            <div class="block">
                <v-btn class="left-navbar-button" icon="mdi-calendar-month"> </v-btn>
            </div>
            <div class="block">
                <v-btn class="left-navbar-button" icon="mdi-currency-eur"> </v-btn>
            </div>
            <div class="block">
                <v-btn class="left-navbar-button" icon="mdi-cogs"> </v-btn>
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