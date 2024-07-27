'use client'
import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import Box from './Box'
import Sidebaritem from './Sidebaritem'
import Library from './Library'
import { useAppSelector } from '@/lib/hook'
import { RootState } from '@/lib/store'
import { useGetLikedTracksMutation } from '@/lib/features/audioPlayer/audioPlayerApi'
import Track from '@/interfaces/track'
interface SidebarProps {
    children: React.ReactNode

}
const Sidebar: React.FC<SidebarProps> = ({
    children
}) => {
    const { liked } = useAppSelector((state: RootState) => state.audioPlayer);
    const [getLikedTracks] = useGetLikedTracksMutation();
    const [songs, setSongs] = useState<Track[]>([]);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const result = await getLikedTracks(liked).unwrap();
                setSongs(result);
            } catch (error) {
                console.log(error);
            }
        }

        fetchSongs();
    }, [getLikedTracks, liked]);

    const pathname = usePathname();
    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Home',
            active: pathname !== '/search',
            href: '/',
        },

        {
            icon: BiSearch,
            label: 'Search',
            active: pathname === '/search',
            href: '/search',
        }
    ], [pathname]);
    return (
        <div className='flex h-screen'>
            <div
                className='
            hidden
            md:flex
            flex-col
            gap-y-2
            bg-black
            h-screen
            w-[300px]
            p-2'>
                <Box className='h-fit'>
                    <div
                        className='
                        flex
                        flex-col
                        gap-y-4
                        px-5
                        py-4'
                    >
                        {routes.map((item) => (
                            <Sidebaritem
                                key={item.label}
                                {...item}
                            />
                        ))}

                    </div>
                </Box>

                <Box className='h-[76.5vh] overflow-y-scroll'>
                    <Library songs={songs} />
                </Box>
            </div>
            <main className='h-full flex-1 overflow-y-auto py-2'>
                {children}
            </main>
        </div>
    )
}

export default Sidebar;