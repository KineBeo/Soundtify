'use client'

import Artist from "@/interfaces/artist"
import Track from "@/interfaces/track"
import { setHomePageData } from "@/lib/features/homePage/homePageSlice";
import { useAppDispatch } from "@/lib/hook";
import { useEffect } from "react";

interface ReduxStateUpdaterProps {
    data: {
        recentArtists: Artist[],
        trendingArtists: Artist[],
        popularArtists: Artist[],
        topHits: Track[],
        popularHits: Track[],
        allArtists: Artist[],
        allTracks: Track[],
    };
}

export default function ReduxStateUpdater({ data }: ReduxStateUpdaterProps) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setHomePageData({
            recentUsers: data.recentArtists,
            trendingArtists: data.trendingArtists,
            popularArtists: data.popularArtists,
            topHits: data.topHits,
            popularHits: data.popularHits,
            allArtists: data.allArtists,
            allTracks: data.allTracks
        }));
    }, [dispatch, data]);
    return null
}