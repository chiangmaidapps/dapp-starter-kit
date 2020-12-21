import {
  VUE_APP_SUBGRAPH_NAME
} from "./settings";

module.exports = {
  client: {
    service: VUE_APP_SUBGRAPH_NAME,
    localSchemaFile: '../subgraph/schema.graphql'
  }
}
