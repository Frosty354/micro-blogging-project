import { Avatar, Button, Dialog, DialogTitle, ListItem, ListItemAvatar, ListItemButton, ListItemText, Tab, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import Facebook from '@mui/icons-material/Facebook';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Signup from "./Signup";
import LoginComponent from "./LoginComponent";


export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
  }

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
    // {
    //   provider:'Facebook',
    //   value:'facebook',
    //   icon:Facebook
    // },
  ];
  

  function LoginDialogBase(props: SimpleDialogProps) {
    const { onClose, selectedValue, open } = props;
    
    const[tabValue,setTabValue]=useState('login');
    const handleClose = () => {
      onClose(selectedValue);
    };
  

    
    const handleTabValue=(event: React.SyntheticEvent, newValue: string)=>{
      setTabValue(newValue)
    }
    
    const sess=useSession();
      // console.log(sess);
    
  
    return (
      <Dialog onClose={handleClose} open={open}>
        
            <TabContext value={tabValue}>
              <TabList onChange={handleTabValue} aria-label="lab API tabs example" className="pl-28">
                  <Tab label="Login" value="login" />
                  <Tab label="Signup" value="signup" />
                  
                </TabList>

                <TabPanel value="login">
                    <LoginComponent providerList={emails} handleClose={handleClose}/>
                </TabPanel>

            <TabPanel value='signup'>
                  <Signup providerList={emails} handleClose={handleClose} />
            </TabPanel>
            </TabContext>               
      </Dialog>
    );
  }

export default LoginDialogBase;