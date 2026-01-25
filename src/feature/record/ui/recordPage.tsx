"use client"
import StarBackground from "@/src/libs/StarBackground";
import { getSessionAll } from "../api/get-sessionAll";
import { useEffect, useState } from "react";
import SessionList from "./sessionList";
import { Session } from "../type/getSessionAllResponse";

const RecordPage = () => {
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState<Session[]>([])
    useEffect(()=>{
    const fetchSessions = async() =>{
        setLoading(true)
        try{
            const res = await getSessionAll();
            setSession(res.sessions)
            console.log(res)
            
        }catch(error){
            console.log('session all fail', error)
        }finally{
            setLoading(false)
        }
        console.log("loading", loading);
        console.log("sessions", session);
    }
    fetchSessions();
},[])
useEffect(() => {
    console.log("🔥 session state changed", session);
  }, [session]);
  
  useEffect(() => {
    console.log("🔥 loading state changed", loading);
  }, [loading]);
  return (
    <div className='items-center justify-center w-full h-screen'>
        <StarBackground/>
        {loading?(
             <div className="text-white ">로딩중...</div>
        ):(
            <SessionList session={session}/>
        )}
      
    </div>
  )
}

export default RecordPage

