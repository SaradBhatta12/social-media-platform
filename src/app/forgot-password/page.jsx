"use client";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const page = () => {
  const [forgot, setForgot] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const result = await axios
      .post("http://localhost:3000/api/auth/forgot", {
        email: forgot,
      })
      .then((res) => {
        toast.success(res.data.message);
      });
    setForgot("");
  };

  return (
    <div>
      <form method="post" className="flex gap-3 m-3" onSubmit={submit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className=" bg-transparent outline-none border border-white rounded-xl p-2"
          onChange={(e) => setForgot(e.target.value)}
        />
        <button className=" border border-white w-[60px] rounded">Reset</button>
      </form>
      <Toaster />
    </div>
  );
};

export default page;
