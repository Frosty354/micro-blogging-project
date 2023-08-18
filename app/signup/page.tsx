"use client"
import React from 'react'

import { Button, IconButton, Link, Typography } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Page = () => {
  const signinWith=[
    {provider:GoogleIcon},
    {provider:GitHubIcon},
    {provider:LinkedInIcon}
  ]
  return (
    <div className='flex min-h-screen flex-col items-center p-24'>
      <h1 className='text-4xl'>
        Signup
      </h1>
      <div className='flex '>
        {signinWith.map((item,index)=>{
            return <IconButton key={index}><item.provider/></IconButton>
          })
        }
      </div>
      <Typography>Or</Typography>
      <input type='text' placeholder='name' className='m-4 p-2 rounded-md border-blue-400 border-2'/>
      <input type='text' placeholder='user name' className='m-4 p-2 rounded-md border-blue-400 border-2'/>
      <input type='password' placeholder='password' className='m-4 p-2 rounded-md border-blue-400 border-2'/>
      <input type='password' placeholder='confirm password' className='m-4 p-2 rounded-md border-blue-400 border-2'/>
      <Button className='bg-blue-200' >Submit</Button>
      <Typography>Already a user? <Link href="/signin" underline='hover'>Signin</Link> instead</Typography>

    </div>
    
  )
}

export default Page