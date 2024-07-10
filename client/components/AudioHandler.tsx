'use client'
import {
    AudioPlayerState,
    playPause
} from "@/lib/features/audioPlayer/audioPlayerSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hook";
import { RootState } from "@/lib/store";
import { Howl } from "howler";
import { useRef, useEffect } from "react";
function AudioHandler() {

    const {
        isPlaying,
        activeSong,
        currentIndex,
        seekTime,
        currentTime,
        volume,
        fetchLikedStatus,
        playlistStatus,
        queue: songs,
        isShuffle,
        isRepeat,
    }: AudioPlayerState = useAppSelector((state: RootState) => state.audioPlayer);

    const dispatch = useAppDispatch();
    const audioRef = useRef<Howl | null>(null);
    const isReady = useRef(false);

    useEffect(() => {
        if (isPlaying) {
            if (audioRef.current) {
                audioRef.current.play();
            }
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        if (!activeSong) {
            return;
        }

        if (audioRef.current) {
            audioRef.current.pause();
        }

        audioRef.current = new Howl({
            src: activeSong?.src ? [activeSong.src] : [],
            html5: true,
            // onplay: handlePlay,
            // onpause: handlePause,
        });

        if (isReady.current) {
            audioRef.current.play();
            dispatch(playPause(true));
        } else {
            isReady.current = true;
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        }
    }, [activeSong, currentIndex]);

    return <></>
}

export default AudioHandler;