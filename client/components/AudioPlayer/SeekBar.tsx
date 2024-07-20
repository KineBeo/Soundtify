import React, { useEffect, useState } from 'react'
import { AudioPlayerState, setSeekTime } from '@/lib/features/audioPlayer/audioPlayerSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { RootState } from '@/lib/store';
import { Slider, SliderValue } from '@nextui-org/react'
import { twMerge } from 'tailwind-merge';

interface SeekBarProps {
    className: string;
}
const SeekBar: React.FC<SeekBarProps> = ({
    className
}) => {
    const getTime = (time: number) => {
        return `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;
    }

    const {
        isPlaying,
        currentTime,
        duration
    }: AudioPlayerState = useAppSelector((state: RootState) => state.audioPlayer);

    const dispatch = useAppDispatch();

    const [time, changeTime] = useState<number>(0);
    const [seeking, setSeeking] = useState<boolean>(false);

    useEffect(() => {
        if (!seeking) {
            changeTime(currentTime);
        }
    }, [currentTime, seeking]);

    const seek = (value: number | number[]) => {
        setSeeking(false);
        const seekTime = Array.isArray(value) ? value[0] : value;
        changeTime(seekTime);
        dispatch(setSeekTime(seekTime));
    }
    return (
        <Slider
            className={twMerge(`text-gray-300 text-md`, className)}
            size="sm"
            color={"foreground"}
            step={0.01}
            value={time}
            maxValue={duration}
            minValue={0}
            defaultValue={0}
            onChangeEnd={(value: SliderValue) => seek(value)}
            onChange={(value: SliderValue) => {
                const newTime = Array.isArray(value) ? value[0] : value;
                changeTime(newTime);
                setSeeking(true);
            }}
            startContent={<span className='block min-w-[50px] text-center'>{time ? getTime(time) : "0:00"}</span>}
            endContent={<span className='block min-w-[50px] text-center'>{getTime(duration)}</span>}
            aria-label="Audio seek bar"
        />
    );
}

export default SeekBar