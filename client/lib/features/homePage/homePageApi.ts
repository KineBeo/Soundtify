import { useAppDispatch } from "@/lib/hook";
import { useGetAllArtistQuery } from "../artist/artistApi";
import { useGetAllTrackQuery } from "../track/trackApi";
import error from "next/error";
import { useEffect } from "react";
import { setLoading, setError, setHomePageData } from "./homePageSlice";

export const getHomePageData = () => {
    try {
        const dispatch = useAppDispatch();
        const { data: tracks, error: trackError, isLoading: isLoadingTrack } = useGetAllTrackQuery();
        const { data: artists, error: artistError, isLoading: isLoadingArtist } = useGetAllArtistQuery();

        useEffect(() => {
            if (isLoadingTrack || isLoadingArtist) {
                dispatch(setLoading());
            } else if (trackError || artistError) {
                dispatch(setError());
            } else if (tracks && artists) {
                dispatch(setHomePageData({
                    recentUsers: artists.slice(0, 6),
                    trendingArtists: artists.slice(7, 10),
                    topHits: tracks.slice(0, 6),
                    popularHits: tracks.slice(7, 10),
                }));
            }
        }, [tracks, artists, trackError, artistError, isLoadingTrack, isLoadingArtist, dispatch]);


        const processedData = {
            randomArtists: artists?.slice(0, 6),
            trendingArtists: artists?.slice(7, 10),
            topHits: tracks?.slice(0, 6),
            popular: tracks?.slice(7, 10),
        }
        return {
            isLoading: isLoadingTrack || isLoadingArtist,
            error: trackError || artistError
        };
    } catch (error: any) {
        if (error.response) {
            throw {
                status: error.response.status,
                success: error.response.data.success,
                message: error.response.data.message
            }
        } else {
            throw error;
        }
    }
}
