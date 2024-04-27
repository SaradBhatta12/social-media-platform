"use client";
import React, { createContext, useContext, useState } from "react";
import Link from "next/link";

export const LoginBtn = () => {
  let { user } = useContext(Context);
  return user.id ? (
    <Link href={"/logout"} className=" p-3 hover:bg-slate-500">
      Logout
    </Link>
  ) : (
    <Link href={"/login"} className=" p-3 hover:bg-slate-500">
      Login
    </Link>
  );
};

export const TodoBtns = ({ id, isCompleted }) => {
  const delteHandler = () => {
    alert(`deleteing ${id}`);
  };
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={isCompleted}
        className="form-checkbox h-6 w-6 text-blue-500 mr-4"
      />
      <button
        onClick={() => delteHandler(id)}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  );
};

export const Context = createContext({ user: {} });

export const ContextProvider = ({ children }) => {
  let [user, setUser] = useState({});

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};
