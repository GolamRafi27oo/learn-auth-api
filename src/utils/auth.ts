import { accessToken } from "./middleware";

export const auth = () => {
  if (!accessToken) {
    window.location.href = "/login"; // Redirect to login page
  }
};