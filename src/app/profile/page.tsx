"use client";

import { useEffect, useState } from "react";
import axiosInstance, { accessToken } from "@/utils/middleware";
import { auth } from "@/utils/auth";

type ProfileDetails = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export default function page() {
  auth();
  const [details, setDetails] = useState<ProfileDetails>();
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    const data = await axiosInstance.get("/profile");

    setDetails(data.data);
    console.log(data.data);
    setLoading(false);
  }

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen ">
        {!accessToken || loading ? (
          <>
            <div className="w-32 h-32">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <circle
                  fill="none"
                  stroke-opacity="1"
                  stroke="#4f46e5"
                  stroke-width=".5"
                  cx="100"
                  cy="100"
                  r="0">
                  <animate
                    attributeName="r"
                    calcMode="spline"
                    dur="2"
                    values="1;80"
                    keyTimes="0;1"
                    keySplines="0 .2 .5 1"
                    repeatCount="indefinite"></animate>
                  <animate
                    attributeName="stroke-width"
                    calcMode="spline"
                    dur="2"
                    values="0;25"
                    keyTimes="0;1"
                    keySplines="0 .2 .5 1"
                    repeatCount="indefinite"></animate>
                  <animate
                    attributeName="stroke-opacity"
                    calcMode="spline"
                    dur="2"
                    values="1;0"
                    keyTimes="0;1"
                    keySplines="0 .2 .5 1"
                    repeatCount="indefinite"></animate>
                </circle>
              </svg>
            </div>
          </>
        ) : (
          <div className="lg:min-w-96 max-w-sm mx-auto p-6 rounded-2xl border border-gray-200">
            <div className="text-center">
              <div className="overflow-hidden w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-500">
                <img
                  src="https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-622.jpg?semt=ais_hybrid&w=740"
                  alt="avatar"
                />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                {details?.name}
              </h2>
              <p className="text-sm text-gray-600">{details?.email}</p>
            </div>
            <div className="mt-6 text-sm text-gray-700">
              <p>
                <span className="font-medium">Created:</span>{" "}
                {details?.createdAt &&
                  new Date(details.createdAt).toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Updated:</span>{" "}
                {details?.updatedAt &&
                  new Date(details.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
