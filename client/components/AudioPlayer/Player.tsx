'use client'

import React from 'react'
import { AudioPlayerState, playPause } from '@/lib/features/audioPlayer/audioPlayerSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { RootState } from '@/lib/store'
import Image from 'next/image'
import Buttons from './Buttons'
import ControlCenter from './ControlCenter'
const Player = () => {
    const {
        isPlaying,
        activeSong,
        currentIndex,
        volume,
        queue: songs,
        isShuffle,
        isRepeat,
    }: AudioPlayerState = useAppSelector((state: RootState) => state.audioPlayer);
    const dispatch = useAppDispatch();

    const { id } = useAppSelector((state: RootState) => state.auth);
    const updateVolume = (volume: number) => {
        dispatch(playPause({ volume }));
    }

    if (!activeSong) {
        return;
    }

    return (
        <div
            className='
        fixed
        bottom-0
        left-0
        right-0 
        bg-[#121212]/70
        border-t
        border-t-[#242424]
        w-full
        py-3
        px-4
        pb-4
        h-[100px]
        backdrop-blur-xl'>
            <div
                className='
             flex
             flex-row 
             items-center
             justify-between
             w-screen 
             max-w-full'>
                <div className='
                flex flex-row items-center w-full cursor-pointer'>
                    <div
                        className='
                    w-[50px]
                    h-[50px]
                min-w-[50px]
                relative
                cursor-pointer
                rounded'>
                        <Image className='
                    object-cover
                    w-full
                    h-full
                    relative
                    cursor-pointer
                    rounded'
                            alt={""}
                            src={activeSong.cover_image?.url || "/images/liked.png"}
                            width={100}
                            height={100}
                        />

                    </div>
                    <div className='mx-4'>
                        <p
                            className='text-gray-300 cursor-pointer line-clamp-1'>
                            {activeSong.track_name}
                        </p>
                        <p>
                            artist
                        </p>
                    </div>

                </div>
                {/* controls */}
                <div className=''>
                    <ControlCenter
                        isPlaying={isPlaying}
                        isFullScreen={false}
                        isRepeat={isRepeat}
                        isShuffle={isShuffle}
                        nextSong={() => { }}
                        prevSong={() => { }}
                        onRepeat={() => { }}
                        playPause={() => { }}
                    >
                    </ControlCenter>
                </div>
                {/* button */}
                <Buttons
                    user_id={id ? id : 0}
                    download_url={activeSong?.src || ""}
                    song_id={activeSong!.id}
                    updateVolume={updateVolume}
                    showVolumeSeekbar
                    volume={volume}
                    className=''
                />
            </div>
        </div>
    )
}

export default Player


