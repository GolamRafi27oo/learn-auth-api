'use client'
import { useRouter } from "next/navigation"; // If you're using Next.js
import { useEffect } from "react";

export default function Auth() {
  const router = useRouter(); // Use Next.js router for navigation

  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");

    if (accessToken) {
      router.push("/pokemon"); // Navigate to /pokemon
    } else {
      router.push("/login"); // Navigate to /login
    }
  }, [router]); // Add router to the dependency array

  return null; // Render nothing while redirecting
}
