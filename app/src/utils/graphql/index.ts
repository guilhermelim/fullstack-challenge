import { ApolloClient, InMemoryCache } from "@apollo/client";
import { API_GRAPHQL_URI } from "../../../config";

export { getUsers } from "./queries";
export { addUser } from "./mutation";
export { deleteUser } from "./mutation";
export { updateUser } from "./mutation";

const client = new ApolloClient({
  uri: API_GRAPHQL_URI,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
  },
});

export default client;
