import react, { useEffect, useState } from 'react';

function useFetchPostReplies(post_id:number | undefined){
    const [replies,setReplies]=useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState();


    const getdata=async()=>{
        setLoading(true);
        try {
            const response=await fetch(`${process.env.NEXT_PUBLIC_LEON_API}/reply/getReply/${post_id}`,{
                method:"GET",
                headers:{"Content-Type":"application/json"}
            })
            if(response.ok){
                const result= await response.json();
                

                setReplies(result)
            }
            else{
                setReplies([]);
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
    },[post_id])
      
  
    return { replies,loading };

}
export default useFetchPostReplies;