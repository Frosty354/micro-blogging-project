import formatDate from '@/utils/formatDate'
import { Button, Card, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import PostCard from './PostCard';

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
postList: PostType[];
};

const PostCardList = ({ postList }: PostCardProps) => {
    
  return (
        <div className='border-4 solid'>
        {postList.map((item,index)=>{
            return <Card 
                    key={index}
                    sx={{
                    height:'auto',
                    width:'500px',
                    p:6,
                    m:4,
                    display:'flex',
                    justifyContent:'center',
                    flexDirection:'column'
                    }}>
                      <PostCard item={item}/>
                    </Card>
        })}
        </div>
  )
}

export default PostCardList