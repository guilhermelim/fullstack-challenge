import fs from "fs";
import path from "path";

// Função para extrair todas as classes de um texto
function getClasses(text: string) {
  const regex = /export\s+class\s+(\w+)\s*{([\s\S]*?)\}/g;
  const classes = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    const [, name, content] = match;
    classes.push({ name: name, content: content.trim() });
  }

  return classes;
}

// Função para extrair todas as propriedades de uma classe
function getProperties(text: string): [string, string][] {
  const regex = /(?<=@Field\(.*\)\s*\n\s*)(\w+)\s*:\s*(\w+)\s*;/g;
  const properties: [string, string][] = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    const [, key, value] = match;
    properties.push([key, value]);
  }

  return properties;
}

describe("User Class", () => {
  let userClassContent: { name: string; content: string } | undefined;
  let userProperties: [string, string][] | undefined;

  beforeAll(() => {
    const usersFile = fs.readFileSync(
      path.resolve(__dirname, "./users.ts"),
      "utf-8"
    );
    const classes = getClasses(usersFile);
    userClassContent = classes.find((cls) => cls.name === "User");
    if (userClassContent) {
      userProperties = getProperties(userClassContent.content);
    }
  });

  it("should exist", () => {
    expect(userClassContent).toBeDefined();
  });

  it("should have all expected properties with correct types", () => {
    const expectedProperties: [string, string][] = [
      ["_id", "string"],
      ["firstName", "string"],
      ["lastName", "string"],
      ["participation", "number"],
      ["createdAt", "Date"],
      ["updatedAt", "Date"],
    ];

    expectedProperties.forEach(([key, value]) => {
      const foundProperty = userProperties?.find((prop) => prop[0] === key);
      expect(foundProperty).toBeDefined();
      expect(foundProperty?.[1]).toBe(value);
    });
  });

  it("should not have unknown properties", () => {
    const expectedProperties = [
      "_id",
      "firstName",
      "lastName",
      "participation",
      "createdAt",
      "updatedAt",
    ];
    const actualProperties = userProperties?.map((prop) => prop[0]);

    actualProperties?.forEach((prop) => {
      expect(expectedProperties).toContain(prop);
    });
  });
});

describe("UserInput Class", () => {
  let userInputClassContent: { name: string; content: string } | undefined;
  let userInputProperties: [string, string][] | undefined;

  beforeAll(() => {
    const usersFile = fs.readFileSync(
      path.resolve(__dirname, "./users.ts"),
      "utf-8"
    );
    const classes = getClasses(usersFile);
    userInputClassContent = classes.find((cls) => cls.name === "UserInput");
    if (userInputClassContent) {
      userInputProperties = getProperties(userInputClassContent.content);
    }
  });

  it("should exist", () => {
    expect(userInputClassContent).toBeDefined();
  });

  it("should have all expected properties with correct types", () => {
    const expectedProperties: [string, string][] = [
      ["firstName", "string"],
      ["lastName", "string"],
      ["participation", "number"],
    ];

    expectedProperties.forEach(([key, value]) => {
      const foundProperty = userInputProperties?.find(
        (prop) => prop[0] === key
      );
      expect(foundProperty).toBeDefined();
      expect(foundProperty?.[1]).toBe(value);
    });
  });

  it("should not have unknown properties", () => {
    const expectedProperties = ["firstName", "lastName", "participation"];
    const actualProperties = userInputProperties?.map((prop) => prop[0]);

    actualProperties?.forEach((prop) => {
      expect(expectedProperties).toContain(prop);
    });
  });
});
