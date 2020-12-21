<template>
    <article>
        <div class="home">
            <div class="hero-body">
                <div class="container has-text-centered mt-6">
                    <h1 class="title has-text-weight-bold is-size-1 mb-5">
                        Dapp Starter Kit
                    </h1>
                    <h2 class="subtitle mb-6 pt-5">
                        Connect your Web3 Wallet to Get Started
                    </h2>
                    <b-button type="is-primary" size="is-large" class="mt-3" @click="connect" v-if="!account">
                        Connect
                    </b-button>
                    <div v-else>
                        <b-button type="is-primary" outlined size="is-large" class="mt-3 mx-2" @click="disconnect">
                            Connect to Another Wallet
                        </b-button>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>
<script>
  import {mapGetters} from 'vuex';
  export default {
    components: {},
    computed: {
      ...mapGetters(['account']),
    },
    methods: {
      connect() {
        if (this.account) {
          this.$router.push({name: 'Balances'});
          return;
        }
        this.$store.dispatch("bootstrap", {
          onSuccessCallback: () => {
            this.$router.push({name: 'Balances'});
          },
        });
      },
      disconnect() {
        this.$store.dispatch('disconnect');
      },
    },
  };
</script>