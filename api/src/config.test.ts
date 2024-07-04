// api/src/config.test.ts

import dotenv from "dotenv";

jest.mock("dotenv", () => ({
  config: jest.fn(),
}));

describe("Configurations", () => {
  // Mock process.env for testing purposes
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules(); // Clears the cache
    process.env = { ...originalEnv }; // Reset to original environment variables
  });

  afterEach(() => {
    process.env = originalEnv; // Restore original environment variables
  });

  it("should have a default APOLLO_SERVER_PORT if not provided in environment variables", () => {
    delete process.env.APOLLO_SERVER_PORT; // Simulate missing environment variable

    const config = require("./config").default;

    expect(config.APOLLO_SERVER_PORT).toEqual(4000);
  });

  it("should use provided APOLLO_SERVER_PORT from environment variables", () => {
    process.env.APOLLO_SERVER_PORT = "5000"; // Simulate provided environment variable

    const config = require("./config").default;

    expect(config.APOLLO_SERVER_PORT).toEqual("5000"); // Comparação ajustada para string
  });

  it("should use provided MONGODB_URI from environment variables", () => {
    process.env.MONGODB_URI = "mongodb://user:pass@localhost:27017/test"; // Simulate provided environment variable

    const config = require("./config").default;

    expect(config.MONGODB_URI).toEqual(
      "mongodb://user:pass@localhost:27017/test"
    );
  });

  it("should use default MONGODB_URI if not provided in environment variables", () => {
    delete process.env.MONGODB_URI;

    const config = require("./config").default;

    expect(config.MONGODB_URI).toEqual(
      "mongodb://root:secret@localhost:27017/cotabox?authSource=admin"
    );
  });
});
