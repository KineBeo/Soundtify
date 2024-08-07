import Track from "@/interfaces/track";
import { RootState } from "@/lib/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Liked {
  trackId: number;
  userId: number;
}
export const audioPlayerApi = createApi({
  reducerPath: "audioPlayerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://soundtify.onrender.com",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    likeTrack: builder.mutation<Liked, { trackId: number; userId: number }>({
      query: ({ trackId, userId }) => ({
        url: `liked`,
        method: "POST",
        body: { trackId, userId },
      }),
    }),

    unlikeTrack: builder.mutation<object, { trackId: number; userId: number }>({
      query: ({ trackId, userId }) => ({
        url: `liked`,
        method: "DELETE",
        body: { trackId, userId },
      }),
    }),

    getLikedTracks: builder.mutation<Track[], number[]>({
      query: (liked) => ({
        url: `liked/liked-list`,
        method: "POST",
        body: { liked },
      }),
    }),
  }),
});

export const {
  useLikeTrackMutation,
  useUnlikeTrackMutation,
  useGetLikedTracksMutation,
} = audioPlayerApi;

export default audioPlayerApi;
