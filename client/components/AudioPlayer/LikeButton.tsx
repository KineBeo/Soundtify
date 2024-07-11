'use client'
import React, { useEffect, useState } from 'react'
import {
    useAppDispatch,
    useAppSelector
} from '@/lib/hook'
import { Tooltip } from '@nextui-org/react'
import {
    addLike,
    removeLike
} from '@/lib/features/audioPlayer/audioPlayerSlice'
import {
    AiFillHeart
    , AiOutlineHeart
} from 'react-icons/ai'
import {
    useLikeTrackMutation,
    useUnlikeTrackMutation
} from '@/lib/features/audioPlayer/audioPlayerApi'
interface LikeButtonProps {
    user_id: number,
    song_id: number,
    size: number,
    isList: boolean
}
const LikeButton: React.FC<LikeButtonProps> = ({
    user_id,
    song_id,
    size,
    isList
}) => {
    const [like, setLike] = useState(false);
    const dispatch = useAppDispatch();
    const { liked } = useAppSelector(state => state.audioPlayer);
    const [likeTrack] = useLikeTrackMutation();
    const [unlikeTrack] = useUnlikeTrackMutation();
    useEffect(() => {
        setLike(liked.includes(song_id));
    }, [song_id, liked, like]);

    const handleLike = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            dispatch(addLike({ song_id }));
            setLike(true);
            await likeTrack({ trackId: song_id, userId: user_id }).unwrap();
        } catch (error) {
            console.log(error);
        }
    }

    const handleUnlike = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            dispatch(removeLike({ song_id }));
            setLike(false);
            await unlikeTrack({ trackId: song_id, userId: user_id }).unwrap();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div
            className={
                isList ?
                    like
                        ? "visible"
                        : "invisible group-hover:visible mobile:visible tablet:visible" : undefined
            }
        >
            {!like
                ? (<Tooltip content="Like">
                    <i onClick={handleLike}>
                        <AiOutlineHeart size={size} />
                    </i>
                </Tooltip>)
                : (<Tooltip content="unlike">
                    <i onClick={handleUnlike}>
                        <AiFillHeart className='text-[#2bb540]' size={size} />
                    </i>
                </Tooltip>)}
        </div >
    )
}

export default LikeButton