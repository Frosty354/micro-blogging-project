import formatDate from '@/utils/formatDate';
import { Button, Card, Divider, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import useAutoSizeTextArea from '@/hooks/useAutoSizeTextArea';
import DeleteIcon from '@mui/icons-material/Delete';
import useFetchPostReplies from '@/hooks/useFetchPostReplies';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/userSlice';
import {  grey } from '@mui/material/colors';
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
    item: PostType;
    };

const PostCard = ({item}:PostCardProps) => {
    const [buttonStatus,setButtonStatus]=useState(false);
    const {made_by,post_content,time_created}=item;
    const [replyStatus,SetReplyStatus]=useState(false);
    const textAreaRef=useRef<HTMLTextAreaElement>(null);
    const [replyContent,setReplyContent]=useState("");
    const[count,setCount]=useState<number>(item.reactions.length);
    const user = useSelector(selectUser);

    useAutoSizeTextArea(textAreaRef.current, replyContent,"40px","450px");
    const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = evt.target?.value;
      setReplyContent(val);
    };
    const handleReply=()=>{
      SetReplyStatus(!replyStatus)
    }
    const{replies}=useFetchPostReplies(item.post_id);
    const handlePostReply=async()=>{
        const postReplyObj={
          user_id: user?.user_id,
          post_id:item.post_id,
          made_by: user?.user_name,
          reply_content: replyContent,
          time_created:new Date().toISOString(),
        }
        try {
          const response =await fetch(`${process.env.NEXT_PUBLIC_LEON_API}/reply/postReply/`,{
            method:"POST",
            body:JSON.stringify(postReplyObj),
            headers:{"Content-Type":"application/json"}
          })
          if(response.ok){
            const result= await response.json();
            setReplyContent("");
            console.log(result)
          }
        } catch (error) {
          console.log(error);
        }
    }

    const handlerLikeCount=()=>{
      setButtonStatus(!buttonStatus),
      buttonStatus==false?setCount(count+1):setCount(count-1);
    }
  return (
    <>
        <div >
            <sub>{made_by}</sub>
        </div>
        <Typography sx={{pt:4,pb:2}}>{post_content}</Typography>
        <sub className='py-4'>{formatDate(time_created)}</sub>
        <div className='flex justify-between pt-2'>
        <div onClick={handlerLikeCount}>
            <FavoriteIcon sx={{color:!buttonStatus?'primary':'red'}}/>
            {count}
        </div>
        <div/>
        <Button onClick={handleReply}>{replyStatus?'Close':'Reply'}</Button>
        
        
        
        </div>
        {replyStatus&&
                <div className='flex pt-4'>
                  <textarea
                    id="review-text"
                    onChange={handleChange}
                    placeholder="Post a reply"
                    ref={textAreaRef}
                    rows={3}
                    className='rounded-md border-blue-900 placeholder:text-gray-500 w-96 px-5 py-2 flex justify-center border border-solid '
                    value={replyContent}
                  />
                  <Button onClick={handlePostReply}>
                    <sub>Post</sub>
                  </Button>
                  
                </div>
          }
        {replies.map((item:ReplyType)=>{
          
          return <Card key={item.reply_id} className='p-4 my-2' sx={{background:grey[100]}}>
                <Typography sx={{textAlign:'right'}}>{item.reply_content}</Typography>
                <div className='flex flex-col justify-end'>
                  <sub>{item.made_by}</sub>
                  <div >
                    <sub>{formatDate(item.time_created)}</sub>
                  </div>
                </div>
                
            </Card>
        })}
    </>
  )
}

export default PostCard;