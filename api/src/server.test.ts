import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import supertest from "supertest";

import buildGraphQLSchema from "./graphql/schemas";
import { APOLLO_SERVER_PORT } from "./config";

let server: ApolloServer;

beforeAll(async () => {
  const schema = await buildGraphQLSchema();
  server = new ApolloServer({ schema });
  const { url } = await server.listen({ port: APOLLO_SERVER_PORT });
  console.log(`Test server ready at ${url}`);
});

afterAll(async () => {
  await server.stop();
});

describe("GraphQL Server", () => {
  it("should respond to GraphQL queries", async () => {
    const response = await supertest(server["httpServer"])
      .post("/graphql")
      .send({ query: "{ helloWorld }" })
      .set("Accept", "application/json");

    // Verifica se a resposta tem o código de status esperado
    expect(response.status).toEqual(200);

    // Verifica se a resposta contém os dados esperados
    expect(response.body.data).toBeDefined();
    expect(response.body.data.helloWorld).toEqual("Hello World");
  });
});
