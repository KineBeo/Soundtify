import React from 'react'
import { BiShuffle, BiRepeat } from 'react-icons/bi';
import { BiPlay, BiPause } from 'react-icons/bi';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { Button } from '@nextui-org/react'
interface ControlCenterProps {
    isPlaying: boolean;
    nextSong: () => void;
    prevSong: () => void;
    playPause: () => void;
    onRepeat: () => void;
    isShuffle: boolean;
    isRepeat: boolean;
    isFullScreen: boolean;
}

const ControlCenter: React.FC<ControlCenterProps> = ({
    isPlaying,
    nextSong,
    prevSong,
    playPause,
    onRepeat,
    isShuffle,
    isRepeat,
    isFullScreen
}) => {
    if (isFullScreen) {
        return (
            <div
                className='
            flex 
            flex-row 
            justify-between
            items-center
            mt-6
            mobile:w-[320px]
            tablet:w-[400px]'
            >
                <div
                    className='
                flex
                flex-col
                items-center
                mr-6'>
                    <i>
                        {/* shuffle here */}
                        <BiShuffle className='cursor-pointer 
                text-gray-300 
                text-[25px] 
                hover:text-white
                hover:scale-110' />
                    </i>
                </div>
                <div
                    className='
                flex 
                flex-row
                items-center'>
                    <i
                        onClick={prevSong}
                        className='
                    cursor-pointer
                    text-gray-300
                    hover:text-white
                    text-[24px]'
                    > <AiFillStepBackward /></i>
                    <Button
                        radius='full'
                        isIconOnly
                        onClick={playPause}
                        className='
                    bg-white
                    text-black
                    p-1
                    text-center
                    flex
                    items-center
                    justify-center
                    mx-6
                    scale-100
                    hover:scale-110
                    mobile:h-10
                    mobile:w-10
                    tablet:h-10
                    tablet:w-10
                    mini-laptop:h-12
                    mini-laptop:w-12
                    laptop:h-12
                    laptop:w-12'
                    > {!isPlaying
                        ?
                        <BiPlay className='text-[24px] ml-1' />
                        :
                        <BiPause className='text-[24px]' />}</Button>
                    <i onClick={nextSong}
                        className='
                    cursor-pointer
                    text-gray-300
                    hover:text-white
                    text-[24px]'
                    ><AiFillStepForward /></i>
                </div>
                <div className='
                flex
                flex-col
                items-center
                ml-6
                mr-2'>
                    <i
                        onClick={onRepeat}
                    >
                        <BiRepeat className='
                cursor-pointer 
                text-gray-300 
                text-[25px] 
                hover:text-white
                hover:scale-110'/>
                    </i>
                </div>
            </div>
        );
    }
    return (
        <div className='flex flex-row justify-center items-center mb-2 mobile:justify-end'>
            <div className='flex flex-col items-center mr-6 mobile:hidden'>
                <BiShuffle className='cursor-pointer 
                text-gray-300 
                text-[30px] 
                hover:text-white
                hover:scale-110' />
            </div>

            {/* previous song */}
            <i
                className='
                cursor-pointer 
                text-gray-300 
                text-[30px] 
                hover:text-white
                hover:scale-110
                mobile:hidden'
                onClick={(e) => {
                    e.stopPropagation();
                    prevSong();
                }
                }>
                <AiFillStepBackward />
            </i>
            {/* play button */}
            <Button
                isIconOnly
                radius='full'
                className='
                flex
                bg-white
                text-black
                p-1
                text-center
                items-center
                justify-center
                cursor-pointer
                mx-6
                scale-100
                hover:scale-110
                mobile:mx-0
                '
                onClick={(e) => {
                    e.stopPropagation();
                    playPause();
                }}>
                {!isPlaying
                    ?
                    <BiPlay className='text-[34px] ml-0.5' />
                    :
                    <BiPause className='text-[34px]' />}
            </Button>
            {/* next song */}
            <i
                className='
                cursor-pointer 
                text-gray-300 
                hover:text-white
                text-[30px]
                hover:scale-110 
                mobile:hidden
                '
                onClick={(e) => {
                    e.stopPropagation();
                    nextSong();
                }
                }>
                <AiFillStepForward />
            </i>
            <div className='flex flex-col items-center mx-6 mobile:hidden'>
                <BiRepeat className='
                cursor-pointer 
                text-gray-300 
                text-[30px] 
                hover:text-white
                hover:scale-110'/>
            </div>
        </div>
    )
}

export default ControlCenter