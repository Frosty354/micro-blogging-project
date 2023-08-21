import { Link,Button } from '@mui/material';
import { useSession,signIn,signOut } from 'next-auth/react';
import React, { Children, useState } from 'react'


import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import AddIcon from '@mui/icons-material/Add';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import PersonIcon from '@mui/icons-material/Person';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import {ListItem,ListItemButton,} from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';


const emails = [
  {
    provider:'Github',
    value:'github',
    icon:GitHubIcon
  },
  {
    provider:'Google',
    value:'google',
    icon:GoogleIcon
  },
];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    signIn();
  };

  const handleLogin=()=>{}

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Sign in</DialogTitle>
      <div className='flex p-10'>
        {emails.map((email,index) => (
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
      <Typography>Or</Typography>
          <input 
            type='text' 
            value={username} 
            onChange={(e)=>setUsername(e.target.value)}
          />
          <input 
            type='password' 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
      <Button onClick={handleLogin}>Ok</Button>
    </Dialog>
  );
}




const HomepageLayout= () => {
  const session=useSession();
  console.log(session)
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
          session.data?<><div>Hello {session.data?.user?.name}</div><Button onClick={signOut}>Logout</Button></>:
          // <Button onClick={signIn}>login</Button>
          <Button onClick={handleClickOpen}>Login</Button>
        }

          <SimpleDialog
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