import Reactt from 'react'
import { BiShuffle } from 'react-icons/bi';
import { BiPlay, BiPause } from 'react-icons/bi';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import Button from '../Button';
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
    return (
        <div className='flex flex-row justify-center items-center mb-2 sm:justify-end gap-6 xl:gap-8'>
            <div className='flex flex-col items-center'>
                BiShuffle
            </div>

            {/* previous song */}
            <i
                className='
                cursor-pointer 
                text-gray-300 
                text-[30px] 
                hover:text-white '
                onClick={(e) => {
                    e.stopPropagation();
                    prevSong();
                }
                }>
                <AiFillStepBackward />
            </i>
            {/* play button */}
            <Button className='
                flex
                bg-white
                text-black
                p-1
                text-center
                items-center
                justify-center
                cursor-pointer
                scale-100
                hover:scale-110'
                onClick={(e) => {
                    e.stopPropagation();
                    playPause();
                }}>
                {!isPlaying
                    ?
                    <BiPlay className='text-[32px] ml-0.5' />
                    :
                    <BiPause className='text-[32px]' />}
            </Button>
            {/* next song */}
            <i
                className='
                cursor-pointer 
                text-gray-300 
                hover:text-white
                text-[30px] 
                '
                onClick={(e) => {
                    e.stopPropagation();
                    nextSong();
                }
                }>
                <AiFillStepForward />
            </i>
            <div className='flex flex-col items-center'>
                BiShuffle
            </div>
        </div>
    )
}

export default ControlCenter