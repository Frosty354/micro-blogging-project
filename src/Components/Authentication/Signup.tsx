'use client'
import { Avatar, Button, ListItem, ListItemAvatar, ListItemButton, ListItemText, SvgIconTypeMap, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { blue } from "@mui/material/colors";
import { signIn, useSession } from 'next-auth/react';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import CheckIcon from '@mui/icons-material/Check';
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

const Signup = ({providerList,handleClose}:ProviderListType) => {

    const [username,setUsername]=useState("");
    const [userEmail,setUserEmail]=useState("");
    const [password,setPassword]=useState("");
    const [passwordConfirm,setPasswordConfirm]=useState("");
    const[firstName,setFirstname]=useState("");
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const {data,status,update}=useSession();


    const handleListItemClick = (value: string) => {
        signIn();
      };

      const HandleSignUp= async(e:any)=>{
        e.preventDefault();

        const userObj={
          user_name:username,
          first_name:firstName,
          auth_measure:'self',
          user_email:userEmail,
          password:password,
          created_on: new Date().toISOString(),
          last_login:null,
          following:[],
          followers:[],
          post_ids:[]
        }
        
        try {
          const response=await fetch(`${process.env.NEXT_PUBLIC_LEON_API}/users/createUser/`,{
            method:"POST",
            body:JSON.stringify(userObj),
            headers: { "Content-Type": "application/json" },
          })
          const responseData = await response.json();
          console.log(responseData);
          // const user = userObj; // Replace with actual user data


          const newUser={
            user_id:responseData?.user_id,
            user_name:userObj.user_name,
            first_name:userObj.first_name,
            auth_measure:userObj.auth_measure,
            user_email:userObj.user_email,
            created_on: userObj.created_on,
            last_login:userObj.last_login,
            following:userObj.following,
            followers:userObj.followers,
            post_ids:userObj.post_ids
          }
          dispatch(setUser(newUser));
          handleClose();
        } catch (error) {
          console.error(error)
        }


      }

      


      const verifyPassWord=()=>{
        if(username.length<4 || username.length>15 ){
          // const name=username.split('');
          // if()
          return true;
        }
        if(password.length<8 || passwordConfirm.length<8||password.length>15||passwordConfirm.length>15){
         
          return true;
        }

        if(passwordConfirm!=password){
          
          return true;
        }
      }
      
  return (
    <div className='block'>
        <div className='flex px-10'>
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
                    <Typography>Or Signup with password</Typography>
                  </div>
                  
                  <div className="border border-solid flex-col flex p-4">

                  <TextField 
                      type='text'
                      placeholder='Enter your Name'
                      value={firstName} 
                      className='p-2'
                      onChange={(e)=>setFirstname(e.target.value)}
                    />

                    <TextField 
                      type='text'
                      placeholder='Enter Username'
                      value={username} 
                      className='p-2'
                      onChange={(e)=>setUsername(e.target.value)}
                    />


                    
                    <TextField 
                      type='email' 
                      placeholder='Enter User Email'
                      value={userEmail} 
                      className='p-2'
                      onChange={(e)=>setUserEmail(e.target.value)}
                    />

                    <TextField 
                      type='password'
                      placeholder='Enter Password'
                      value={password}
                      className='p-2'
                      onChange={(e)=>setPassword(e.target.value)}
                    />
                    
                    {password.length==0 || passwordConfirm.length==0?null:<div className='flex justify-center '>
                      {password.length<8||passwordConfirm.length<8 || password.length>15||passwordConfirm.length>15?
                      <Typography variant='subtitle2'>Password length must be greater than 8 and less than 15</Typography>
                      :password.length>=8 && passwordConfirm.length>=8 && password!=passwordConfirm?
                      <Typography variant='subtitle2'>Passwords do not match</Typography>:
                      null}
                    </div>}
                    <TextField 
                      type='password' 
                      placeholder='Confirm Password'
                      value={passwordConfirm}
                      className='p-2'
                      onChange={(e)=>setPasswordConfirm(e.target.value)}
                    />
                  </div>
                  
                  <div className='flex justify-center'>
                    <Button onClick={HandleSignUp} disabled={verifyPassWord()} className='m-3'>Ok</Button>
                  </div>
                
                  
                  
    </div>
  )
}

export default Signup