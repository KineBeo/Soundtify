'use client'
import Header from "@/components/Header"
import ListItem from "@/components/ListItem";
import MediaItem from "@/components/MediaItem";
import { HomePageState } from "@/lib/features/homePage/homePageSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { RootState } from "@/lib/store";
import Image from "next/image"
import { VscVerifiedFilled } from "react-icons/vsc";
import { setActiveSong } from "@/lib/features/audioPlayer/audioPlayerSlice";
import MobileHeader from "@/components/MobileHeader";
export default function ArtistProfile({ params }: { params: { id: number } }) {
    const { allArtists }: HomePageState = useAppSelector((state: RootState) => state.homepage);
    const { allTracks }: HomePageState = useAppSelector((state: RootState) => state.homepage);
    const artist = allArtists?.find(artist => artist.id === Number(params.id));
    const artistTracks = allTracks?.filter(track => track.user_id === Number(params.id));
    const dispatch = useAppDispatch();
    return (
        <div>
            <MobileHeader className="bg-gradient-to-b
        from-emerald-800" />
            <div className="flex flex-row relative w-full h-[300px] max-[550px]:h-[250px]">
                <div className="flex flex-col justify-end absolute w-full h-full bg-opacity-40 z-10">
                    <div className="px-10 pb-10
                        max-[550px]:pb-6 
                        max-[550px]:px-4
                        max-[750px]:pb-6
                        max-[750px]:px-6
                        max-[874px]:px-7" >
                        <div className="flex gap-5">
                            <Image
                                src={artist?.avatar.url || ""}
                                alt="artist"
                                className="object-cover w-[200px] h-[200px] rounded-full shadow-2xl"
                                width={200}
                                height={200} />
                            <div className="flex flex-col">
                                <div className="flex">
                                    <i className="mr-2 text-blue-400">
                                        <VscVerifiedFilled className="text-[30px]" />
                                    </i>
                                    <p className="font-semibold mt-1 max-[450px]:hidden">
                                        Verified Artist
                                    </p>
                                </div>
                                <h1 className="text-[70px] 
                                    max-[450px]:text-[20px]
                                    max-[550px]:text-[30px]
                                    max-[750px]:text-[45px]
                                    max-[874px]:text-[60px]
                                    max-[1280px]:text-[60px]
                                    ">
                                    {artist?.display_name}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="pt-6 px-8 max-[550px]:px-5 max-[750px]:px-6">
                    <h1 className="text-2xl font-semibold">
                        Popular
                    </h1>
                    <div className="pt-4">
                        {artistTracks && artistTracks.length > 0 ? (
                            artistTracks.map((song) => (
                                <div key={song.id}>
                                    <MediaItem song={song} onTap={() => dispatch(setActiveSong({
                                        index: artistTracks.indexOf(song),
                                        songs: artistTracks,
                                        activeSong: song
                                    }))} />
                                </div>
                            ))
                        ) : (
                            <div>No songs available</div>
                        )}
                    </div>
                </div>
            </div>
            <div className="pb-32"></div>
        </div>

    )
}