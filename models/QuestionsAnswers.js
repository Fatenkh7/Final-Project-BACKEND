import mongoose from "mongoose";
const { Schema, model } = mongoose;

const QuestionsAnswers = new Schema(
  {
    type: {
      type: String,
      required: [true, "The type cann't be empty"],
      trim: true,
    },
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
    approved: {
      type: Boolean,
      required: [true, "The approve for the answer cann't be empty"],
    },
    idUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please enter the user"],
    },
  },
  {
    collection: "QuestionsAnswers",
    timestamps: true,
  }
);

/**
 * @description Data model for users account
 */
const User = model("QuestionsAnswers", QuestionsAnswers);
export default User;
