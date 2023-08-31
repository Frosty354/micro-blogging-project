import react, { useEffect, useState } from 'react';

function useGetFeed(user_id:number | undefined){
    const [feeds,setFeeds]=useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState();


    const getdata=async()=>{
        setLoading(true);
        try {
            const response=await fetch(`${process.env.NEXT_PUBLIC_LEON_API}/post/getFeed/${user_id}`,{
                method:"GET",
                headers:{"Content-Type":"application/json"}
            })
            if(response.ok){
                const result= await response.json();
                

                setFeeds(result)
            }
            else{
                setFeeds([]);
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
      
  
    return { feeds,loading };

}
export default useGetFeed;