"use client";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const page = () => {
  let [image, setImage] = useState(null);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [bio, setBio] = useState("");
  let [website, setWebsite] = useState("");
  const imageChangeHandler = (e) => {
    let img = e.target.files[0];
    setImage(img);
  };
  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const bioChangeHandler = (e) => {
    setBio(e.target.value);
  };
  const websiteChangeHandler = (e) => {
    setWebsite(e.target.value);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("bio", bio);
    formData.append("website", website);

    try {
      let response = await axios.patch(
        "http://localhost:3000/api/auth/getmyProfile/update",
        formData
      );

      toast.success("Profile Updated Successfully");

      setBio("");
      setEmail("");
      setName("");
      setWebsite("");
      setImage(null);
    } catch (error) {
      toast.error("Failed to update profile.");
      console.log(error);
    }
  };

  return (
    <div className=" h-screen w-full flex justify-center items-center ">
      <form
        method="post"
        className=" flex flex-col gap-2 "
        onSubmit={formSubmitHandler}
      >
        <label className=" text-center text-2xl" htmlFor="profile-image">
          Select Your Profile Picture
        </label>
        <input
          type="file"
          name="file"
          placeholder="Profile Picture"
          onChange={imageChangeHandler}
          className=" border border-white rounded border-dotted p-2 cursor-pointer"
        />

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={nameChangeHandler}
          className=" bg-transparent p-2 text-white rounded border border-white "
        />
        <input
          type="text"
          name="email"
          onChange={emailChangeHandler}
          placeholder="Example@example.com"
          className=" bg-transparent p-2 text-white rounded border border-white "
        />
        <input
          type="text"
          name="bio"
          onChange={bioChangeHandler}
          placeholder="Bio...."
          className=" bg-transparent p-2 text-white rounded border border-white "
        />
        <input
          type="text"
          name="website"
          onChange={websiteChangeHandler}
          placeholder="Something.com"
          className=" bg-transparent p-2 text-white rounded border border-white "
        />
        <button className=" rounded p-3 bg-zinc-500 hover:bg-lime-900">
          Update
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default page;
