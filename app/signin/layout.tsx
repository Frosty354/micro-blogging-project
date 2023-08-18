import { Link } from '@mui/material';
import React, { Children } from 'react'

interface HomepageLayoutProps{
  children:React.ReactNode
}

const HomepageLayout:React.FC<HomepageLayoutProps> = (props) => {
  return (
    <div>
      <nav className='bg-black text-white py-5
                flex justify-between px-10'>
        <h1 className='text-5xl'>Leon</h1>
        <ul className='flex items-center gap-6'>
          <li><Link className='text-white'>Home</Link></li>
          <li><Link className='text-white'>About</Link></li>
          <li><Link className='text-white'>Contact</Link></li>
          <li><Link className='text-white'>Login</Link></li>
          <li><Link className='text-white'>Admin</Link></li>
        </ul>
      </nav>
      {props.children}
    </div>
    
  )
}

export default HomepageLayout;