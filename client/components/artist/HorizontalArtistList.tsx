'use client'
import Artist from '@/interfaces/artist'
import React from 'react'
import HorizontalArtistCard from './HorizontalArtistCard';
import { useRouter } from 'next/navigation';

interface HorizontalArtistListProps {
    artists: Artist[];
}

const HorizontalArtistList: React.FC<HorizontalArtistListProps> = ({
    artists
}) => {

    const router = useRouter();
    return (
        <div
            className='
        grid
        mobile:grid-cols-2
        tablet:grid-cols-3
        mini-laptop:grid-cols-3
        laptop:grid-cols-5
        desktop:grid-cols-8
        gap-4
        mt-4'>

            {artists.map((artist: Artist) => (
                <HorizontalArtistCard
                    key={artist.id}
                    artist={artist}
                    onClick={() => {
                        router.push(`/artist/${artist.id}`);
                    }}
                />
            ))}
        </div>
    )
}

export default HorizontalArtistList