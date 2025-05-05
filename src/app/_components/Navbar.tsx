"use client";

import axiosInstance, { accessToken } from "@/utils/middleware";
import Link from "next/link";

export default function Navbar() {
  const handleLogOut = async () => {
    try {
      // Make the logout API call
      const response = await axiosInstance.post("/auth/logout");
      console.log(response);
      window.localStorage.clear();
      // Redirect to the login page
      window.location.href = "/";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <>
      <nav className="fixed top-0 w-full border border-gray-200 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-gray-800 text-lg font-bold">My App</div>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className=" hover:text-gray-300">
                Home
              </Link>
            </li>
            {accessToken ? (
              <>
                <li>
                  <Link href="/pokemon" className=" hover:text-gray-300">
                    Pokemon
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className=" hover:text-gray-300">
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => handleLogOut()}
                    className=" hover:text-gray-300">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login" className=" hover:text-gray-300">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
