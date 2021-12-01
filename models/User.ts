import { Schema, model, Document } from "mongoose";

enum Relationship {
  Single = "Single",
  InRelationship = "InRelationship",
  Engaged = "Engaged",
  Married = "Married",
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  coverPicture?: string;
  followers?: number[];
  following?: number[];
  isAdmin?: boolean;
  description?: string;
  city?: string;
  from?: string;
  relationship?: Relationship;
  _doc: any // MongoResult
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      min: 5,
      max: 64,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: [Number],
      default: [],
    },
    following: {
      type: [Number],
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: "",
      max: 50,
    },
    city: {
      type: String,
      default: "",
      max: 50,
    },
    from: {
      type: String,
      default: "",
      max: 50,
    },
    relationship: {
      type: String,
      enum: ["Single", "Married", "Engaged", "InRelationship"],
    },
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
