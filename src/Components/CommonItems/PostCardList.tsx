import formatDate from '@/utils/formatDate'
import { Button, Card, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import PostCard from './PostCard';
import { blue, grey } from '@mui/material/colors';

type ReplyType = {
  reply_id: number;
  user_id: number;
  made_by: string;
  reply_content: string;
  time_created: Date;
};

type PostType = {
  post_id: number;
  user_id: number;
  made_by: string;
  post_content: string;
  reactions: [];
  time_created: Date;
  replies: ReplyType[];
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
                    // background:blue[50],
                    width:'500px',
                    px:6,
                    pt:6,
                    pb:2,
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