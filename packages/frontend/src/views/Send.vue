<template>
  <article>
    <div class="send-tokens">
      <div class="hero-body">
        <div class="container has-text-centered mt-6">
          <h1 class="title has-text-weight-bold is-size-1 mb-5">
            Send Tokens
          </h1>
          <h2 class="subtitle mb-6 pt-5">
              Transfer tokens to an address of your choosing.
          </h2>
          <div class="form">
            <label for="field-address" class="label">Address</label>
            <input
              v-model="address"
              placeholder="Type an address to transfer tokens"
              class="input"
              id="field-address"
            >
            <label for="field-amount" class="label">Amount</label>
            <input
              v-model="transferAmount"
              placeholder="Type an amount of tokens to transfer"
              class="input"
              id="field-amount"
            >
            <b-button
                type="is-primary"
                size="is-large"
                class="mt-6"
                @click="transferTokens"
                :loading="transferring"
            >
                Send
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
  data () {
    return {
      address: null,
      transferAmount: null,
      transferring: false
    }
  },
  components: {},
  computed: {
    ...mapGetters(['account'])
  },
  methods: {
      async transferTokens() {
        this.transferring = true;
        await this.$store.dispatch('transferTokens', this.address, this.transferAmount);
        this.transferring = false;
      }
  },
}
</script>

<style scoped>
.form,
.input,
.message {
  padding: 12px;
}

label {
  display: block;
  margin: 6px;
}

.input {
  font-family: inherit;
  font-size: inherit;
  border: solid 2px #ccc;
  border-radius: 3px;
}

.error {
  color: red;
}

.images {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-auto-rows: 300px;
  grid-gap: 10px;
}

.image-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ccc;
  border-radius: 8px;
}

.image {
  max-width: 100%;
  max-height: 100%;
}

.image-input {
  margin: 20px;
}
</style>
