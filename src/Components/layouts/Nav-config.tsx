import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import Groups2Icon from '@mui/icons-material/Groups2';
import HomeIcon from '@mui/icons-material/Home';
//roures
import { PATH_PAGE } from '../routes/paths';

export const navConfig = [
    // {
    //     title:"Home",
    //     icon:<HomeIcon/>,
    //     path:PATH_PAGE.Home,
    // },
    {
        title: 'My Account',
        subtitle:'Account details',
        icon: <AccountCircleIcon />,
        path: PATH_PAGE.MyAccount,
    },
    {
        title: 'Followers',
        subtitle:'People who are following you',
        icon: <Groups2Icon />,
        path: PATH_PAGE.followers,
    },
    {
        title: 'Following',
        subtitle:`People who you're following`,
        icon: <FollowTheSignsIcon />,
        path: PATH_PAGE.following,
    }

]