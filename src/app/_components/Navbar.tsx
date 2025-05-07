'use client';

import { getToken, removeTokens } from '@/service/localstorage.service';
import axiosInstance from '@/utils/http-client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [token, setToken] = useState<string | null>();

  const handleLogOut = async () => {
    try {
      // Make the logout API call
      const response = await axiosInstance.post('/auth/logout');
      console.log(response);
      removeTokens() 
      // Redirect to the login page
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
 
  useEffect(() => {
    async function getItem() {
      const token = await getToken();
      setToken(token);
    }
    getItem();
  }, []);

  return (
    <>
      <nav className="fixed top-0 w-full border border-gray-200 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-gray-800 text-lg font-bold">My App</div>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className=" hover:text-gray-300">
                Home
              </Link>
            </li>
            {token ? (
              <>
                <li>
                  <Link href="/pokemon" className=" hover:text-gray-300">
                    Pokemon
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className=" hover:text-gray-300">
                    Profile
                  </Link>
                </li>
                <li>
                  <button onClick={() => handleLogOut()} className=" hover:text-gray-300">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login" className=" hover:text-gray-300">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
