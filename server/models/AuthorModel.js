import mongoose from "mongoose";

const authorSchema = mongoose.Schema(
  {
    uid: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const AuthorModel = mongoose.model("Author", authorSchema);

export default AuthorModel;
