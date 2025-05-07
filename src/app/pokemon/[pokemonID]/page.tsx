"use client";
import axios from "axios";
import { useEffect } from "react";

export default function page() {
  useEffect(() => {
    axios
      .get("https://demo-auth.shafiulislam20.workers.dev/profile")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return <>test id</>;
}
