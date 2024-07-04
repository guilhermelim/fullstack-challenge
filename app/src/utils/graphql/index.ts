import { ApolloClient, InMemoryCache } from "@apollo/client";
import { API_GRAPHQL_URI } from "../../../config";

export { getUsers } from "./queries";
export { addUser } from "./queries";
export { deleteUser } from "./queries";
export { updateUser } from "./queries";

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
