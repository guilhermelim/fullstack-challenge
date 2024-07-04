// src/tests/hello.resolver.test.ts

import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./hello.resolver";
import supertest from "supertest";

describe("Hello Resolver", () => {
  let server: ApolloServer;

  beforeAll(async () => {
    const schema = await buildSchema({
      resolvers: [HelloResolver],
    });
    server = new ApolloServer({ schema });
    await server.listen({ port: 4002 });
  });

  afterAll(async () => {
    await server.stop();
  });

  it("should return 'Hello World' from helloWorld query", async () => {
    const response = await supertest(server["httpServer"])
      .post("/graphql")
      .send({
        query: `
          query {
            helloWorld
          }
        `,
      })
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.data.helloWorld).toBe("Hello World");
  });
});
