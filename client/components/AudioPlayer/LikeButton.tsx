import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { Tooltip } from '@nextui-org/react'
import { addLike, removeLike } from '@/lib/features/audioPlayer/audioPlayerSlice'
import { Like } from '@/lib/features/audioPlayer/audioPlayerThunk'
import { BiLike } from 'react-icons/bi'
import { BiHeart, BiSolidHeart } from 'react-icons/bi'
interface LikeButtonProps {
    song_id: number,
    size: number,
    isList: any
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
        <div
            className={
                isList &&
                (like
                    ? "visible"
                    : "invisible group-hover:visible mobile:visible tablet:visible")
            }
        >
            {!like
                ? (<Tooltip content="Like">
                    <i onClick={(event) => {
                        event.stopPropagation();
                        dispatch(addLike({ song_id }));
                        setLike(true);
                        dispatch(Like());

                    }}>
                        <BiHeart size={size} />
                    </i>
                </Tooltip>)
                : (<Tooltip content="unlike">
                    <i onClick={(event) => {
                        event.stopPropagation();
                        dispatch(removeLike({ song_id }));
                        setLike(false);
                        // dispatch(unLike());
                    }}>
                        <BiSolidHeart className='text-[#2bb540]' size={size} />
                    </i>
                </Tooltip>)}
        </div >
    )
}

export default LikeButton