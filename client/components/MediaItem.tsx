import Track from '@/interfaces/track'
import Image from 'next/image';
import React from 'react'

interface MediaItemProps {
    song: Track;
}
const MediaItem: React.FC<MediaItemProps> = ({
    song
}) => {
    return (
        <div className='
    flex
    items-center
    gap-x-3
    cursor-pointer
    hover:bg-neutral-400/20
    w-full
    p-2
    rounded-md
    '>
            <div className='
        relative 
        rounded-md
        min-h-[50px]
        min-w-[50px]
        overflow-hidden
        '>
                <Image
                    className='object-cover'
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    src={song.cover_image?.url || ""}
                    alt='Image' />
            </div>
            <div className='
            flex
            flex-col
            gap-y-1
            overflow-hidden'>
                <p className='text-white truncate'>
                    {song.track_name}
                </p>
                <p className='text-neutral-400 text-md truncate'>
                    artist
                </p>
            </div>
        </div>
    )
}

export default MediaItem