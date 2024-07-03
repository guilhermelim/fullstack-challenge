import { ApolloServer } from "apollo-server";
import "reflect-metadata";

import { APOLLO_SERVER_PORT } from "./config";
import buildGraphQLSchema from "./graphql/schemas";

async function bootstrap() {
  const server = new ApolloServer({
    schema: await buildGraphQLSchema(),
  });

  const { url } = await server.listen({ port: APOLLO_SERVER_PORT });

  console.log(`GraphQL server running on ${url}`);

  // Handle process termination (SIGINT signal)
  process.on("SIGINT", async () => {
    console.log("\nShutting down server gracefully...");

    // Close the server and cleanup resources
    await server.stop();

    console.log("Server stopped.");
    process.exit(0); // Exit the process
  });
}

bootstrap();
