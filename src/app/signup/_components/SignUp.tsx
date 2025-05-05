"use client";

import axiosInstance from "@/utils/middleware";
import axios from "axios";
import { useState } from "react";

export default function SignUp() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [user, setUser] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [bgColor, setBgColor] = useState("bg-red-100");

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(credentials);
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/signup", credentials);
      setErrorMsg("Success");
      setBgColor("bg-green-100");
      setUser(true);
      window.location.href = "/login";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMsg("User with this email already exists");
        setUser(true);
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("400 Unexpected error:", error);
        setErrorMsg("Unexpected error! Please try again.");
      }
    }
  };

  return (
    <>
      <div className="mt-16 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign Up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {user && (
            <div
              className={`${bgColor} px-3 py-1.5 rounded-md my-2 translate-all duration-300 ease-in-out`}>
              {errorMsg}
            </div>
          )}
          <form onSubmit={handleSignUp} method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) =>
                    setCredentials({ ...credentials, name: e.target.value })
                  }
                  id="name"
                  name="name"
                  type="name"
                  required
                  autoComplete="name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
