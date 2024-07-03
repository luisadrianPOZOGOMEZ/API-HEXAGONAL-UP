import mongoose, { Document, Schema } from "mongoose";

import { User } from "../domain/User";

export interface UserDocument extends User, Document {
  id: number | null;
  name: string;
  age: number;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

export const UserModel = mongoose.model<UserDocument>("users", UserSchema);
