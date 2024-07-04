import path from "path";
import fs from "fs";
import buildGraphQLSchema from "./index"; // Ajuste o caminho conforme a estrutura do seu projeto

describe("GraphQL Schema Generation", () => {
  it("should build a valid GraphQL schema", async () => {
    const schema = await buildGraphQLSchema();
    expect(schema).toBeDefined();
    // Você pode adicionar mais asserções específicas para o esquema se necessário
  });

  it("should emit the schema file schema.gql", async () => {
    // Build the schema and ensure it generates the schema.gql file
    const schema = await buildGraphQLSchema();
    const schemaFilePath = path.resolve(__dirname, "./schema.gql");

    // Check if the schema.gql file exists
    const schemaFileExists = fs.existsSync(schemaFilePath);
    expect(schemaFileExists).toBeTruthy();

    // Optionally, you can check the content of schema.gql if needed
    if (schemaFileExists) {
      const schemaFileContent = fs.readFileSync(schemaFilePath, "utf-8");

      // Assertions to check the content of schema.gql
      expect(schemaFileContent).toContain("scalar DateTimeISO");

      expect(schemaFileContent).toContain("type Mutation");
      expect(schemaFileContent).toContain("addUser(input: UserInput!): User!");
      expect(schemaFileContent).toContain("deleteUser(id: ID!): User");
      expect(schemaFileContent).toContain(
        "updateUser(id: ID!, input: UserInput!): User"
      );

      expect(schemaFileContent).toContain("type Query");
      expect(schemaFileContent).toContain("helloWorld: String!");
      expect(schemaFileContent).toContain("user(id: ID!): User");
      expect(schemaFileContent).toContain("users: [User!]!");

      expect(schemaFileContent).toContain("type User");
      expect(schemaFileContent).toContain("_id: ID!");
      expect(schemaFileContent).toContain("createdAt: DateTimeISO!");
      expect(schemaFileContent).toContain("firstName: String!");
      expect(schemaFileContent).toContain("lastName: String!");
      expect(schemaFileContent).toContain("participation: Int!");
      expect(schemaFileContent).toContain("updatedAt: DateTimeISO!");

      expect(schemaFileContent).toContain("input UserInput");
      expect(schemaFileContent).toContain("firstName: String!");
      expect(schemaFileContent).toContain("lastName: String!");
      expect(schemaFileContent).toContain("participation: Int!");
    }
  });
});
