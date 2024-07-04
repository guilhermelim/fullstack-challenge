import dbConnect from "../../../infra/dbConnect";
import { Resolver, Query, Mutation, Arg, ID } from "type-graphql";
import UserModel, { IUser } from "../../../infra/models/users";
import { User, UserInput } from "../../typedefs/users";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<IUser[]> {
    try {
      await dbConnect();
      const users = await UserModel.find();
      return users;
    } catch (err: any) {
      throw new Error(`Failed to fetch users: ${err.message}`);
    }
  }

  @Query(() => User, { nullable: true })
  async user(@Arg("id", () => ID) id: string): Promise<IUser | null> {
    try {
      await dbConnect();
      const user = await UserModel.findById(id);
      return user;
    } catch (err: any) {
      throw new Error(`Failed to fetch user with ID ${id}: ${err.message}`);
    }
  }

  @Mutation(() => User)
  async addUser(@Arg("input") input: UserInput): Promise<IUser> {
    try {
      await dbConnect();
      const newUser = await UserModel.create(input);
      return newUser;
    } catch (err: any) {
      throw new Error(`Failed to create user: ${err.message}`);
    }
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg("id", () => ID) id: string,
    @Arg("input") input: UserInput
  ): Promise<IUser | null> {
    try {
      await dbConnect();
      const updatedUser = await UserModel.findByIdAndUpdate(id, input, {
        new: true,
      });
      return updatedUser;
    } catch (err: any) {
      throw new Error(`Failed to update user with ID ${id}: ${err.message}`);
    }
  }

  @Mutation(() => User, { nullable: true })
  async deleteUser(@Arg("id", () => ID) id: string): Promise<IUser | null> {
    try {
      await dbConnect();
      const deletedUser = await UserModel.findByIdAndDelete(id);
      return deletedUser;
    } catch (err: any) {
      throw new Error(`Failed to delete user with ID ${id}: ${err.message}`);
    }
  }
}
