import { useAppDispatch } from '@/lib/hook'
import React from 'react'
import { FaPlay } from 'react-icons/fa'
import { FaPause } from 'react-icons/fa6'
import { playPause } from '@/lib/features/audioPlayer/audioPlayerSlice'

interface PlayPauseButtonProps {
    isPlaying: boolean,
    className?: string
}
const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({
    isPlaying,
    className
}) => {

    const dispatch = useAppDispatch();
    return (
        <button
            onClick={() => dispatch(playPause(!isPlaying))}
            className='
        transition
        opacity-0
        rounded-full
        flex
        items-center
        bg-green-500
        p-4
        drop-shadow-md
        translate
        translate-y-1/4
        group-hover:opacity-100
        group-hover:translate-y-0
        hover:scale-110'
        >
            {isPlaying ?
                (<FaPause className='text-black' />)
                : (<FaPlay className='text-black' />)}

        </button>
    )
}

export default PlayPauseButton