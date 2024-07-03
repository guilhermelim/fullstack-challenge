import path from "node:path";
import { type GraphQLSchema } from "graphql";
import "reflect-metadata";
import { buildSchema } from "type-graphql";

import { HelloResolver } from "../resolvers/hello/hello.resolver";
import { UserResolver } from "../resolvers/users/users.resolver";

export default async function buildGraphQLSchema(): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    resolvers: [HelloResolver, UserResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });
  return schema;
}
