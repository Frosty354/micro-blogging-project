import { ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, Typography, TextField, Button, SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { blue } from '@mui/material/colors'
import { signIn } from 'next-auth/react';
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUser, selectUser } from '../../redux/userSlice';
import { AppThunk, RootState } from '../../redux/store';


type ProviderListType = {
    providerList:{
        provider: string;
        value: string;
        icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; };
    }[],
    handleClose:()=>void
};



const LoginComponent = ({providerList,handleClose}:ProviderListType) => {

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    

    const handleListItemClick = (value: string) => {
        signIn();
    };
      const HandleLogin=async(e:any)=>{
        e.preventDefault();
        const userObj={
          user_name:username,
          password:password,
        }
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_LEON_API}/users/verifyUser/`,{
            method:'POST',
            body:JSON.stringify(userObj),
            headers: {"Content-Type":"application/json"},
          })
          
         
          if (response.ok) {
            const responseData = await response.json();
            dispatch(setUser(responseData));
            handleClose();
            
          } else {
            console.error('Request failed:', response.status);
          }
        } catch (error) {
          console.log(error)
        }
          
          
      }
      
  return (
    <div>
        <div className='flex px-10 '>
                      {providerList.map((email,index) => (
                        <ListItem key={index} disableGutters>
                          <ListItemButton onClick={()=>handleListItemClick(email.value)} key={email.provider}>
                            <ListItemAvatar>
                              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                <email.icon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={email.provider} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </div>


                  <div className='flex justify-center'>
                    <Typography>Or Login with password</Typography>
                  </div>
                  
                  <div className="border border-solid flex-col flex">
                    <TextField 
                      type='text' 
                      value={username} 
                      placeholder='Enter Username'
                      className='p-4'
                      onChange={(e)=>setUsername(e.target.value)}
                    />
                    <TextField 
                      type='password' 
                      value={password}
                      placeholder='Enter Password'
                      className='p-4'
                      onChange={(e)=>setPassword(e.target.value)}
                    />
                  </div>
                  <Button onClick={HandleLogin} className='m-3'>Ok</Button>  
    </div>
  )
}

export default LoginComponent