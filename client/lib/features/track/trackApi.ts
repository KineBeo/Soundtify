import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Track from "@/interfaces/track";
export const trackApi = createApi({
  reducerPath: "trackApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
  }),

  endpoints: (builder) => ({
    getAllTrack: builder.mutation<Track[], void>({
      query: () => ({
        url: "/tracks/all-tracks",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllTrackMutation } = trackApi;
