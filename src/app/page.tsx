import Link from "next/link";

export default function Home() {
  return (
    <>
      
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-3xl font-bold">Welcome to the App</h1>
        <p className="mt-4">
          Please{" "}
          <Link className="text-blue-600" href={"/login"}>
            log in
          </Link>{" "}
          or{" "}
          <Link className="text-blue-600" href={"/signup"}>
            sign up
          </Link>{" "}
          to continue.
        </p>
      </div>
    </>
  );
}
