import { Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React from 'react'

const OtherUsers = () => {
    const userlist=[
        {
            firstname:'Ayan',
            followStatus:false
        },
        {
            firstname:'John',
            followStatus:false
        },{
            firstname:'Hemingway',
            followStatus:false
        },{
            firstname:'Mel',
            followStatus:false
        },{
            firstname:'Paul',
            followStatus:false
        },
    ]
  return (
    <div className='border border-solid '>
        {userlist.map((item,idx)=>{
            return <List key={idx} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={item.firstname} src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {item.firstname}
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                    <Button>Follow</Button>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            
          </List>
        })}
    </div>
  )
}

export default OtherUsers