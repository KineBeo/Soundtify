'use client'
import Track from '@/interfaces/track';
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { TbPlaylist } from 'react-icons/tb';
import MediaItem from './MediaItem';
import { useAppDispatch } from '@/lib/hook';
import { setActiveSong } from '@/lib/features/audioPlayer/audioPlayerSlice';
interface LibraryProps {
    songs: Track[];
}
const Library: React.FC<LibraryProps> = ({
    songs
}) => {
    const onClick = () => {
        // Handle upload 
    };
    const dispatch = useAppDispatch();
    return (
        <div className='flex flex-col'>
            <div
                className='
            flex 
            items-center
            justify-between
            px-5
            pt-4'>
                <div
                    className='
                    inline-flex
                    items-center
                    gap-x-2'
                >
                    <TbPlaylist className='text-neutral-400' size={26} />
                    <p className='
                     text-neutral-400
                     font-medium
                     text-md
                    '>
                        Your Library
                    </p>
                </div>
                <AiOutlinePlus
                    onClick={onClick}
                    size={20}
                    className='
                    text-neutral-400
                    cursor-pointer
                    hover:text-white
                    transition'
                />
            </div>
            <div className='
                flex 
                flex-col
                gap-y-2
                mt-4
                px-3
            '>
                {songs.map((song) => (
                    <MediaItem
                        key={song.id}
                        song={song}
                        onTap={() => dispatch(setActiveSong({
                            index: songs.indexOf(song),
                            songs: songs,
                            activeSong: song
                        }))}
                    />
                ))}
            </div>
        </div>
    )
}

export default Library