import { Link,Button } from '@mui/material';
import { useSession,signIn,signOut } from 'next-auth/react';
import React, { Children } from 'react'



const HomepageLayout= () => {
  const session=useSession();
  console.log(session)
  return (
    <div>
      <nav className='bg-black text-white py-5
                flex justify-between px-10'>
        <h1 className='text-5xl'>Leon</h1>
        <div className='flex items-center gap-6'>
          
            
        {//@ts-ignore
          session.data?<><div>Hello {session.data?.user?.name}</div><Button onClick={signOut}>Logout</Button></>:<Button onClick={signIn}>login</Button>
        }
          
        </div>
      </nav>
    </div>
    
  )
}

export default HomepageLayout;