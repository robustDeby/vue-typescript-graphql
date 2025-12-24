import mongoose, { Schema, Document, Model } from "mongoose";

export interface UserDocument extends Document {
  name: string
  email: string
  avatar?: string
  birthday: Date
  password: string
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
        type:String,
        required:true,
        trim:true,
    },
    avatar: {
        type:String,
        default:''
    },
    birthday: {
        type:Date,
        required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const User: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);

export default User;
