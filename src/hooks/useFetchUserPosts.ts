import react, { useEffect, useState } from 'react';

function useFetchUserPosts(user_id:number | undefined){
    const [posts,setPosts]=useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState();


    const getdata=async()=>{
        setLoading(true);
        try {
            const response=await fetch(`${process.env.NEXT_PUBLIC_LEON_API}/post/getPosts/${user_id}`,{
                method:"GET",
                // body:JSON.stringify({user_id:user_id}),
                headers:{"Content-Type":"application/json"}
            })
            if(response.ok){
                const result= await response.json();
                

                setPosts(result)
            }
            else{
                setPosts([]);
            }
        } catch (error) {
            console.log(error);
            // setError(error)
        } finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        getdata();
    },[user_id])
      
  
    return { posts,loading };

}
export default useFetchUserPosts;