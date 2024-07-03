import mongoose, { Document, Schema } from "mongoose";

import { Publicity } from "../domain/Publicity";

export interface PublicityDocument extends Publicity, Document {
  id: number | null;
  description: string;
  image: string;
  image_s3: string;
}

const UserSchema: Schema = new Schema({
  description: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  image_s3: { type: String, required: true },
});

export const PublicityModel = mongoose.model<PublicityDocument>(
  "publicity",
  UserSchema
);
