"use client";
import Artist from "@/interfaces/artist";
import React from "react";
import HorizontalArtistCard from "./HorizontalArtistCard";
import { useRouter } from "next/navigation";
import ScrollContainer from "react-indiana-drag-scroll";
interface HorizontalArtistListProps {
  artists: Artist[];
}

const HorizontalArtistList: React.FC<HorizontalArtistListProps> = ({
  artists,
}) => {
  const router = useRouter();
  return (
    <ScrollContainer
      horizontal={true}
      vertical={false}
      className="flex flex-row gap-4 mt-4"
    >
      {artists.map((artist: Artist) => (
        <HorizontalArtistCard
          key={artist.id}
          artist={artist}
          onClick={() => {
            router.push(`/artist/${artist.id}`);
          }}
        />
      ))}
    </ScrollContainer>
  );
};

export default HorizontalArtistList;
