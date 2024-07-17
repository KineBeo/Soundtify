import React from "react";
import Artist from "@/interfaces/artist";
import Track from "@/interfaces/track";
import Image from "next/image";
import PlayPauseButton from "../PlayPauseButton";
import { useAppSelector } from "@/lib/hook";
import { RootState } from "@/lib/store";
import { getAllArtists } from "@/lib/features/artist/getAllArtists";
interface HorizontalSongCardProps {
    song: Track
    onClick: () => void;
}

function HorizontalSongCard({ song, onClick }: HorizontalSongCardProps) {

    const { activeSong, isPlaying } = useAppSelector((state: RootState) => state.audioPlayer);
    const artists = getAllArtists();
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
                    src={song.cover_image?.url || "/images/liked.png"}
                    alt="song cover image"
                    width={200}
                    height={200}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                    {artists?.find((artist: Artist) => artist.id === song.user_id)?.username || "Unknown Artist"}
                </p>
            </div>
            <div className="
            absolute
            bottom-24
            right-4">
                <PlayPauseButton
                    isPlaying={(activeSong?.id === song.id) && isPlaying} />
            </div>
        </div>
    );
}

export default HorizontalSongCard;