import mongoose from "mongoose";
import database from "../database"; // Certifique-se de que o caminho está correto
import UserModel, { IUser } from "./users"; // Certifique-se de que o caminho está correto

describe("User Model", () => {
  beforeAll(async () => {
    await database.connect();
  });

  afterAll(async () => {
    await database.close();
  });

  afterEach(async () => {
    await UserModel.deleteMany({});
  });

  it("should create a user successfully", async () => {
    const userData = {
      firstName: "John",
      lastName: "Doe",
      participation: 50,
    };

    const user: IUser = new UserModel(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.firstName).toBe(userData.firstName);
    expect(savedUser.lastName).toBe(userData.lastName);
    expect(savedUser.participation).toBe(userData.participation);
  });

  it("should fail to create a user without required fields", async () => {
    const user = new UserModel({}); // Sem campos obrigatórios

    let err;
    try {
      await user.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect((err as any).errors.firstName).toBeDefined();
    expect((err as any).errors.lastName).toBeDefined();
    expect((err as any).errors.participation).toBeDefined();
  });

  it("should read a user successfully", async () => {
    const userData = {
      firstName: "Jane",
      lastName: "Doe",
      participation: 70,
    };

    const user: IUser = new UserModel(userData);
    await user.save();

    const foundUser = await UserModel.findOne({ firstName: "Jane" });

    expect(foundUser).toBeDefined();
    expect(foundUser!.firstName).toBe(userData.firstName);
    expect(foundUser!.lastName).toBe(userData.lastName);
    expect(foundUser!.participation).toBe(userData.participation);
  });

  it("should update a user successfully", async () => {
    const userData = {
      firstName: "John",
      lastName: "Smith",
      participation: 20,
    };

    const user: IUser = new UserModel(userData);
    await user.save();

    user.firstName = "Johnny";
    const updatedUser = await user.save();

    expect(updatedUser.firstName).toBe("Johnny");
  });

  it("should delete a user successfully", async () => {
    const userData = {
      firstName: "John",
      lastName: "Doe",
      participation: 50,
    };

    const user: IUser = new UserModel(userData);
    await user.save();

    await UserModel.deleteOne({ _id: user._id });

    const deletedUser = await UserModel.findById(user._id);
    expect(deletedUser).toBeNull();
  });
});
