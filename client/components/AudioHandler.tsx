'use client'
import {
    AudioPlayerState,
    nextSong,
    playPause,
    setCurrentTime,
    setDuration
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
    const requestRef = useRef<number | null>(null);

    const animate = () => {
        if (audioRef.current) {
            dispatch(setCurrentTime(audioRef.current?.seek() || 0));
            requestRef.current = requestAnimationFrame(animate);
        }
    }

    const handlePlay = () => {
        requestRef.current = requestAnimationFrame(animate);
    }

    const handlePause = () => {
        cancelAnimationFrame(requestRef.current!);
    }


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

        return () => cancelAnimationFrame(requestRef.current!);
    }, [isPlaying]);

    const toNextSong = () => {
        if (isShuffle) {
            dispatch(nextSong(Math.floor(Math.random() * songs.length)));
        } else if (songs.length - 1 !== currentIndex) {
            dispatch(nextSong(currentIndex + 1));
        }
    }

    const handleLoad = () => {
        if (audioRef.current) {
            dispatch(setDuration(audioRef.current.duration()));
        }
    }
    // useEffect Repeat here

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume(volume);
        }
    }, [volume]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.seek(seekTime);
        }
    }, [seekTime]);

    useEffect(() => {
        if (!activeSong) {
            return;
        }

        if (audioRef.current) {
            audioRef.current.pause();
        }

        audioRef.current = new Howl({
            src: [activeSong!.src],
            onend: toNextSong,
            onload: handleLoad,
            onplay: handlePlay,
            onpause: handlePause,
            volume: volume,
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

            cancelAnimationFrame(requestRef.current!);
        };
    }, [activeSong, currentIndex]);

    useEffect(() => {
        dispatch(playPause(false));

        if (audioRef.current) {
            audioRef.current.seek(currentTime)
        }
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            cancelAnimationFrame(requestRef.current!);
        }
    }, [])
    return <></>
}

export default AudioHandler;