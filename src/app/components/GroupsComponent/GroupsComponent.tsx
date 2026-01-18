'use client'
import { supabase } from '@/app/connection/supabaseclient';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { setgroups } from 'process';
import React, { useEffect } from 'react'

const GroupsComponent = () => {
    const [groups,setGroups] =React.useState<object[]>([]);
    const router = useRouter()
    const {user} =useAuth();
    const getGroups = async () => {
            const {data,error} = await supabase.from('Groups').select('*,Users_Groups(*)').eq('Admin',user?.id);
            if(error){
                console.log("Error fetching groups:",error);
            }else{
                console.log("Fetched groups:",data);
                setGroups(data || []);
            }

    }
    
    useEffect(()=>{
        getGroups();
    },[])
  return (
    <div>
        {groups.map((group:any)=>(
            <div onClick={()=>router.push(`/pages/Task`)} key={group.id} className='border p-4 m-4 rounded'>
                <h2 className='text-xl font-bold mb-2'>{group.Name}</h2>
                <p className='text-gray-600'>{group.Description}</p>
                <p>{group.Users_Groups?.length || 0} members</p>
            </div>
        ))}
   
    </div>
  )
}

export default GroupsComponent
