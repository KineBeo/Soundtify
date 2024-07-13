import { useAppDispatch } from '@/lib/hook';
import Track from '@/interfaces/track';
import React from 'react'
import HorizontalSongCard from './HorizontalSongCard';
import { setActiveSong } from '@/lib/features/audioPlayer/audioPlayerSlice';
interface HorizontalSongsListProps {
    songs: Track[];
}
const HorizontalSongsList: React.FC<HorizontalSongsListProps> = ({
    songs
}) => {

    const dispatch = useAppDispatch();
    return (
        <div
            className='
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-8
            gap-4
            mt-4'>

            {songs.map((song: Track) => (
                <HorizontalSongCard
                    key={song.id}
                    song={song}
                    onClick={() => {
                        dispatch(
                            setActiveSong({
                                index: songs.indexOf(song),
                                songs: songs,
                            })
                        )
                    }}
                />
            ))}
        </div>
    )
}

export default HorizontalSongsList