"use client";
import { useEffect, useState } from "react";
import axiosInstance, { accessToken} from "@/utils/middleware";
import { auth } from "@/utils/auth";

type PokemonDetails = {
  name: string;
};

export default function page() {
  auth();
  const [details, setDetails] = useState<PokemonDetails[]>([]);

  async function pokemonData() {
    const pokemonDetails = await axiosInstance.get(
      "https://demo-auth.shafiulislam20.workers.dev/pokemon?limit=10&offset=0",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    setDetails(pokemonDetails.data.results as PokemonDetails[]);
    console.log(pokemonDetails.data.results);
  }

  useEffect(() => {
    pokemonData();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-3xl font-bold">Pokemon</h1>
        {details.map((item) => (
          <div key={item.name}>
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </>
  );
}
