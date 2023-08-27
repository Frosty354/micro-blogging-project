import { Link,Button, TextField } from '@mui/material';
import { useSession,signIn,signOut } from 'next-auth/react';
import React, { Children, useEffect, useState } from 'react'
import LoginDialogBase from './Authentication/LoginDialogBase';
import { selectIsAuthenticated, selectUser } from '@/redux/userSlice';
import { useSelector } from 'react-redux';

const HomepageLayout= () => {
  const session=useSession();
  const user = useSelector(selectUser);
  const isAuthencated=useSelector(selectIsAuthenticated);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);

  };


   

  
  return (
    <div>
      <nav className='bg-black text-white py-5
                flex justify-between px-10'>
        <h1 className='text-5xl'>Leon</h1>
        <div className='flex items-center gap-6'>
          
            
        {//@ts-ignore
          isAuthencated?<><div>Hello {user?.first_name}</div><Button onClick={signOut}>Logout</Button></>:
          // <Button onClick={signIn}>login</Button>
          <Button onClick={handleClickOpen}>Login</Button>
        }

          <LoginDialogBase
            selectedValue={''}
            open={open}
            onClose={handleClose}
          />
          
        </div>
      </nav>
    </div>
    
  )
}

export default HomepageLayout;