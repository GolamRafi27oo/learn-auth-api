'use client';

import { getToken } from '@/service/localstorage.service';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export const auth = () => {
  const [isToken, setToken] = useState<string | null>(null);

  useEffect(() => {
    const checkLocalToken = async () => {
      const token = await getToken();
      setToken(token);
      if (token === null) {
        redirect('/login'); // Redirect to login if token is null
      }
    };

    checkLocalToken(); // Call the function once when the component mounts
  }, []); // Empty dependency array ensures this runs only once
};