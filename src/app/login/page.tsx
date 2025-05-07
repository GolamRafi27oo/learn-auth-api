'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation'; // Import useRouter
import axiosInstance from '@/utils/http-client';
import { setAccessToken, setRefreshToken } from '@/service/localstorage.service';
import { auth } from '@/utils/auth';

export default function page() {
  auth();
  const [login, setLogin] = useState(Boolean);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(credentials);
    try {
      const response = await axiosInstance.post('/auth/login', {
        email: credentials.email,
        password: credentials.password,
      });
      setLogin(true);
      await setAccessToken(response.data.accessToken);
      await setRefreshToken(response.data.refreshToken);

    } catch (error) {
      setLogin(false);
      console.error('Error during login:', error);
    }
  };

  useEffect(() => {
    if (login === true) {
      redirect('/profile');
    }
  }, [login]);
  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* {!login && (
            <div className="bg-red-100 px-3 py-1.5 rounded-md my-2 translate-all duration-300 ease-in-out">
              Wrong Email or Password!
            </div>
          )} */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      password: e.target.value,
                    })
                  }
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <Link href={'/signup'} className="font-semibold text-indigo-600 hover:text-indigo-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
