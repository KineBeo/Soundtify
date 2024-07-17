import React from 'react'
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import LikeButton from './LikeButton';
import VolumeControl from './VolumeControl';
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
        <div className='w-full flex flex-row justify-end items-center'>
            <div className='flex flex-row items-center gap-3'
                onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                }}>
                <LikeButton user_id={user_id} song_id={song_id} size={25} isList={false} />
                {showVolumeSeekbar && (<VolumeControl volume={volume} updateVolume={updateVolume} size={26} />)}
            </div>
        </div>
    )
}

export default Buttons