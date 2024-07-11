import React from 'react'
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hook';
import LikeButton from './LikeButton';
interface ButtonsProps {
    volume: number;
    updateVolume: (volume: number) => void;
    className: string;
    showVolumeSeekbar: boolean;
    song_id: number;
    download_url: string;
}

const Buttons: React.FC<ButtonsProps> = ({
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
            <div>
                <LikeButton song_id={song_id} size={25} isList={false} />
            </div>
        </div>
    )
}

export default Buttons