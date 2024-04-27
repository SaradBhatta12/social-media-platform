import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "@/models/user.models";
import post from "@/models/post.models";
import connectDB from "@/utils/connectDB";

connectDB();
export const GET = async (request) => {
  let token = request.cookies.get("token");
  if (!token) {
    NextResponse.json({
      success: false,
      message: "unauthorized login",
    });
  }
  const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
  let user = await User.findById(decoded.id);
  let pos = await post.find({ user: user._id });
  let allPosts = pos.reverse();
  return NextResponse.json({
    success: true,
    user: user,
    posts: allPosts,
    token: token,
  });
};
