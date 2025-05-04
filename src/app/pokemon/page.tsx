"use client";

import axios from "axios";
import PrivateRoute from "../_components/PrivateRoute";
import { useEffect, useState } from "react";

type PokemonDetails = {
  name: string;
  attricture: [details: string, url: string];
};

export default function page() {
  const accessToken = window.localStorage.getItem("accessToken");
  const [details, setDetails] = useState<PokemonDetails[]>([]);

  async function pokemonData() {
    const pokemonDetails = await axios.get(
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
      <PrivateRoute>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-3xl font-bold">Pokemon</h1>
          {details.map((item) => (
            <div key={item.name}>
              <h2>{item.name}</h2>
            </div>
          ))}
        </div>
      </PrivateRoute>
    </>
  );
}
