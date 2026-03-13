import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Email is required"], unique: true },
  password: { type: String, required: [true, "Password is required"] },
  lastname: { type: String, require: [true, "Lastname is required"] },
  gender:{type:String, require:[true, "Gender is required"]},
  img: { type: String },
  roles: { type: [String], default: ["USER_ROLE"] },
});

export const UserModel = mongoose.model("User", userSchema);
