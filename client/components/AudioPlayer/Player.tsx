'use client'
import React, { useState } from 'react'
import { AudioPlayerState, nextSong, playPause, setVolume } from '@/lib/features/audioPlayer/audioPlayerSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { RootState } from '@/lib/store'
import Image from 'next/image'
import Buttons from './Buttons'
import ControlCenter from './ControlCenter'
import SeekBar from './SeekBar'
import PlayingModal from '../Playing'
import { HomePageState } from '@/lib/features/homePage/homePageSlice'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
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
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { id } = useAppSelector((state: RootState) => state.auth);
    const { allArtists }: HomePageState = useAppSelector((state: RootState) => state.homepage);
    const artist = allArtists?.find((artist) => artist.id === activeSong?.user_id);
    const updateVolume = (volume: any) => {
        dispatch(setVolume(volume));
    }
    const [isOpenPlayingModal, setOpenPlayingModal] = useState(false);

    const toNextSong = () => {
        if (isShuffle) {
            const randomIndex = Math.floor(Math.random() * songs.length);
            dispatch(nextSong(randomIndex));
        } else if (songs.length - 1 != currentIndex) {
            dispatch(nextSong(currentIndex + 1));
        }
    }

    const toPrevSong = () => {
        if (isShuffle) {
            const randomIndex = Math.floor(Math.random() * songs.length);
            dispatch(nextSong(randomIndex));
        } else if (currentIndex != 0) {
            dispatch(nextSong(currentIndex - 1));
        }
    }

    if (!activeSong) {
        return;
    }

    return (
        <>
            <PlayingModal isOpen={isOpenPlayingModal} handleClose={() => setOpenPlayingModal(false)} />
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
        h-[120px]
        flex 
        flex-col
        justify-center
        backdrop-blur-xl'>
                <div
                    className='
             flex
             flex-row 
             items-center
             justify-between
             w-screen 
             max-w-full
             mobile:p-2
             mobile:pb-0
             tablet:px-2'>
                    <div className='
                flex flex-row items-center w-full cursor-pointer'
                        onClick={() => setOpenPlayingModal(!isOpenPlayingModal)}>
                        <div
                            className='
                    w-[50px]
                    h-[50px]
                min-w-[50px]
                relative
                cursor-pointer
                rounded
                mobile:w-[35px]
                mobile:h-[35px]
                mobile:min-w-[35px] 
                tablet:w-[40px]
                tablet:h-[40px]
                tablet:min-w-[40px]
                '>
                            <Image className='
                    object-cover
                    w-full
                    h-full
                    relative
                    cursor-pointer
                    rounded
                    transition
                    scale-100
                    hover:scale-110'
                                alt={""}
                                src={activeSong.cover_image!}
                                width={100}
                                height={100}
                            />

                        </div>
                        <div className='mx-4 mobile:mx-3'>
                            <p
                                className='text-gray-300 cursor-pointer line-clamp-1 mobile:text-sm'>
                                {activeSong.track_name}
                            </p>
                            {/* fix later  */}
                            <>
                                <Link className='hover:underline text-green-500'
                                    href={`/artist/${artist?.id}`}
                                >
                                    {artist?.display_name}
                                </Link>
                            </>
                        </div>

                    </div>
                    {/* controls */}
                    <div className='w-full'>
                        <ControlCenter
                            isPlaying={isPlaying}
                            isFullScreen={false}
                            isRepeat={isRepeat}
                            isShuffle={isShuffle}
                            nextSong={() => { toNextSong() }}
                            prevSong={() => { toPrevSong() }}
                            onRepeat={() => { }}
                            playPause={() => { dispatch(playPause(!isPlaying)) }}
                        >
                        </ControlCenter>

                        <SeekBar className='mobile:hidden tablet:hidden' />
                    </div>
                    {/* button */}
                    <Buttons
                        user_id={id ? id : 0}
                        download_url={activeSong?.src || ""}
                        song_id={activeSong!.id}
                        updateVolume={updateVolume}
                        showVolumeSeekbar
                        volume={volume}
                        className='mobile:hidden tablet:hidden'
                    />
                </div>
            </div>
        </>

    )
}

export default Player


