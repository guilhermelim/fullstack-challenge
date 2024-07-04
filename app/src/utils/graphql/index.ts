import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HOST_API_KEY } from "../../../config";

export { getUsers } from "./queries";
export { addUser } from "./mutation";
export { deleteUser } from "./mutation";
export { updateUser } from "./mutation";

const client = new ApolloClient({
  uri: HOST_API_KEY,
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
