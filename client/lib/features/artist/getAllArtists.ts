"use client";
import Artist from "@/interfaces/artist";
import { useEffect, useState } from "react";
import { useGetAllArtistMutation } from "./artistApi";

export const getAllArtists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [useGetAllArtists] = useGetAllArtistMutation();
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const artists = await useGetAllArtists().unwrap();
        setArtists(artists);
      } catch (error) {
        console.log(error);
      }
    };

    fetchArtists();
  }, [useGetAllArtists]);

  return artists;
};
