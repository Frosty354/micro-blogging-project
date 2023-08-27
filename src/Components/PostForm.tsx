import React, { useRef, useState } from 'react'
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { Button, FormGroup } from '@mui/material';
import useAutoSizeTextArea from '@/hooks/useAutoSizeTextArea';
import {useSession} from 'next-auth/react'



const PostForm = () => {
    const [value, setValue] = useState("");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const session=useSession();
    useAutoSizeTextArea(textAreaRef.current, value);
    const {data}=session;
    const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = evt.target?.value;
      setValue(val);
    };
    const handlePost=()=>{
        
        console.log(value);
        
        
        setValue("");
    }
  return (
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
  )
}

export default PostForm