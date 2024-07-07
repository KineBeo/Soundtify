import React from "react";
import Artist from "@/interfaces/artist";
import Track from "@/interfaces/track";
import Image from "next/image";
import Link from "next/link";
import PlayPauseButton from "../PlayPauseButton";
interface HorizontalSongCardProps {
    song: Track
    onClick: () => void;
}

function HorizontalSongCard({ song, onClick }: HorizontalSongCardProps) {


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
            hover:bg-neutral-400/10
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
                    src={song.cover_image?.url || "/images/liked.png"}
                    alt="song cover image"
                    width={200}
                    height={200}
                    className="w-full h-full rounded object-cover"
                />
            </div>
            <div
                className="flex flex-col items-start w-full pt-4 gap-y-1"
            >
                <p className="font-semibold truncate w-full">
                    {song.track_name}
                </p>
                <p className="
                text-neutral-400
                text-sm
                pb-4
                w-full
                truncate
                ">
                    By {song.user_id}
                </p>
            </div>
            <div className="
            absolute
            bottom-24
            right-5">
                <PlayPauseButton />
            </div>
            {/* <p className="line-clamp-2 mt-0.5 text-sm text-gray-400 sm:text-xs md:text-xs">
                    {artists.map((artist: Artist, index: number) => (
                        <React.Fragment key={artist.id}>
                            <Link
                                href={`/artist/${artist.id}`}
                                className="text-gray-300 text-sm"
                            >
                                {artist.username}
                            </Link>
                            {index < artists.length - 1 && ", "}
                        </React.Fragment>
                    ))}
                </p> */}

        </div>
    );
}

export default HorizontalSongCard;