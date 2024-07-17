import React from 'react'
import { Slider, SliderValue, Tooltip } from '@nextui-org/react';
import { BiVolumeLow, BiVolumeFull, BiVolumeMute } from 'react-icons/bi';
interface VolumeControlProps {
    volume: number
    updateVolume: (volume: any) => void
    isFullScreen: boolean
    size: number
}
const VolumeControl: React.FC<VolumeControlProps> = ({
    volume,
    updateVolume,
    isFullScreen,
    size
}) => {
    const currentPercent = 1 ? `${(volume / 1) * 100}%` : '0%';

    const volumeIcon = () => {
        if (volume <= 1 && volume >= 0.5) {
            return (
                <Tooltip content="Mute">
                    <i className='cursor-pointer text-gray-400 hover:text-white'
                        onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            updateVolume(0);
                        }}>
                        <BiVolumeFull size={size} />
                    </i>
                </Tooltip>
            )
        }

        if (volume <= 0.5 && volume > 0) {
            return (
                <Tooltip content="Mute">
                    <i className='cursor-pointer text-gray-400 hover:text-white'
                        onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            updateVolume(0);
                        }}>
                        <BiVolumeLow size={size} />
                    </i>
                </Tooltip>
            )
        }

        return (
            <Tooltip content="Unmute">
                <i className='cursor-pointer text-gray-400 hover:text-white'
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        updateVolume(1);
                    }}>
                    <BiVolumeMute size={size} />
                </i>
            </Tooltip>
        )
    }
    return (
        <Slider
            size='sm'
            className='w-[120px]'
            color='foreground'
            step={0.01}
            value={volume}
            maxValue={1}
            minValue={0}
            aria-label='Volume Control'
            defaultValue={0}
            onChange={(value: SliderValue) => updateVolume(value)}
            startContent={volumeIcon()}
        />
    )
}

export default VolumeControl