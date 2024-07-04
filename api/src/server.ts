import { ApolloServer } from "apollo-server";
import "reflect-metadata";

import { APOLLO_SERVER_PORT } from "./config";
import buildGraphQLSchema from "./graphql/schemas";

async function startApolloServer() {
  const server = new ApolloServer({
    schema: await buildGraphQLSchema(),
  });

  const { url } = await server.listen({ port: APOLLO_SERVER_PORT });
  console.log(`🚀 Server ready at ${url}`);
}

startApolloServer().catch((err) => {
  console.error("Error starting server:", err);
});
