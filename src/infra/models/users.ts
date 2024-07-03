import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  participation: number;
}

const UserSchema: Schema = new mongoose.Schema(
  {
    _id: {
      type: Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    firstName: {
      type: String,
      required: [true, "The `firstName` field is required."],
    },
    lastName: {
      type: String,
      required: [true, "The `lastName` field is required."],
    },
    participation: {
      type: Number,
      required: [true, "The `participation` field is required."],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel: Model<IUser> =
  mongoose.models.Users || mongoose.model<IUser>("Users", UserSchema);

export default UserModel;
