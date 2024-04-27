import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    caption: String,
    image: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const post = mongoose.models.post || mongoose.model("post", postSchema);
export default post;
