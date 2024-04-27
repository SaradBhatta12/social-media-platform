"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState("");
  const [post, setPost] = useState([]);

  useEffect(() => {
    let GetuserProfile = async () => {
      let response = await axios.get(
        "http://localhost:3000/api/auth/getmyProfile"
      );
      setUser(response.data.user);
      setPost(response.data.posts);
    };

    GetuserProfile();
  }, []);

  console.log(post);
  console.log(user);
  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      <div className=" mt-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 flex items-center">
            <img
              src={
                "https://images.pexels.com/photos/20678739/pexels-photo-20678739/free-photo-of-a-woman-is-looking-at-herself-in-a-mirror.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              alt="Profile"
              className="w-20  md:w-24 h-24 rounded-full"
            />
            <div className="ml-4">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold">
                {user.fullname}
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-gray-600">
                {"lorem tipsom jipsom ripsommmmm..........."}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {post.map((each) => (
            <div
              key={each.id}
              className="bg-white shadow-md rounded-md overflow-hidden"
            >
              <img
                src={each.image}
                alt="Post"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm md:text-base lg:text-lg text-gray-800">
                  {each.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
