import { AudioPlayerState, nextSong, onRepeat, onShuffle, playPause, setVolume, toggleModal } from '@/lib/features/audioPlayer/audioPlayerSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, ModalContent, Tooltip } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import LikeButton from './AudioPlayer/LikeButton';
import SeekBar from './AudioPlayer/SeekBar';
import ControlCenter from './AudioPlayer/ControlCenter';
import VolumeControl from './AudioPlayer/VolumeControl';
import { BiChevronDown } from 'react-icons/bi';
import { BiDownload } from 'react-icons/bi';
import { Image } from "@nextui-org/react"
import { RootState } from '@/lib/store';
import { HomePageState } from '@/lib/features/homePage/homePageSlice';
export default function Playing({ isOpen, handleClose }: any) {
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
    const { allArtists }: HomePageState = useAppSelector((state: RootState) => state.homepage);

    const toNextSong = () => {
        let nextSongIndex = currentIndex + 1;
        if (isShuffle) {
            nextSongIndex = Math.floor(Math.random() * songs.length);
        }
        dispatch(nextSong(nextSongIndex));
    }

    const toPrevSong = () => {
        let prevSongIndex = currentIndex - 1;
        if (isShuffle) {
            prevSongIndex = Math.floor(Math.random() * songs.length);
        }
        dispatch(nextSong(prevSongIndex));
    }

    const updateVolume = (volume: any) => {
        dispatch(setVolume(volume));
    }

    if (!activeSong) {
        return;
    }

    return (
        <Modal
            size={"full"}
            isOpen={isOpen}
            hideCloseButton>
            <ModalContent className='relative overflow-hidden'>
                <Image
                    alt='bg-gradient-right'
                    src='/bg-gradient-right.png'
                    width={1833}
                    height={1832}
                    className='
                    absolute 
                    dark:opacity-70
                     -top-[40%]
                      -right-[30%]
                       z-10 
                       rotate-12 
                       mobile:-right-[10%]
                       mobile:-top-0
                       tablet:-right-[10%] 
                       tablet:-top-0
                       '
                />
                <Image
                    alt='bg-gradient-left'
                    src='/bg-gradient-left.png'
                    width={1266}
                    height={1211}
                    className='absolute dark:md:block dark:opacity-70 -left-[20%] z-10' />
                <div className='w-full h-full z-20'>
                    <div className='
                    backdrop-blur-[100px] 
                    w-full 
                    h-full 
                    flex 
                    flex-row
                    items-center
                    justify-center
                    mobile:block
                    tablet:block'
                        onClick={() => handleClose()}>
                        <div className='
                            m-auto
                            flex
                            flex-row
                            justify-center
                            mobile:items-start
                            tablet:items-start
                            items-center
                            '
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                            }}>
                            <SongCoverImage activeSong={activeSong}
                                className="
                                mobile:hidden
                                tablet:hidden
                                mb-6
                                my-4
                            " />
                            <div
                                className='
                                flex
                                flex-col
                                h-[450px]
                                justify-between
                                items-center
                                px-6
                                py-2
                                mobile:h-screen
                                mobile:mt-4
                                tablet:mt-4
                                mini-laptop:h-[400px]
                                desktop:h-[400px]'>
                                <div className='
                                    flex
                                    flex-row
                                    justify-between
                                    items-center
                                    text-white
                                    mobile:w-[340px]
                                    mobile:mb-6
                                    tablet:w-[400px]
                                    tablet:mb-8
                                    '>
                                    <Tooltip content="Go back">
                                        <Button
                                            isIconOnly
                                            radius='full'
                                            size='sm'
                                            onClick={() => handleClose()}
                                            className='hover:bg-white hover:text-black text-gray-100 shadow flex items-center justify-center'>
                                            <i className='text-[25px]'>
                                                <BiChevronDown />
                                            </i>
                                        </Button>
                                    </Tooltip>
                                    <div className='flex flex-row items-center'>
                                        <h1 className='
                                        text-center
                                        uppercase
                                        mx-2
                                        tracking-wider
                                        '>
                                            Now Playing
                                        </h1>
                                    </div>
                                    <div className='
                                    w-8
                                    h-8
                                    shadow
                                    flex
                                    items-center
                                    justify-center
                                    rounded
                                    cursor-pointer'>
                                        <div className='relative'>
                                            <Dropdown placement='bottom-end'>
                                                <DropdownTrigger>
                                                    <i
                                                        className='text-[22px] text-gray-300 hover:text-white'
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                        }}>

                                                    </i>
                                                </DropdownTrigger>
                                                <DropdownMenu aria-label='Static Actions'>
                                                    <DropdownItem
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            dispatch(
                                                                toggleModal({
                                                                    data: true,
                                                                    song_id: activeSong?.id,
                                                                })
                                                            )
                                                        }}>
                                                        Add To playlist
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                                <SongCoverImage
                                    activeSong={activeSong}
                                    className="hidden
                                    mobile:block mobile:mb-6 mobile:my-4
                                    tablet:block tablet:mb-6 tablet:my-4" />
                                <div className='flex flex-col justify-center items-center mobile:pb-14'>
                                    <div className='mb-10 flex flex-row justify-between items-center w-full 
                                    mobile:w-[320px]
                                    tablet:w-[400px]
                                    mini-laptop:w-[320px]
                                    desktop:w-[350px]
                                    
                                     '>
                                        <div>
                                            <p className='text-gray-300 cursor-pointer line-clamp-1 
                                        text-lg mobile:text-sm mini-laptop:text-base'>
                                                {activeSong!.track_name}
                                            </p>
                                            <p className='text-gray-400 text-sm hover:underline cursor-pointer'
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}>
                                                {allArtists?.find((artist: any) => artist.id === activeSong!.user_id)?.display_name || "Unknown Artist"}
                                            </p>
                                        </div>
                                        <div className='w-10 h-10 flex items-center justify-center'>
                                            {/* pass user_id here */}
                                            <LikeButton user_id={1} song_id={activeSong!.id} size={25} isList={true} />

                                        </div>
                                    </div>
                                    <SeekBar className='visible' />
                                    <ControlCenter
                                        isFullScreen={true}
                                        isShuffle={isShuffle}
                                        isRepeat={isRepeat}
                                        onRepeat={() => {
                                            dispatch(onRepeat(!isRepeat))
                                        }}
                                        playPause={() => {
                                            dispatch(playPause(!isPlaying))
                                        }}
                                        isPlaying={isPlaying}
                                        nextSong={toNextSong}
                                        prevSong={toPrevSong}
                                    />
                                    <div className='flex flex-row justify-between mt-10 w-full mobile:w-[320px] tablet:max-[400px]'>
                                        <VolumeControl
                                            isFullScreen={true}
                                            updateVolume={updateVolume}
                                            size={25}
                                            volume={volume}
                                        />
                                        <div>
                                            {/* <Tooltip content="Download">
                                                <i className='cursor-pointer text-gray-400 hover:text-white mx-3'
                                                    onClick={(e: React.MouseEvent) => {
                                                        e.stopPropagation();
                                                        // window.open(download_url, '_blank');
                                                    }}>
                                                    <BiDownload size={25} />
                                                </i>
                                            </Tooltip> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </ModalContent>
        </Modal>
    )
}

function SongCoverImage({ activeSong, className }: any) {
    return (
        <Image
            src={activeSong!.cover_image || "/images/liked.png"}
            width={450}
            height={450}
            alt="Playing Image"
            className={`
            w-[450px] h-[450px] min-w-[450px]
            mobile:w-[320px] mobile:h-[320px] mobile:min-w-[320px] mobile:min-h-[320px]
            tablet:mx-4 tablet:w-[330px] tablet:h-[330px] tablet:min-w-[330px] tablet:min-h-[330px]
            mini-laptop:mx-4 mini-laptop:w-[370px] mini-laptop:h-[370px] mini-laptop:min-w-[370px]
            desktop:mx-4 desktop:w-[400px] desktop:h-[400px] desktop:min-w-[400px]
            relative 
            rounded-2xl object-cover 
          ` + className
            }
        />
    );
}