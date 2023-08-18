import React from 'react'

import { Button, Link, Typography } from '@mui/material';
import { NextPage } from 'next';



const page:NextPage = () => {
  return (
    <div className='flex min-h-screen flex-col items-center p-24'>
      <h1 className='text-4xl'>
        Signin
      </h1>
      <input type='text' placeholder='user name' className='m-4 p-2 rounded-md border-blue-400 border-2'/>
      <input type='password' placeholder='password' className='m-4 p-2 rounded-md border-blue-400 border-2'/>
      
      <Button className='bg-blue-200' >Submit</Button>
      <Typography>Not a user? <Link href={'/signup'} underline='hover'>Signup</Link> instead</Typography>
    </div>
    
  )
}

export default page