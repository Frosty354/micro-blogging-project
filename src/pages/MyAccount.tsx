import PostCardList from '@/Components/CommonItems/PostCardList';
import AccountDetails from '@/Components/MyAccount/AccountDetails';
import MainLayout from '@/Components/layouts/MainLayout';
import useFetchUserPosts from '@/hooks/useFetchUserPosts';
import { selectUser } from '@/redux/userSlice';
import { Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';


MyAccount.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;


export default function MyAccount() {
  const user=useSelector(selectUser);
  const {posts} = useFetchUserPosts(user?.user_id);
  console.log(user)
  return (
    <>
    <div className='flex justify-center'>My Account</div>
    <div className='flex justify-center'><AccountDetails/></div>


    <Typography sx={{textAlign:'center'}}>Your posts</Typography>
    <div className='flex justify-center'>
      
      <PostCardList postList={posts}/>
    </div>
    </>
  )
}

