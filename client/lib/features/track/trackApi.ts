import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Track from "@/interfaces/track";
import { url } from "inspector";
export const trackApi = createApi({
  reducerPath: "trackApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://soundtify.onrender.com",
  }),

  endpoints: (builder) => ({
    getAllTrack: builder.mutation<Track[], void>({
      query: () => ({
        url: "/tracks/all-tracks",
        method: "GET",
      }),
    }),
    getTrackByName: builder.mutation<Track, string>({
      query: (track_name) => ({
        url: `/tracks/name/${track_name}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllTrackMutation, useGetTrackByNameMutation } = trackApi;
