'use client'
import Artist from '@/interfaces/artist'
import React from 'react'
import HorizontalArtistCard from './HorizontalArtistCard';

interface HorizontalArtistListProps {
    artists: Artist[];
}

const HorizontalArtistList: React.FC<HorizontalArtistListProps> = ({
    artists
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

            {artists.map((artist: Artist) => (
                <HorizontalArtistCard
                    key={artist.id}
                    artist={artist}
                    onClick={() => {
                        // change router here
                    }}
                />
            ))}
        </div>
    )
}

export default HorizontalArtistList