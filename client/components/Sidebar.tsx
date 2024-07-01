'use client'

import { usePathname } from 'next/navigation'
import React, { useMemo } from 'react'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import Box from './Box'
import Sidebaritem from './Sidebaritem'
import Library from './Library'
interface SidebarProps {
    children: React.ReactNode

}
const Sidebar: React.FC<SidebarProps> = ({
    children
}) => {

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
        <div className='flex h-full'>
            <div
                className='
            hidden
            md:flex
            flex-col
            gap-y-2
            bg-black
            h-full
            w-[300px]
            p-2'>
                <Box>
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

                <Box className='h-screen overflow-y-auto'>
                    <Library />
                </Box>
            </div>
            <main className='h-full flex-1 overflow-y-auto py-2'>
                {children}
            </main>
        </div>
    )
}

export default Sidebar;