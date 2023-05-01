import mongoose from "mongoose";
const { Schema, model } = mongoose;

const preQA = new Schema(
  {
    question: {
      type: String,
      required: [true, "The question cann't be empty"],
      trim: true,
    },
    answer: {
      type: String,
      trim: true,
      required: [true, "The answer cann't be empty"],
    },
    idAdmin: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: [true, "Please enter the admin"],
      },
  },
  {
    collection: "PredefiendQA",
    timestamps: true,
  }
);

/**
 * @description Data model for users account
 */
const User = model("PredefiendQA", preQA);
export default User;
