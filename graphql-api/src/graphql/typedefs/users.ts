import { Field, ID, InputType, Int, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => Int)
  participation: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class UserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => Int)
  participation: number;
}
