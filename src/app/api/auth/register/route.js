import connectDB from "@/utils/connectDB";
import User from "@/models/user.models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

connectDB();

export async function POST(req) {
  let body = await req.json();
  let { email, password, fullname } = body;
  if (!email || !password || !fullname) {
    return NextResponse.json({ error: "All fields are required" });
  }
  let user = await User.findOne({ email });
  if (user) return NextResponse.json({ error: "Email already exists" });
  const hashad = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashad, fullname });
  let userInDB = await User.findOne({ email });
  const token = jwt.sign({ id: userInDB._id }, process.env.JWT_SECRET);
  cookies().set("token", token, { path: "/" });
  return NextResponse.json({
    message: "User created successfully",
  });
}
