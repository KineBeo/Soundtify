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
    isList: any
}
function LikeButton({ user_id, song_id, size, isList }: any) {
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
        dispatch(addLike({ song_id }));
        setLike(true);
        await likeTrack({ trackId: song_id, userId: user_id }).unwrap();

    }

    const handleUnlike = async (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(removeLike({ song_id }));
        setLike(false);
        await unlikeTrack({ trackId: song_id, userId: user_id }).unwrap();

    }
    return (
        <div
            className={
                isList ?
                    (like
                        ? "visible"
                        : "invisible group-hover:visible max-[550px]:visible max-[750px]:visible") : undefined
            }
        >
            {!like ? (
                <Tooltip content="Like">
                    <i onClick={handleLike}>
                        <AiOutlineHeart className='cursor-pointer text-gray-400 hover:text-white ' size={size} />
                    </i>
                </Tooltip>)
                : (<Tooltip content="unlike">
                    <i onClick={handleUnlike}>
                        <AiFillHeart className='text-[#2bb540] cursor-pointer' size={size} />
                    </i>
                </Tooltip>)}
        </div >
    )
}

export default LikeButton