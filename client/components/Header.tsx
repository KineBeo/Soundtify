'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { twMerge } from 'tailwind-merge';
import Button from './Button';
import { selectIsLoggedIn, selectCurrentname, selectCurrentUserEmail, logOut } from '@/lib/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { FaUserAlt } from 'react-icons/fa';
import { useLogoutMutation } from '@/lib/features/auth/authApi';
interface HeaderProps {
    children: React.ReactNode;
    className?: string;

}
const Header: React.FC<HeaderProps> = ({
    children,
    className
}) => {

    const router = useRouter();
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const username = useAppSelector(selectCurrentname);
    const userEmail = useAppSelector(selectCurrentUserEmail);
    const [logout] = useLogoutMutation();
    const authState = useAppSelector(state => state.auth);

    useEffect(() => {
        console.log('Header re-rendered. isLoggedIn:', isLoggedIn, 'username:', username);
    }, [isLoggedIn, username]);

    console.log('Auth State:', authState);
    console.log('Is Logged In:', isLoggedIn);

    const handleLogout = async () => {
        // handle logout
        if (userEmail) {
            try {
                await logout(userEmail).unwrap();
                dispatch(logOut());
                // router.refresh();
                router.push('/');
                console.log('Logged out successfully');
            } catch (error) {
                console.log('Error logging out:', error);
            }
        }

    }
    return (
        <div className={twMerge(`
            h-fit
            bg-gradient-to-b
            from-emerald-800
            p-6
        `, className)}>
            <div className='
                w-full
                mb-4
                flex
                items-center
                justify-between
            '>
                <div className='
                    hidden
                    md:flex
                    gap-x-2
                    items-center
                '>
                    <button
                        onClick={() => router.back()}
                        className='
                    rounded-full
                    bg-black
                    flex
                    items-center
                    justify-center
                    hover:opacity-75
                    transition
                    '>
                        <RxCaretLeft className='text-white' size={25} />
                    </button>

                    <button
                        onClick={() => router.forward()}
                        className='
                    rounded-full
                    bg-black
                    flex
                    items-center
                    justify-center
                    hover:opacity-75
                    transition
                    '>
                        <RxCaretRight className='text-white' size={25} />
                    </button>
                </div>
                <div className='flex md:hidden gap-x-2 items-center'>
                    <button
                        className='
                        rounded-full
                        p-2
                        bg-white
                        items-center
                        justify-center
                        hover:opacity-75
                        transition
                        '
                    >
                        <HiHome className='text-black' size={26} />
                    </button>
                    <button
                        className='
                        rounded-full
                        p-2
                        bg-white
                        items-center
                        justify-center
                        hover:opacity-75
                        transition
                        '
                    >
                        <BiSearch className='text-black' size={26} />
                    </button>
                </div>
                <div className='
                flex
                justify-between
                items-center
                gap-x-4
                '>
                    {isLoggedIn ? (
                        <div className='flex gap-x-4 items-center'>
                            <Button onClick={handleLogout}
                                className='bg-white px-6 py-2'
                            >
                                Logout
                            </Button>
                            <Button
                                onClick={() => router.push('/account')}
                                className="bg-white"
                            >
                                <FaUserAlt />
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div>
                                <Button
                                    onClick={() => { }}
                                    className='bg-transparent text-neutral-300 font-medium'
                                >
                                    Sign up
                                </Button>

                            </div>
                            <div>
                                <Button
                                    onClick={() => { router.push('/auth/login') }}
                                    className='bg-white px-6 py-2'
                                >
                                    Log In
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {children}
        </div >
    );
}

export default Header