'use client'
import React, { useState } from 'react'
import Header from '@/components/Header'
import Track from '@/interfaces/track'
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import algoliaClient from '@/config/algolia';
import { Image, Input } from '@nextui-org/react';
import { BiSearch } from 'react-icons/bi';
import MediaItem from '@/components/MediaItem';
import { AudioPlayerState, setActiveSong } from '@/lib/features/audioPlayer/audioPlayerSlice';
import { RootState } from '@/lib/store';
import PlayPauseButton from '@/components/PlayPauseButton';
import { HomePageState } from '@/lib/features/homePage/homePageSlice';
import Artist from '@/interfaces/artist';
import MobileHeader from '@/components/MobileHeader';
const Search = () => {
    const [searchResult, setSearchResult] = useState<Track[]>([]);
    const [topResult, setTopResult] = useState<any>();
    const [isFocus, setFocus] = useState(false);
    const dispatch = useAppDispatch();

    const toSongProps = (songs: any): Track[] => {
        return songs.map((song: any) => {
            return {
                id: song.id,
                track_name: song.track_name,
                cover_image: song.cover_image,
                src: song.src,
                user_id: song.user_id,
            }
        });
    };

    const searchAlgolia = async (query: string) => {
        if (query.length === 0) {
            setFocus(false);
            return;
        }

        setFocus(true);
        const data = await algoliaClient.search<Track>(query);
        if (data.hits.length !== 0) {
            setTopResult({
                type: 'track',
                ...data.hits[0]
            })
        }

        setSearchResult(toSongProps(data.hits));
    }
    return (
        <div className='
        rounded-lg
        bg-neutral-900
        h-full
        w-full
        overflow-hidden
        overflow-y-auto
        '>
            {/* <Header> */}
            <MobileHeader />
            <div className='w-full'>
                <div className='
                    py-4
                    px-6
                    fixed
                    z-40
                    backdrop-blur-sm
                    flex
                    flex-row
                    w-[calc(100vw_-_14rem_-_16px)]
                    max-[550px]:py-2
                    max-[550px]:w-screen
                    max-[550px]:px-4
                    max-[750px]:px-4
                    max-[874px]:w-[calc(100vw_-_55px)]
                    max-[750px]:w-screen
                    items-center
                    '>
                    <Input
                        radius='full'
                        startContent={
                            <i className='text-gray-50'>
                                <BiSearch /> </i>
                        }
                        onChange={(e: any) => searchAlgolia(e.target.value)}
                        type='text'
                        className='max-[550px]:w-[90%] max-[750px]:w-full w-[500px]'
                        placeholder='Search Music' />
                </div>
                {
                    isFocus ? (
                        <div>
                            {searchResult.length == 0 ? (
                                <div className='w-full text-center pt-10'></div>
                            ) : (
                                <div>
                                    <div className='pt-20 max-[550px]:pt-14 max-[750px]:pt-14'>
                                        <div className='overflow-y-hidden 
                                            flex 
                                            px-8 
                                            justify-items-stretch
                                            max-[874px]:px-4
                                            max-[750px]:flex-col
                                            max-[550px]:flex-col
                                            max-[550px]:px-4
                                            max-[750px]:px-6'>
                                            <div className='
                                                max-[550px]:w-full
                                                max-[750px]:w-full
                                                w-[32rem]
                                                max-[1280px]:w-[26rem]'>
                                                <h1 className='my-4 text-2xl max-[550px]:hidden max-[750px]:hidden font-bold'>
                                                    Top Result
                                                </h1>
                                                {topResult && (
                                                    <div>
                                                        <TopResult object={topResult} onTap={() =>
                                                            dispatch(setActiveSong({
                                                                index: 0,
                                                                songs: searchResult,
                                                            }))} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className='w-full ml-6
                                                max-[550px]:ml-0
                                                max-[550px]:mt-2
                                                max-[750px]:mt-2
                                                max-[750px]:m-0
                                                    '>
                                                <h1 className='my-4 text-2xl font-bold'>
                                                    Top Song
                                                </h1>
                                                {searchResult.slice(0, 4).map((song: Track, i: number) => {
                                                    return (
                                                        <MediaItem
                                                            key={song.id}
                                                            song={song}
                                                            onTap={() => dispatch(setActiveSong({
                                                                index: i,
                                                                songs: searchResult,
                                                            }))} />
                                                    )
                                                })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className=''>

                        </div>
                    )
                }
            </div>
            <div className='mb-32'></div>
            {/* </Header> */}
        </div>
    )
}

export default Search;

function TopResult({ object, onTap }: any) {
    const { activeSong, isPlaying }: AudioPlayerState = useAppSelector((state: RootState) => state.audioPlayer);
    const { allArtists }: HomePageState = useAppSelector((state: RootState) => state.homepage);
    if (object.type == "track") {
        return (
            <div
                onClick={onTap}
                className='flex flex-col h-[250px] bg-[#5f5d5d2f] relative hover:bg-[#5f5d5d2f] rounded 
            max-[550px]:hidden
            max-[750px]:hidden
            max-[550px]:h-full
            max-[750px]:h-full'>
                <div>
                    <PlayPauseButton
                        isPlaying={(activeSong?.id === object.id) && isPlaying}
                        className='transition-all duration-75 opacity-0 group-hover:opacity-100' />
                    <div className='p-6 max-[550px]:flex max-[750px]:flex'>
                        <div className='rounded relative w-24 h-24'>

                            <Image
                                alt={object.track_name}
                                src={object.cover_image || ""}
                                className='object-cover rounded w-24 h-24'
                            />
                        </div>
                        <div className='max-[550px]:mx-4 max-[750px]:mx-4'>
                            <p className='truncate mt-4 text-2xl font-bold'>
                                {object.track_name}
                            </p>
                            <div className='flex flex-row'>
                                <p className='text-gray-500'>Song •  </p>
                                <p className='text-white'>   {allArtists?.find((artist: Artist) => artist.id === object.user_id)?.display_name || "Unknown Artist"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className='
        h-[250px]
        flex
        flex-col
        p-6
        bg-[#5f5d5d2f]
        hover:bg-[#5f5d5d72]
        rounded
        max-[550px]:hidden
        max-[750px]:hidden
        max-[550px]:h-full
        max-[750px]:h-full
        '>
            <div className='rounded-full relative w-24 h-24'>
                <Image
                    src={object.cover_image || ""} alt='nigaa'
                    className='rounded-full' />
            </div>
            <p className='mt-4 text-2xl line-clamp-1'> {object.track_name} </p>
            <p>Artist</p>
        </div>
    )
}