import { useAppDispatch } from '@/lib/hook';
import Track from '@/interfaces/track';
import React from 'react'
import HorizontalSongCard from './HorizontalSongCard';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Howl, Howler } from 'howler';
interface HorizontalSongsListProps {
    songs: Track[];
}
const HorizontalSongsList: React.FC<HorizontalSongsListProps> = ({
    songs
}) => {
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
                        if (song.src) {
                            const sound = new Howl({
                                src: [song.src],
                                html5: true,
                            });
                            sound.play();
                        }

                    }}
                />
            ))}

        </div>
    )
}

export default HorizontalSongsList