'use client'
import { selectIsLoggedIn, selectCurrentname, selectCurrentUserEmail, logOut, selectIsRegistered } from '@/lib/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { useLogoutMutation } from '@/lib/features/auth/authApi';
import { FaUserAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import React from 'react'
import Button from './Button';
interface MobileHeaderProps {
    className?: string;
    bgColor?: string | undefined;

}
const MobileHeader: React.FC<MobileHeaderProps> = ({
    className,
    bgColor
}) => {
    const router = useRouter();
    const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const isRegistered = useAppSelector(selectIsRegistered);
    const userEmail = useAppSelector(selectCurrentUserEmail);
    const handleLogout = async () => {

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
        <div>
            <div className={twMerge(`
        h-fit
        p-6
      `, className)}
                style={bgColor ? { backgroundColor: bgColor } : {}}>
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
                            <HiHome className='text-black' size={26}
                                onClick={() => {
                                    router.push('/');
                                }} />
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
                            <BiSearch className='text-black' size={26}
                                onClick={() => {
                                    router.push('/search');
                                }} />
                        </button>
                    </div>
                    <div className='
                flex
                justify-between
                items-center
                gap-x-4
                '>
                        {isLoggedIn || isRegistered ? (
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
                                        onClick={() => { router.push('/auth/register') }}
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
            </div >
        </div>
    )
}

export default MobileHeader