import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { Tooltip } from '@nextui-org/react'

interface LikeButtonProps {
    song_id: number,
    size: number,
    isList: boolean
}
const LikeButton: React.FC<LikeButtonProps> = ({
    song_id,
    size,
    isList
}) => {
    const [like, setLike] = useState(false);
    const dispatch = useAppDispatch();
    const { liked } = useAppSelector(state => state.audioPlayer);
    useEffect(() => {
        setLike(liked.includes(song_id));
    }, [song_id, liked, like]);
    return (
        <div>LikeButton</div>
    )
}

export default LikeButton