import React, { useEffect, useRef, useState } from 'react'
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { Button, Card, FormGroup, Typography } from '@mui/material';
import useAutoSizeTextArea from '@/hooks/useAutoSizeTextArea';
import {useSession} from 'next-auth/react'
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/userSlice';
import useFetchUserPosts from '@/hooks/useFetchUserPosts';
import formatDate from '@/utils/formatDate';


type PostType={
  isparentpost: Boolean;
  made_by: String;
  post_content:String;
  post_id:Number;
  reactions:[];
  replies:[];
  time_created: Date;
  user_id:Number;
}


const PostForm = () => {
    const [value, setValue] = useState("");
    const [postList,setPostList]=useState<any>([])
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const session=useSession();
    const user = useSelector(selectUser);
    useAutoSizeTextArea(textAreaRef.current, value);
    const {data}=session;
    const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = evt.target?.value;
      setValue(val);
    };


    console.log(user?.user_id)
    const {posts} = useFetchUserPosts(user?.user_id);

    useEffect(() => {
      setPostList(posts);
    }, [posts])
    


    const handlePost= async()=>{
        
        const postObj={
          user_id:user?.user_id, 
          made_by:user?.user_name, 
          post_content:value, 
          reactions:[], 
          isparentpost:true, 
          replies:[], 
          time_created:new Date().toISOString(),
        }
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_LEON_API}/post/createPost/`,{
            method:"POST",
            body:JSON.stringify(postObj),
            headers:{"Content-Type":"application/json"}
          })
          
          console.log(value);
          setValue("");
          setPostList([postObj, ...postList]);

        } catch (error) {
          console.log(error);
        } 
    }
    
    
    
    
  return (
    <>
    <div className='flex justify-center py-10'>
        <FormGroup >
        <textarea
            id="review-text"
            onChange={handleChange}
            placeholder="What is happening?!"
            ref={textAreaRef}
            rows={5}
            className='rounded-md border-blue-900 placeholder:text-gray-500 w-96 px-5 py-2  '
            value={value}
        />
            <Button disabled={value===""} type='submit' onClick={handlePost}>Post</Button>
        </FormGroup>
        
    </div>
    
      <div className='flex justify-center' >
          <div>
            {postList.length?postList.map((item:PostType,index: React.Key | null | undefined)=>{
            return <Card 
                    key={index} 
                    
                    sx={{
                    height:'auto',
                    width:'350px',
                    p:6,
                    m:4,
                    display:'flex',
                    justifyContent:'center',
                    flexDirection:'column'
                  }}>
                    <div >
                      <sub>{item.made_by}</sub>
                      
                    </div>
                    <Typography sx={{pt:4,pb:2}}>{item.post_content}</Typography>
                    <sub>{formatDate(item.time_created)}</sub>
                  </Card>
          }):<div>your wall is empty post something</div>}
          </div>
      </div>
    </>
  )
}

export default PostForm