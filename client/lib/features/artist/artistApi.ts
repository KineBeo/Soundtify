import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Artist from "@/interfaces/artist";
export const artistApi = createApi({
  reducerPath: "artistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://soundtify.onrender.com",
  }),
  endpoints: (builder) => ({
    getAllArtist: builder.mutation<Artist[], void>({
      query: () => ({
        url: "/artist/all-artists",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllArtistMutation } = artistApi;
