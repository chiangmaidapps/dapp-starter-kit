module.exports = {
  client: {
    service: process.env.VUE_APP_SUBGRAPH_NAME,
    localSchemaFile: '../subgraph/schema.graphql'
  }
}
