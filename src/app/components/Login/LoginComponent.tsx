
import { Micro_5 } from 'next/font/google';
import Image from 'next/image';
import next from "../../../../public/img/next.png";
import search from "../../../../public/img/search.png";
import React, { useState } from 'react'
import "./style.css";
import { supabase } from '@/app/connection/supabaseclient';
import { useAuth } from '@/app/context/AuthContext';
const Micro = Micro_5({weight:"400",subsets:['latin'],});
 interface LoginProps{
    setLoginProps:React.Dispatch<React.SetStateAction<boolean>>
    setUserProps:React.Dispatch<React.SetStateAction<object>>
}
export default function  LoginComponent({setLoginProps,setUserProps}:LoginProps) {
  const [Username,setUsername] = useState<string>();
  const [Name,setName] = useState<string>();
    const [Surname,setSurname] = useState<string>();
     const [Email,setEmail] = useState<string>();
      const [Password,setPassword] = useState<string>();
      const [RepeatedPassword,setRepeatedPassword] = useState<string>();

      const [singUp,setSignUp] = useState<boolean>(false);
      const {setUser} = useAuth();
  async function Register(){
          if(Username != null && Name != null && Surname != null && Email != null && Password != null){
              const {error} = await supabase.from("Users").insert({Name:Name,Surname:Surname,Password:Password,email:Email,Username:Username});
              
              if(!error){
                    console.log("Uspesno ste se registrovali");
                    setLoginProps(true);
                   
              }
              else{
                console.log(error);
              }
          }
  }
  async function Login(){
    if(Username != null && Password != null){
              const {data,error} = await supabase.from("Users").select("*").eq("Username",Username).eq("Password",Password).single();
              
              if(!error && data != null){
                    console.log("Uspesno ste se ulogovali");
                     setUserProps(data);
                     setUser(data);
                    setLoginProps(true);
              }
              else{
                if(error?.code === 'PGRST116'){
                  console.log("Nije pronadjen korisnik");
                }
                console.log(data);
                console.log("Pogresni kredencijali");
                console.log(error);
              }
          }
  }
  return (
    <div className='flex justify-between items-center w-full h-dvh'>
      <div>

        <div className='grid'></div>
      </div>
      <div className='w-1/2 flex justify-center'>
      <div className='flex justify-center  align-middle items-center flex-col w-5/6 '>
        <h1 className={"text-center  mt-3 text-7xl md:text-9xl text-blue-900  "+ Micro.className}>HelpTask</h1>
        
        {singUp == true ? 
          <div className='grid grid-cols-2 gap-4 my-9 w-5/6'>
        
        <input type='text' onChange={(e)=>setUsername(e.target.value)} placeholder='Write your Username' className='border-blue-300 p-3 cursor-pointer rounded-md bg-blue-300 text-white placeholder:text-white  outline-none border-2 col-span-2'/>
        <input type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Write password' className='border-blue-300 p-3 cursor-pointer rounded-md bg-blue-300 text-white placeholder:text-white outline-none border-2 col-span-2'/>
        
       <button onClick={()=>Login()}   className='border-blue-900 p-3 m-2 cursor-pointer rounded-md flex justify-center items-center bg-white placeholder:text-white outline-none border-2  w-fit '>Sign up </button>
        </div>  
        : 
      <div className='grid grid-cols-2 gap-4 my-9'>
          
        <input type='text' onChange={(e)=>setUsername(e.target.value)} placeholder='Write your Username' className='border-blue-300 p-3 cursor-pointer rounded-md bg-blue-300 text-white placeholder:text-white  outline-none border-2 col-span-2'/>
        
        <input type='text' onChange={(e)=>setName(e.target.value)} placeholder='Write your Name' className='border-blue-300 p-3 cursor-pointer rounded-md bg-blue-300 text-white placeholder:text-white outline-none border-2 col-span-1'/>
        <input type='text' onChange={(e)=>setSurname(e.target.value)} placeholder='Write your Surname' className='border-blue-300 p-3 cursor-pointer rounded-md bg-blue-300 text-white placeholder:text-white outline-none border-2 col-span-1'/>
        <input type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Write your email' className='border-blue-300 p-3 cursor-pointer rounded-md bg-blue-300 text-white placeholder:text-white outline-none border-2 col-span-2'/>
        <input type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Write password' className='border-blue-300 p-3 cursor-pointer rounded-md bg-blue-300 text-white placeholder:text-white outline-none border-2 col-span-1'/>
        <input type='password' onChange={(e)=>setRepeatedPassword(e.target.value)} placeholder='Repeat Password' className='border-blue-300 p-3 cursor-pointer rounded-md bg-blue-300 text-white placeholder:text-white outline-none border-2 col-span-1'/>
       
        </div>
      }
        
        <div>
        <button onClick={()=>setSignUp(true)}   className='border-blue-900 p-3 m-2 cursor-pointer rounded-md flex justify-center items-center bg-white placeholder:text-white outline-none border-2  w-fit '>Sign up </button>
        </div>
        <div className='flex justify-start '>
        <button   className='border-blue-900 p-3 m-2 cursor-pointer rounded-md flex justify-center items-center bg-white placeholder:text-white outline-none border-2  w-fit '><Image className='mx-2' src={search} alt="clock image"  width={20} height={20}  /> Sign up with google </button>
        <button onClick={()=>Register()}  className='border-blue-900 p-3 m-2  cursor-pointer rounded-md bg-blue-900 placeholder:text-white outline-none border-2 w-fit'><Image src={next} alt="clock image"  width={40} height={40}  /></button>
        </div>
        </div>
        </div>
    </div>
  )
}


