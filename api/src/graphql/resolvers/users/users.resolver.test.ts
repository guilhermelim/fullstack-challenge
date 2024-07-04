import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./users.resolver"; // Ajuste o caminho de importação conforme a estrutura do seu projeto
import supertest from "supertest";
import database from "../../../infra/database";
import UserModel, { IUser } from "../../../infra/models/users";

describe("User Resolver", () => {
  let server: ApolloServer;

  beforeAll(async () => {
    const schema = await buildSchema({
      resolvers: [UserResolver], // Inclua seu UserResolver aqui
    });
    server = new ApolloServer({ schema });
    await server.listen({ port: 4002 });
  });

  beforeEach(async () => {
    try {
      await database.connect(); // Certifique-se de que a conexão com o banco de dados está estabelecida

      // Limpe a coleção de usuários antes de cada teste
      await UserModel.deleteMany({}).exec();
    } catch (error) {
      console.error("Erro ao limpar a coleção de usuários:", error);
    }
  });

  afterAll(async () => {
    await server.stop();
    await database.close(); // Desconecte do banco de dados após todos os testes
  });

  describe("users()", () => {
    it("should fetch all users", async () => {
      // Exemplo de teste usando supertest
      const response = await supertest(server["httpServer"])
        .post("/graphql")
        .send({
          query: `
            query {
              users {
                _id
                firstName
                lastName
                participation
              }
            }
          `,
        })
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.data.users).toEqual([]); // Ajuste as expectativas conforme seus dados de teste
    });
  });

  describe("user(id: ID)", () => {
    it("should fetch a user by ID", async () => {
      // Crie um usuário para o teste
      const newUser = await UserModel.create({
        firstName: "John",
        lastName: "Doe",
        participation: 50,
      });

      // Exemplo de teste para buscar um usuário por ID usando supertest
      const response = await supertest(server["httpServer"])
        .post("/graphql")
        .send({
          query: `
            query {
              user(id: "${newUser._id}") {
                _id
                firstName
                lastName
                participation
              }
            }
          `,
        })
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.data.user).toMatchObject({
        _id: newUser._id.toString(), // Convertendo para string
        firstName: "John",
        lastName: "Doe",
        participation: 50,
      });
    });

    it("should return null if user not found", async () => {
      const response = await supertest(server["httpServer"])
        .post("/graphql")
        .send({
          query: `
            query {
              user(id: "nonexistentid") {
                _id
                firstName
                lastName
                participation
              }
            }
          `,
        })
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.data.user).toBeNull();
    });
  });

  describe("addUser(input: UserInput)", () => {
    it("should add a new user", async () => {
      const userInput = {
        firstName: "Jane",
        lastName: "Smith",
        participation: 30,
      };

      const response = await supertest(server["httpServer"])
        .post("/graphql")
        .send({
          query: `
            mutation {
              addUser(input: { firstName: "${userInput.firstName}", lastName: "${userInput.lastName}", participation: ${userInput.participation} }) {
                _id
                firstName
                lastName
                participation
              }
            }
          `,
        })
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.data.addUser).toMatchObject({
        firstName: "Jane",
        lastName: "Smith",
        participation: 30,
      });
    });

    it("should throw an error if input validation fails", async () => {
      const response = await supertest(server["httpServer"])
        .post("/graphql")
        .send({
          query: `
            mutation {
              addUser(input: { firstName: "John", lastName: "Doe" }) {
                _id
                firstName
                lastName
                participation
              }
            }
          `,
        })
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe("updateUser(id: ID, input: UserInput)", () => {
    it("should update an existing user", async () => {
      // Crie um usuário para atualização
      const newUser = await UserModel.create({
        firstName: "Jane",
        lastName: "Doe",
        participation: 40,
      });

      const updatedData = {
        firstName: "Jane Updated",
        lastName: "Doe Updated",
        participation: 50,
      };

      const response = await supertest(server["httpServer"])
        .post("/graphql")
        .send({
          query: `
            mutation {
              updateUser(id: "${newUser._id}", input: { firstName: "${updatedData.firstName}", lastName: "${updatedData.lastName}", participation: ${updatedData.participation} }) {
                _id
                firstName
                lastName
                participation
              }
            }
          `,
        })
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      // Convertendo newUser._id para string para comparar com o _id retornado no response
      const expectedUserId = newUser._id.toString();
      expect(response.body.data.updateUser).toMatchObject({
        _id: expectedUserId,
        firstName: "Jane Updated",
        lastName: "Doe Updated",
        participation: 50,
      });
    });

    it("should return null if user not found", async () => {
      const response = await supertest(server["httpServer"])
        .post("/graphql")
        .send({
          query: `
            mutation {
              updateUser(id: "nonexistentid", input: { firstName: "Jane", lastName: "Doe", participation: 50 }) {
                _id
                firstName
                lastName
                participation
              }
            }
          `,
        })
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.data.updateUser).toBeNull();
    });
  });

  describe("deleteUser(id: ID)", () => {
    it("should delete an existing user", async () => {
      // Crie um usuário para exclusão
      const newUser = await UserModel.create({
        firstName: "John",
        lastName: "Doe",
        participation: 60,
      });

      const response = await supertest(server["httpServer"])
        .post("/graphql")
        .send({
          query: `
            mutation {
              deleteUser(id: "${newUser._id}") {
                _id
                firstName
                lastName
                participation
              }
            }
          `,
        })
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      // Convertendo newUser._id para string para comparar com o _id retornado no response
      const expectedUserId = newUser._id.toString();
      expect(response.body.data.deleteUser).toMatchObject({
        _id: expectedUserId,
        firstName: "John",
        lastName: "Doe",
        participation: 60,
      });
    });

    it("should return null if user not found", async () => {
      const response = await supertest(server["httpServer"])
        .post("/graphql")
        .send({
          query: `
            mutation {
              deleteUser(id: "nonexistentid") {
                _id
                firstName
                lastName
                participation
              }
            }
          `,
        })
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.data.deleteUser).toBeNull();
    });
  });
});
