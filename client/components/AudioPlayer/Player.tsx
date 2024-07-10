'use client'

import React from 'react'
import { AudioPlayerState, playPause } from '@/lib/features/audioPlayer/audioPlayerSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { RootState } from '@/lib/store'
import Image from 'next/image'
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


    if (!activeSong) {
        return;
    }
    return (
        <div
            className='
        fixed
        bottom-0
        left-0
        bg-black
        w-full
        py-2
        h-[80px]
        px-4'>
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
                {/* button */}
            </div>
        </div>
    )
}

export default Player


