import { ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, Typography, TextField, Button, SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { blue } from '@mui/material/colors'
import { signIn } from 'next-auth/react';
import React, { useState } from 'react'


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

    const handleListItemClick = (value: string) => {
        signIn();
      };
      const HandleLogin=()=>{
      
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
                      className='p-4'
                      onChange={(e)=>setUsername(e.target.value)}
                    />
                    <TextField 
                      type='password' 
                      value={password}
                      className='p-4'
                      onChange={(e)=>setPassword(e.target.value)}
                    />
                  </div>
                  <Button onClick={HandleLogin} className='m-3'>Ok</Button>  
    </div>
  )
}

export default LoginComponent