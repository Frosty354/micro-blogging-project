// next
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
// @mui
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { Box, ListItemButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser } from '@/redux/userSlice';
//
import { PATH_PAGE } from '../routes/paths';
import { navConfig } from './Nav-config';
import HomeIcon from '@mui/icons-material/Home';
// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const { pathname,push } = useRouter();
  const router=useRouter();
  const isHome = pathname === '/';
  const isAuthencated =useSelector(selectIsAuthenticated);
  return (
    <Box sx={{ display: 'flex', height: 1 }}>
      {isAuthencated&&
                <List sx={{ 
                  width: '100%', 
                  maxWidth: 400,
                  minWidth:360, 
                  bgcolor: 'background.paper',
                  borderRight:'1px solid gray',
                  mt:4 
                }}>
                  <ListItemButton sx={{my:2,mb:4}}
                  onClick={()=>push('/')}
                  
                  >
                  <ListItemAvatar>
                    <Avatar>
                      <HomeIcon fontSize='large' color='warning'/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={'Home'} />
                </ListItemButton>
                {navConfig.map((item,idx)=>{
                  return <ListItemButton key={idx} 
                  onClick={()=>push(item.path)}
                  
                  >
                  <ListItemAvatar>
                    <Avatar>
                      {item.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.title} secondary={item.subtitle} />
                </ListItemButton>
                })}
      
      </List>}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...(!isHome && {
            pt: { xs: 8, md: 11 },
          }),
        }}
      >
        {children}
      </Box>

      
    </Box>
  );
}
