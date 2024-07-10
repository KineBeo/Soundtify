import { RootState } from "@/lib/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const audioPlayerApi = createApi({
  reducerPath: "audioPlayerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    likeTrack: builder.mutation<void, number>({
      query: (trackId) => ({
        url: `liked`,
        method: "POST",
        body: { trackId },
      }),
    }),
  }),
});

export const { useLikeTrackMutation } = audioPlayerApi;

export default audioPlayerApi;
