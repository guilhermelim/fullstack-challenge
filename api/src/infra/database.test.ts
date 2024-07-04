import database from "./database";

describe("Database Connection", () => {
  beforeAll(async () => {
    await database.connect();
  });

  afterAll(async () => {
    await database.close();
  });

  it("should connect to MongoDB", async () => {
    const conn = await database.connect();
    expect(conn).toBeDefined();
    expect(database.getConnectionStatus()).toBe(1); // 1 significa "conectado"
  });

  it("should get connection status", () => {
    const status = database.getConnectionStatus();
    expect(status).toBe(1); // 1 significa "conectado"
  });

  it("should close the MongoDB connection", async () => {
    await database.close();
    expect(database.getConnectionStatus()).toBe(0); // 0 significa "desconectado"
  });

  it("should return the same connection instance", async () => {
    const firstConn = await database.connect();
    const secondConn = await database.connect();
    expect(firstConn).toBe(secondConn);
  });
});
