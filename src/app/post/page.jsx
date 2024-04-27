"use client";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const UploadPostForm = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [caption, setCaption] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setImagePreview(selectedImage ? URL.createObjectURL(selectedImage) : ""); // Generate preview URL if image exists
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    try {
      // Perform your upload post logic here
      const response = await axios.post(
        "http://localhost:3000/api/auth/home",
        formData
      );

      // Handle response if needed
      console.log("Upload successful:", response.data);

      // Clear form fields after successful upload
      setImage(null);
      setImagePreview("");
      setCaption("");
      toast.success("Post uploaded successfully!");
      router.push("/home");
      setLoading(false);
    } catch (error) {
      // Handle errors if the upload fails
      console.error("Upload failed:", error);
      toast.error("Failed to upload post.");
    }
  };

  return (
    <div className="main h-[100vh] flex justify-center items-center ">
      <div className="container mx-auto p-8 bg-white shadow-md rounded-md max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Upload Post</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 font-bold mb-2"
            >
              Choose Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Selected"
                className="mt-2 max-w-xs"
              />
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="caption"
              className="block text-gray-700 font-bold mb-2"
            >
              Caption
            </label>
            <textarea
              id="caption"
              name="caption"
              rows="4"
              value={caption}
              onChange={handleCaptionChange}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Post
          </button>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default UploadPostForm;
