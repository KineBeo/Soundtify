import React from "react";
import Artist from "@/interfaces/artist";
import Image from "next/image";

interface HorizontalArtistCardProps {
    artist: Artist;
    onClick: () => void;
}

const HorizontalArtistCard: React.FC<HorizontalArtistCardProps> = ({
    artist,
    onClick,
}) => {
    return (
        <div
            className="
            relative
            group
            flex
            flex-col
            items-center
            justify-center
            rounded-md
            overflow-hidden
            gap-x-4
            bg-neutral-400/5
            cursor-pointer
            hover:bg-neutral-400/20
            transition
            p-3"
            onClick={onClick}
        >
            <div
                className="
                relative
                aspect-square
                w-full
                h-full
                rounded-md
                overflow-hidden
                "
            >

                <Image
                    src={artist.avatar.url}
                    alt="artist cover image"
                    width={200}
                    height={200}
                    className="w-full h-full rounded-full object-cover"
                    loading="lazy"
                />
            </div>
            <div
                className="flex flex-col items-start w-full pt-4 gap-y-1"
            >
                <p className="font-semibold truncate w-full">
                    {artist.display_name}
                </p>
                <p className="
                text-neutral-400
                text-md
                pb-4
                w-full
                truncate
                ">
                    Artist
                </p>

            </div>
        </div>
    )
}

export default HorizontalArtistCard