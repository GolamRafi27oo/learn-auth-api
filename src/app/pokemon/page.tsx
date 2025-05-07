'use client';
import { useEffect, useState } from 'react';
import { auth } from '@/utils/auth';
import axiosInstance from '@/utils/http-client';
import { getToken } from '@/service/localstorage.service';
import Link from 'next/link';

type PokemonDetails = {
  name: string;
  url: string;
};

export default function page() {
  auth();

  const [details, setDetails] = useState<PokemonDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [isToken, setToken] = useState<string | null>(null);

  async function pokemonData() {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/pokemon?limit=100&offset=0');
      setDetails(response.data.results);
    } catch (error) {
      console.error('Failed to fetch Pokémon list:', error);
    }
    setLoading(false);
  }

  const fetchToken = async () => {
    const token = await getToken();
    setToken(token);
  };

  useEffect(() => {
    fetchToken();
    pokemonData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {!isToken || loading ? (
        <div className="w-32 h-32">
          {/* Spinner */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <circle
              fill="none"
              strokeOpacity="1"
              stroke="#4f46e5"
              strokeWidth=".5"
              cx="100"
              cy="100"
              r="0"
            >
              <animate attributeName="r" dur="2s" values="1;80" repeatCount="indefinite" />
              <animate
                attributeName="stroke-width"
                dur="2s"
                values="0;25"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                dur="2s"
                values="1;0"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-4">Pokemon</h1>
          <div className="grid grid-cols-2 gap-4">
            {details.map((item, index) => {
              const name = item.name;
              return (
                <Link key={name} href={`/pokemon/${index+1}`}>
                  <div className="p-4 border rounded hover:bg-gray-100 cursor-pointer">
                    <h2 className="capitalize">{name}</h2>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
