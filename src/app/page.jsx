"use client";
import Link from "next/link";
import { FaHeart, FaComment, FaShare, FaUpload } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "axios";

const page = () => {
  const [post, getPost] = useState([]);
  const [user, getUser] = useState("");
  useEffect(() => {
    const getallPost = async () => {
      let response = await axios.get("http://localhost:3000/api/auth/home");
      getPost(response.data.posts);
      console.log(response);
    };
    getallPost();
  }, []);

  return (
    <div className="main-hero w-full h-screen ">
      <div className="left w-[50vmax] ">
        {post.map((each) => (
          <SocialMediaPost item={each} User={user} />
        ))}
      </div>

      <Link href={"/post"}>
        <div className="upload">
          <FaUpload className=" text-5xl absolute top-16 right-5 text-white cursor-pointer bg-slate-400 rounded p-2 hover:bg-slate-500" />
        </div>
      </Link>
    </div>
  );
};

const SocialMediaPost = (each) => {
  return (
    <div
      className="max-w-md mx-auto bg-black rounded-xl shadow-md overflow-hidden md:max-w-2xl"
      key={each.item.id}
    >
      <div className="md:flex">
        <div className="p-8">
          <div className="user-sec flex items-center gap-2 ">
            <div className="user h-[3rem] w-[3rem] border-r-[50%] object-cover object-center">
              <img
                src="https://source.unsplash.com/random"
                alt=""
                className=" overflow-hidden rounded-full h-[100%] w-[100%]"
              />
            </div>
            <div className="username">
              <div className=" tracking-wide text-sm text-white font-semibold capitalize">
                {each.item.user.fullname}
              </div>
              <div className="text-gray-300 text-sm">{each.item.createdAt}</div>
            </div>
          </div>

          <p className="mt-2 text-gray-300 m-1 capitalize">
            {each.item.caption}
          </p>

          <Link href={each.item.image}>
            <div className="md:flex-shrink-0">
              <img
                className="h-96 w-full object-cover rounded"
                src={each.item.image}
                alt="Post"
              />
            </div>
          </Link>

          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center space-x-2 gap-3 p-2">
              <button className="flex items-center text-gray-300 hover:text-red-500">
                <FaHeart className="w-5 h-5 mr-1" />
                <span>Like</span>
              </button>
              <button className="flex items-center text-gray-300 hover:text-blue-500">
                <FaComment className="w-5 h-5 mr-1" />
                <span>Comment</span>
              </button>
              <button className="flex items-center text-gray-300 hover:text-green-500">
                <FaShare className="w-5 h-5 mr-1" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
