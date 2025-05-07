"use client";

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://demo-auth.shafiulislam20.workers.dev",
  timeout: 10000,
});

// Function to check access token and redirect if missing

export const accessToken = localStorage.getItem("accessToken");
export const refreshToken = localStorage.getItem("refreshToken");


axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          "https://demo-auth.shafiulislam20.workers.dev/auth/refresh-token",
          {
            token: refreshToken,
          }
        );

        if (res.status === 401) {
          window.location.href = "/login";
          return;
        }

        localStorage.setItem("accessToken", res.data.accessToken);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Redirect to login if token refresh fails
        // window.location.href = "/login";
        console.log("error");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
