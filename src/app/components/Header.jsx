"use client";
import React, { useState } from "react";
import Link from "next/link";
import { LoginBtn } from "../client-components/ClientC";
import axios from "axios";
import { FaBarsStaggered } from "react-icons/fa6";
const Header = () => {
  const [bar, setBar] = useState(false);

  return (
    <div className="headee flex justify-between items-center text-yellow-100 p-3 fixed w-full">
      <h1 className="logo text-2xl cursor-pointer">SBlog.</h1>
      {bar ? (
        <div className="nav-links flex flex-col fixed top-32 p-10 rounded bg-slate-400 text-black right-1 gap-3">
          <Link href={"/home"} className=" p-3 hover:bg-slate-500">
            Blogs
          </Link>
          <Link href={"/about"} className=" p-3 hover:bg-slate-500">
            Profile
          </Link>
          <Link href={"/api/auth/logout"} className=" p-3 hover:bg-slate-500">
            Logout
          </Link>
          <LoginBtn />
        </div>
      ) : null}
      <FaBarsStaggered
        className=" text-2xl cursor-pointer"
        onClick={() => setBar(!bar)}
      />
    </div>
  );
};

export default Header;
