import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import uploadImage from "@/utils/cloudinary";
import jwt from "jsonwebtoken";
import User from "@/models/user.models";

connectDB();

export const PATCH = async (request) => {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const website = formData.get("website");
    const bio = formData.get("bio");
    const file = formData.get("file");
    console.log(name, email, website, bio);

    // Upload image to Cloudinary
    if (file) {
      var image = await uploadImage(file, "profile-images");
      var imgurl = image.secure_url;
    }

    console.log(name, email, website, bio, imgurl);

    // Verify JWT token and get user ID
    const token = request.cookies.get("token");
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Update user data in MongoDB
    // const updatedUserData = await User.findById(userId);
    // console.log(updatedUserData);

    const updatedUser = await User.findByIdAndUpdate(userId, {
      $set: {
        fullname: name,
        email,
        website,
        image: imgurl,
        bio,
      },
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    console.log(updatedUser);

    // Log the updated user data
    console.log("Updated user data:", updatedUserData);

    // Return success response
    return NextResponse.json({ message: "Success" }).setStatus(200);
  } catch (error) {
    // Log the error

    // Return an error response
    return NextResponse.error({
      message: "Error occurred",
      error: error.message,
    });
  }
};
