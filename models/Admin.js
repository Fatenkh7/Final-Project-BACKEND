import mongoose from "mongoose";
const { Schema, model } = mongoose;

const admin = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name cann't be empty"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name cann't be empty"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email cann't be empty"],
      unique: [true, "A admin is already registered with this email"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password cann't be empty"],
      minLength: [8, "the password is too short!"],
      maxLength: [80, "the password is too long!"],
    },
  },
  {
    collection: "Admin",
    timestamps: true,
  }
);

/**
 * @description Data model for users account
 */
const User = model("Admin", admin);
export default User;
