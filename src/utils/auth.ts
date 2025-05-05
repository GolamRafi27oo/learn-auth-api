import { useRouter } from "next/navigation";
import { accessToken } from "./middleware";

export const auth = () => {
  const router = useRouter(); // Initialize useRouter

  if (!accessToken) {
    router.push("/login"); // Redirect to login page
  } // Add accessToken and router as dependencies
};