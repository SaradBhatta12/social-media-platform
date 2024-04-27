import connectDB from "@/utils/connectDB";
import User from "@/models/user.models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

connectDB();
export async function POST(req) {
  let { email, password } = await req.json();
  let user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({
      error: "User not found",
    });
  }
  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({
      error: "Password is incorrect",
    });
  }
  let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  cookies().set("token", token, { path: "/" });
  return NextResponse.json({
    message: "Logged in successfully",
  });
}
