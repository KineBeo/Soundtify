import React from 'react'
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import LikeButton from './LikeButton';
import VolumeControl from './VolumeControl';
import { Tooltip } from '@nextui-org/react';
import { BiDownload } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';
interface ButtonsProps {
    user_id: number,
    volume: number;
    updateVolume: (volume: any) => void;
    className: string;
    showVolumeSeekbar: boolean;
    song_id: number;
    download_url: string;
}

const Buttons: React.FC<ButtonsProps> = ({
    user_id,
    volume,
    updateVolume,
    className,
    showVolumeSeekbar,
    song_id,
    download_url
}) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    return (

        <div className={twMerge(`w-full flex flex-row justify-end items-center`, className)}>
            <div className='flex flex-row items-center gap-2'
                onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                }}>
                <LikeButton user_id={user_id} song_id={song_id} size={23} isList={false} />
                <Tooltip content="Download">
                    <i className='cursor-pointer text-gray-400 hover:text-white'
                        onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            window.open(download_url, '_blank');
                        }}>
                        <BiDownload size={23} />
                    </i>
                </Tooltip>
                {showVolumeSeekbar && (<VolumeControl volume={volume} updateVolume={updateVolume} size={23} isFullScreen={false} />)}
            </div>
        </div>
    )
}

export default Buttons