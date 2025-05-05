"use client";
import { useEffect, useState } from "react";
import axiosInstance, { accessToken } from "@/utils/middleware";
import { auth } from "@/utils/auth";

type PokemonDetails = {
  name: string;
};

export default function page() {
  auth();
  const [details, setDetails] = useState<PokemonDetails[]>([]);
  const [loading, setLoading] = useState(false);

  async function pokemonData() {
    setLoading(true);
    const pokemonDetails = await axiosInstance.get(
      "/pokemon?limit=10&offset=0"
    );

    setDetails(pokemonDetails.data.results as PokemonDetails[]);
    console.log(pokemonDetails.data.results);
    setLoading(false);
  }

  useEffect(() => {
    pokemonData();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        {!accessToken || loading ? (
          <div className="w-32 h-32">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              <circle
                fill="none"
                stroke-opacity="1"
                stroke="#4f46e5"
                stroke-width=".5"
                cx="100"
                cy="100"
                r="0">
                <animate
                  attributeName="r"
                  calcMode="spline"
                  dur="2"
                  values="1;80"
                  keyTimes="0;1"
                  keySplines="0 .2 .5 1"
                  repeatCount="indefinite"></animate>
                <animate
                  attributeName="stroke-width"
                  calcMode="spline"
                  dur="2"
                  values="0;25"
                  keyTimes="0;1"
                  keySplines="0 .2 .5 1"
                  repeatCount="indefinite"></animate>
                <animate
                  attributeName="stroke-opacity"
                  calcMode="spline"
                  dur="2"
                  values="1;0"
                  keyTimes="0;1"
                  keySplines="0 .2 .5 1"
                  repeatCount="indefinite"></animate>
              </circle>
            </svg>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold">Pokemon</h1>
            {details.map((item) => (
              <div key={item.name}>
                <h2>{item.name}</h2>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
