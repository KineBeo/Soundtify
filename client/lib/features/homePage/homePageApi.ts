import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useEffect } from "react";
import { fetchArtists, fetchTracks } from "./homePageThunk";

export const useHomePageData = () => {
  console.log("Fetching home page data from useHomePageData");
  const dispatch = useAppDispatch();
  const { recentUsers, trendingArtists, topHits, popularHits, status } =
    useAppSelector((state) => state.homepage);

  useEffect(() => {
    if (!recentUsers && !trendingArtists && !topHits && !popularHits) {
      dispatch(fetchTracks());
      dispatch(fetchArtists());
    }
  }, [dispatch, recentUsers, trendingArtists, topHits, popularHits]);

  return { recentUsers, trendingArtists, topHits, popularHits, status };
};
