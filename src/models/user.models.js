import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    prifilePic: String,
    profession: String,
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    bio: String,
    website: String,

    post: [
      {
        task_name: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "post",
        },
      },
    ],
    forgotPasswordToken: String,
    forgotPasswordTokenExpire: Date,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
