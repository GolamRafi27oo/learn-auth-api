"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import PrivateRoute from "../_components/PrivateRoute";

type ProfileDetails = {
  id: string;
  name: string;
  email: string;
};

export default function page() {
  const accessToken = window.localStorage.getItem("accessToken");
  const [details, setDetails] = useState<ProfileDetails>();
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    const data = await axios.get(
      "https://demo-auth.shafiulislam20.workers.dev/profile",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    setDetails(data.data);
    setLoading(false);
  }

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <>
      <PrivateRoute>
        <h1>profile</h1>
        {loading ? (
          <>Loading...</>
        ) : (
          <>
            {details?.email}
            {details?.id}
            {details?.name}
          </>
        )}
      </PrivateRoute>
    </>
  );
}
