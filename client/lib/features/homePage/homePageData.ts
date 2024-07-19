import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useEffect } from "react";
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

  const [useGetAllArtist] = useGetAllArtistMutation();
  const [useGetAllTrack] = useGetAllTrackMutation();

  useEffect(() => {
    const fetchHomePageData = async () => {
      dispatch(setLoading());
      try {
        const [artists, tracks] = await Promise.all([
          useGetAllArtist().unwrap(),
          useGetAllTrack().unwrap(),
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
    };

    fetchHomePageData();
  }, [dispatch, useGetAllArtist, useGetAllTrack]);
  return {
    recentUsers,
    trendingArtists,
    popularArtists,
    topHits,
    popularHits,
    status,
  };
};
