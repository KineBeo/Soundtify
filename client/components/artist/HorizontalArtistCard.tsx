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
      className="cursor-pointer"
      onClick={onClick}
    >
      <div
        className="
          p-4 bg-gradient-to-t from-[#2c2a2a4a] to-[#2c2a2ac7] hover:bg-[#4340409d]
          tablet:hover:bg-transparent mobile:hover:bg-transparent
          rounded h-full mini-laptop:p-3 tablet:p-0 tablet:from-transparent tablet:to-transparent
          mobile:from-transparent mobile:to-transparent mobile:p-0 transition-all
        "
      >
        <div
          className="
            w-[160px] h-[160px] relative rounded-full overflow-hidden
            mini-laptop:w-[140px] mini-laptop:h-[140px] 
            tablet:w-[130px] tablet:h-[130px] mobile:w-[100px] mobile:h-[100px]
          "
        >
          <Image
            src={artist.avatar.url}
            alt={`${artist.display_name} cover image`}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>

        <p className="line-clamp-2 mobile:text-center tablet:text-center mt-4 text-base mobile:text-sm tablet:text-sm">
          {artist.display_name}
        </p>
        <p
          className="
            line-clamp-2 mt-0.5 text-sm text-gray-400 
            mobile:text-xs tablet:text-xs
            mobile:text-center tablet:text-center
          "
        >
          Artist
        </p>
      </div>
    </div>
  );
};

export default HorizontalArtistCard;