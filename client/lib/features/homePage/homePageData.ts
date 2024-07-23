import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useEffect, useCallback } from "react";
import { useGetAllArtistMutation } from "../artist/artistApi";
import { useGetAllTrackMutation } from "../track/trackApi";
import { setError, setHomePageData, setLoading } from "./homePageSlice";

export const useHomePageData = () => {
  const dispatch = useAppDispatch();
  const {
    recentUsers,
    trendingArtists,
    popularArtists,
    topHits,
    popularHits,
    status,
  } = useAppSelector((state) => state.homepage);

  const [getAllArtist] = useGetAllArtistMutation();
  const [getAllTrack] = useGetAllTrackMutation();

  const fetchHomePageData = useCallback(async () => {
    dispatch(setLoading());
    try {
      const [artists, tracks] = await Promise.all([
        getAllArtist().unwrap(),
        getAllTrack().unwrap(),
      ]);
      dispatch(
        setHomePageData({
          recentUsers: artists.slice(0, 10),
          trendingArtists: artists.slice(10, 20),
          popularArtists: artists.slice(50, 60),
          topHits: tracks.slice(0, 10),
          popularHits: tracks.slice(31, 38),
          allArtists: artists,
          allTracks: tracks,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(setError());
    }
  }, [dispatch, getAllArtist, getAllTrack]);

  useEffect(() => {
    fetchHomePageData();
  }, [fetchHomePageData]);

  return {
    recentUsers,
    trendingArtists,
    popularArtists,
    topHits,
    popularHits,
    status,
  };
};
