<template>
    <section style="height: 100%;">
        <nav class="navbar is-dark">
            <div class="container py-3 is-flex is-justify-between">
                <div class="navbar-brand">
                    <div class="navbar-item">
                        <router-link :to="{name: 'Home'}">
                          <img alt="Simple logo" src="./assets/logo.png">
                        </router-link>
                    </div>
                </div>

                <div class="navbar-start">
                </div>

                <div class="navbar-end">
                    <div class="navbar-item" v-if="account">
                        <b-button rounded outlined type="is-primary" @click="backToHome">
                            {{ account }}
                        </b-button>
                    </div>
                </div>
            </div>
        </nav>

        <router-view></router-view>

        <footer>
            <div class="content has-text-centered">
                <p></p>
            </div>
        </footer>
    </section>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    components: {},
    computed: mapGetters(['account']),
    methods: {
      async backToHome() {
        await this.$store.dispatch('disconnect');
        return this.$router.push({name: 'Home'});
      },
    },
    mounted() {
      if (this.$router.currentRoute.path === '/leaderboard') {
        this.$router.push({name: 'Home'});
      }
    },
  };
</script>

<style lang="scss">

    @import "~bulma/sass/utilities/_all";

    $black: #020203;
    $white: #fff;
    $gray: #D6D7DC;

    $dark: #14171A;

    $link: $gray;
    $link-hover: $gray;

    @import '~bulma';
</style>
