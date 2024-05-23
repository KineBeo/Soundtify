import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const MusicPlayerContext = createContext();

const PlayerContextProvider = (props) => {

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, setTrack] = useState(songsData[1]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState(
        {
            currentTime: {
                second: 0,
                minute: 0,

            },
            totalTime: {
                second: 0,
                minute: 0
            }
        }
    )

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const playWithId = async (id) => {
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayStatus(true);
    }

    const previousSong = async () => {
        if (track.id > 0) {
            await setTrack(songsData[track.id - 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        } else if (track.id === 0) {
            await setTrack(songsData[songsData.length - 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const nextSong = async () => {
        if (track.id < songsData.length - 1) {
            await setTrack(songsData[track.id + 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        } else if (track.id === songsData.length - 1) {
            await setTrack(songsData[0]);
            await audioRef.current.play();
            setPlayStatus(true);
        
        }
    }

    const seekSong = async (event) => {
        audioRef.current.currentTime = ((event.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration)
    }

    useEffect(() => {
        setTimeout(() => {

            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + '%';
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60),

                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                })
            }

        }, 1000)
    }, [audioRef])
    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId, 
        previousSong,
        nextSong,
        seekSong
    }

    return (
        <MusicPlayerContext.Provider value={contextValue}>
            {props.children}
        </MusicPlayerContext.Provider>
    )
}

export default PlayerContextProvider;