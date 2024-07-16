import Track from '@/interfaces/track'
import React from 'react'
import MediaItem from '../MediaItem'
import LikeButton from './LikeButton'
import { useAppSelector } from '@/lib/hook'
import { AudioPlayerState } from '@/lib/features/audioPlayer/audioPlayerSlice'
import { RootState } from '@/lib/store'


interface LikedSongListProps {
    songs: Track[]
}
const LikedSongList: React.FC<LikedSongListProps> = ({
    songs
}) => {
    const {
        activeSong,
    }: AudioPlayerState = useAppSelector((state: RootState) => state.audioPlayer);
    const { id } = useAppSelector((state: RootState) => state.auth);
    if (songs.length === 0) {
        return (
            <div className='
            flex
            flex-col
            gap-y-2
            w-full
            px-6
            text-neutral-400
            text-lg
            font-semibold
            '>
                No songs liked yet
            </div>
        )
    }
    return (
        <div className='flex flex-col gap-y-2 w-full p-6'>
            {
                songs.map((song, index) => (
                    <div key={song.id}
                        className='flex items-center gap-x-4 w-full'>
                        <div className='flex-shrink-0 w-8 text-right text-gray-400 font-bold'>
                            {index + 1}
                        </div>
                        <div className='flex-1'>
                            <MediaItem song={song} />
                        </div>
                        <LikeButton user_id={id || 0} song_id={activeSong?.id || 0} size={25} isList={true} />

                    </div>
                ))
            }
        </div>
    )
}

export default LikedSongList;