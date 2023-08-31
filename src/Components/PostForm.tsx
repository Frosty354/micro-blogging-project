import React, { useEffect, useRef, useState } from 'react'
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { Button, Card, FormGroup, Typography } from '@mui/material';
import useAutoSizeTextArea from '@/hooks/useAutoSizeTextArea';
import {useSession} from 'next-auth/react'
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/userSlice';
import useFetchUserPosts from '@/hooks/useFetchUserPosts';
import formatDate from '@/utils/formatDate';
import PostCardList from './CommonItems/PostCardList';
import LandingSection from './LandingSection';
import useGetFeed from '@/hooks/useGetFeed';


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


const PostForm = () => {
    const [value, setValue] = useState("");
    const [postList,setPostList]=useState<PostType[]>([])
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const session=useSession();
    const user = useSelector(selectUser);
    useAutoSizeTextArea(textAreaRef.current, value,"160px","500px");
    const {data}=session;
    const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = evt.target?.value;
      setValue(val);
    };


    
    const {posts} = useFetchUserPosts(user?.user_id);
    const {feeds}=useGetFeed(user?.user_id);
    useEffect(() => {
      setPostList(posts);
    }, [posts])
    

    console.log("check 1",feeds)
    const handlePost= async()=>{
        
        const postObj={
          user_id:user?.user_id, 
          made_by:user?.user_name, 
          post_content:value, 
          reactions:[], 
          isparentpost:true, 
          time_created:new Date().toISOString(),
        }
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_LEON_API}/post/createPost/`,{
            method:"POST",
            body:JSON.stringify(postObj),
            headers:{"Content-Type":"application/json"}
          })
          
          if(response.ok){
            const resukt = await response.json();
            setValue("");
            Object.assign(postObj,{post_id:resukt});
            console.log(postObj);
            //@ts-ignore
            setPostList([postObj, ...postList]);
          }

        } catch (error) {
          console.log(error);
        } 
    }
    
    
    
    
  return (
    <div className='ml-10'>
    <LandingSection/>
      <div className='flex justify-center border-2 border-solid p-4' >
      
        <div>
          <FormGroup >
              <textarea
                  id="review-text"
                  onChange={handleChange}
                  placeholder="What is happening?!"
                  ref={textAreaRef}
                  rows={5}
                  className='rounded-md border-blue-900 placeholder:text-gray-500 w-96 px-5 py-2 flex justify-center border border-solid '
                  value={value}
              />
              <Button disabled={value===""} type='submit' onClick={handlePost}>Post</Button>
          </FormGroup>
            <PostCardList postList={feeds}/>
            {/* {postList.length?
            <PostCardList postList={postList}/>
          :<div>your wall is empty post something</div>} */}
      </div>
      </div>
    </div>
  )
}

export default PostForm