import Auth from "./_components/Auth";

export default function Home() {
  return (
    <>
      <Auth />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-3xl font-bold">Welcome to the App</h1>
        <p className="mt-4">Please log in or sign up to continue.</p>
      </div>
    </>
  );
}
