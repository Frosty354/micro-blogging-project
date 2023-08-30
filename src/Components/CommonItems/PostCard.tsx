import formatDate from '@/utils/formatDate';
import { Typography } from '@mui/material'
import React, { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';

type PostType = {
    isparentpost: boolean;
    made_by: string;
    post_content: string;
    post_id: number;
    reactions: [];
    time_created: Date;
    user_id: number;
  };
  type PostCardProps = {
    item: PostType;
    };

const PostCard = ({item}:PostCardProps) => {
    const [buttonStatus,setButtonStatus]=useState(false);
    const {made_by,post_content,time_created}=item
  return (
    <>
        <div >
            <sub>{made_by}</sub>
        </div>
        <Typography sx={{pt:4,pb:2}}>{post_content}</Typography>
        <sub>{formatDate(time_created)}</sub>
        <div onClick={()=>{setButtonStatus(!buttonStatus)}}>
            <FavoriteIcon sx={{color:!buttonStatus?'primary':'red'}}/>
            
        </div>
    </>
  )
}

export default PostCard;