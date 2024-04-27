// Import necessary modules
import { NextResponse } from "next/server";
import uploadImage from "@/utils/cloudinary";
import post from "@/models/post.models";
import jwt from "jsonwebtoken";
import connectDB from "@/utils/connectDB";
import User from "@/models/user.models";

// POST method to create a new post
connectDB();
export async function POST(request) {
  try {
    // Parse form data from the request
    const formData = await request.formData();
    const file = formData.get("image");
    const caption = formData.get("caption");

    // Upload image to Cloudinary
    const result = await uploadImage(file, "social-media");
    const image = result.secure_url;

    // Verify JWT token and extract user ID
    const token = request.cookies.get("token");
    const userid = jwt.verify(token.value, process.env.JWT_SECRET);

    // Create a new post
    const newPost = await post.create({ image, caption, user: userid.id });

    // Return success message in the response
    return NextResponse.json({
      message: "Successfully created a new post",
    });
  } catch (error) {
    // Return error message in the response
    return NextResponse.json({
      message: "Error creating a new post",
      error: error.message,
    });
  }
}

// GET method to fetch all posts
export async function GET(request) {
  try {
    // Fetch all posts and populate the 'user' field
    const posts = await post.find().populate("user");
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);

    // Return error message in the response
    return NextResponse.json({
      message: "Error fetching posts",
      error: error.message,
    });
  }
}
