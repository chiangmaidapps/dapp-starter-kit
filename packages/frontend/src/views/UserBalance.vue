<template>
  <article>
    <div class="user-balance">
      <div class="hero-body">
        <div class="container has-text-centered mt-6">
          <h1 class="title has-text-weight-bold is-size-1 mb-5">
            Token Balances
          </h1>
          <h2 class="subtitle mb-6 pt-5">
              Enter an address to fetch their current token balance
          </h2>
          <div class="form">
            <label for="field-address" class="label">Address</label>
            <input
              v-model="address"
              placeholder="Type an address to see their token balance"
              class="input"
              id="field-address"
            >
          </div>

          <!-- Apollo watched Graphql query -->
          <ApolloQuery
            :query="require('../graphql/UserBalance.gql')"
            :variables="{ address }"
          >
            <template slot-scope="{ result: { loading, error, data } }">
              <!-- Loading -->
              <div v-if="loading" class="loading apollo">Loading...</div>

              <!-- Error -->
              <div v-else-if="error" class="error apollo">An error occured</div>

              <!-- Result -->
              <div v-else-if="data" class="result apollo">{{ data.tokenBalance }}</div>

              <!-- No result -->
              <div v-else class="no-result apollo">No result :(</div>
            </template>
          </ApolloQuery>
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
      address: '',
    }
  },
  apollo: {
  },
  components: {},
  computed: {
    ...mapGetters(['account']),
  },
  methods: {
  },
}
</script>

<style scoped>
.form,
.input,
.apollo,
.message {
  padding: 12px;
}

label {
  display: block;
  margin-bottom: 6px;
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
