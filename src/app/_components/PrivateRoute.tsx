"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const router = useRouter(); // Use Next.js router for navigation
  const accessToken = window.localStorage.getItem("accessToken");
  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
    }
  }, [router]); // Add router to the dependency array
  return <>{accessToken && children}</>; // Render the children if accessToken is present
}
