import Artist from '@/interfaces/artist';
import Track from '@/interfaces/track'
import { AudioPlayerState } from '@/lib/features/audioPlayer/audioPlayerSlice';
import { HomePageState } from '@/lib/features/homePage/homePageSlice';
import { useAppSelector } from '@/lib/hook';
import { RootState } from '@/lib/store';
import Image from 'next/image';
import React from 'react'

interface MediaItemProps {
    song: Track;
    onTap: () => void
}
const MediaItem: React.FC<MediaItemProps> = ({
    song,
    onTap
}) => {
    const { activeSong }: AudioPlayerState = useAppSelector((state: RootState) => state.audioPlayer);
    const { allArtists }: HomePageState = useAppSelector((state: RootState) => state.homepage);
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
    '
            onClick={onTap}>
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
                    {activeSong?.id === song.id ?
                        (<div className='text-[#2bb540]'>
                            {song.track_name}
                        </div>)
                        : song.track_name}
                </p>
                <p className='text-neutral-400 text-md truncate'>
                    {allArtists?.find((artist: Artist) => artist.id === song.user_id)?.display_name || "Unknown Artist"}
                </p>
            </div>
        </div>
    )
}

export default MediaItem