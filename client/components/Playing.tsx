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
import Image from 'next/image';
import { RootState } from '@/lib/store';
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
                       max-[550px]:-right-[10%]
                       max-[550px]:-top-0
                       max-[750px]:-right-[10%] 
                       max-[750px]:-top-0
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
                    max-[550px]:block
                    max-[750px]:block'
                        onClick={() => handleClose()}>
                        <div className='
                            m-auto
                            flex
                            flex-row
                            justify-center
                            max-[550px]:items-start
                            max-[750px]:items-start
                            items-center
                            '
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                            }}>
                            <SongCoverImage activeSong={activeSong}
                                className="
                                max-[550px]:hidden
                                max-[750px]:hidden
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
                                max-[550px]:h-screen
                                max-[550px]:mt-4
                                max-[750px]:mt-4
                                max-[874px]:h-[400px]
                                max-[1280px]:h-[400px]'>
                                <div className='
                                    flex
                                    flex-row
                                    justify-between
                                    items-center
                                    text-white
                                    max-[550px]:w-[340px]
                                    max-[550px]:mb-6
                                    max-[750px]:w-[400px]
                                    max-[750px]:mb-8
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
                                    max-[550px]:block max-[550px]:mb-6 max-[550px]:my-4
                                    max-[750px]:block max-[750px]:mb-6 max-[750px]:my-4" />
                                <div className='flex flex-col justify-center items-center max-[550px]:pb-14'>
                                    <div className='mb-10 flex flex-row justify-between items-center w-full 
                                    max-[550px]:w-[320px]
                                    max-[750px]:w-[400px]
                                    max-[874px]:w-[320px]
                                    max-[1280px]:w-[350px]
                                    
                                     '>
                                        <div>
                                            <p className='text-gray-300 cursor-pointer line-clamp-1 md:text-lg sm:text-sm text-sm'>
                                                {activeSong!.track_name}
                                            </p>
                                            <p className='text-gray-400 text-sm hover:underline cursor-pointer'
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}>
                                                Artist here
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
                                    <div className='flex flex-row justify-between mt-10 w-full max-[550px]:w-[320px] max-[750px]:max-[400px]'>
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
        <div
            className={`
            w-[450px] h-[450px] min-w-[450px]
            max-[550px]:w-[320px] max-[550px]:h-[320px] max-[550px]:min-w-[320px]
            max-[750px]:mx-4 max-[750px]:w-[400px] max-[750px]:h-[400px] max-[750px]:min-w-[400px]
            max-[874px]:mx-4 max-[874px]:w-[370px] max-[874px]:h-[370px] max-[874px]:min-w-[370px]
            max-[1280px]:mx-4 max-[1280px]:w-[400px] max-[1280px]:h-[400px] max-[1280px]:min-w-[400px]
            relative 
            mx-10
            rounded
          ${className}`
            }
        >
            <Image
                src={activeSong!.cover_image?.url || "/images/liked.png"}
                width={450}
                height={450}
                alt="Playing Image"
                className="
                w-[450px] h-[450px] min-w-[450px]
                max-[550px]:w-[320px] max-[550px]:h-[320px] max-[550px]:min-w-[320px]
                max-[750px]:mx-4 max-[750px]:w-[400px] max-[750px]:h-[400px] max-[750px]:min-w-[400px]
                max-[874px]:mx-4 max-[874px]:w-[370px] max-[874px]:h-[370px] max-[874px]:min-w-[370px]
                max-[1280px]:mx-4 max-[1280px]:w-[400px] max-[1280px]:h-[400px] max-[1280px]:min-w-[400px]
                object-cover rounded-2xl shadow-2xl
          "
            />
        </div>
    );
}