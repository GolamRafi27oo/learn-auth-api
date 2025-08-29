'use client';
import { useEffect, useState } from 'react';

interface AboutPokemon {
  name: string;
  type: string[];
  abilities: string[];
  image: string;
}
import { useParams } from 'next/navigation';
import axiosInstance from '@/utils/http-client';
import { auth } from '@/utils/auth';
import Loader, { SadPicachu } from '@/app/_components/Loader';
import Link from 'next/link';

export default function page() {
  auth();

  const params = useParams();
  const pokemonID = params.pokemonID as string;

  const [aboutPokemon, setAboutPokemon] = useState<AboutPokemon | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pokemonID) return;

    async function getData() {
      try {
        const response = await axiosInstance.get(`/pokemon/${pokemonID}`);
        setAboutPokemon(response.data);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch Pokémon data.');
      }
    }
    getData();
  }, [pokemonID]);

  console.log(aboutPokemon);

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <SadPicachu /> {error}
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {!aboutPokemon ? (
        <Loader />
      ) : (
        <div className="p-8">
          <h1 className="text-3xl font-bold capitalize">{aboutPokemon.name}</h1>
          <div>
            <p> Types: {aboutPokemon?.type?.join(', ')}</p>
            <p> Abilities: {aboutPokemon?.abilities?.join(', ')}</p>
          </div>
          <Link className="font-bold" href={'/pokemon'}>
            {`<`} Back
          </Link>
        </div>
      )}
    </div>
  );
}
