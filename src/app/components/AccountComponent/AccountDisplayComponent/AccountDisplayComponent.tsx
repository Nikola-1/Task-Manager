
import { useAuth } from '@/app/context/AuthContext'
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef } from 'react'
import { supabase } from '@/app/connection/supabaseclient';
import Link from 'next/link';
import CryptoJS from 'crypto-js';
interface AccountDisplayComponentProps {

  visible?:boolean;

}

const AccountDisplayComponent = ({ visible }: AccountDisplayComponentProps) => {
  const [edit,setEdit] =React.useState(false);
  const {user,setUser} =useAuth();
  const [Name,setName] =React.useState(user?.Name);
  const [Surname,setSurname] =React.useState(user?.Surname);
  const [Username,setUsername] =React.useState(user?.Username);
  const [Email,setEmail] =React.useState(user?.email);
  const [Password,setPassword] =React.useState(user?.Password);
  
  const nameRef =useRef(null);
  const surnameRef =useRef(null);
  
  const usernameRef =useRef(null);

 const sendEmailNotification = (email:string)=>{
 
  const numbers = [Math.floor(Math.random()*10), Math.floor(Math.random()*10), Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
  const letternumbers = numbers.splice(0,4).toString().replace(/,/g,'');
  localStorage.setItem("verificationCode",letternumbers);
  fetch("/api/send-email", {
  method: "POST",
  body: JSON.stringify({
    to: email,
    subject: "Dobrodošao",
    text: `Dear ${user?.Username}, your verification code is: ${letternumbers}`,
  }),
});
}
  async function  saveChanges(){
   //logic for saving changes to user profile
   const {data,error} = await supabase.from('Users').update({Name:Name,Surname:Surname,Username:Username}).eq('id',user?.id).select().single();
   if(error){
    console.log("Error updating user:",error);
    }else{
    console.log("User updated successfully:",data);
    setUser(data);
    }
  }
  function handleClikkOutside(event: MouseEvent) {
    if ((nameRef.current || surnameRef.current || usernameRef.current) && !((nameRef.current || surnameRef.current || usernameRef.current) as any).contains(event.target)) {
      setEdit(false);
    }
  }
    useEffect(() => {
      document.addEventListener('mousedown', handleClikkOutside);
      return () => {
        document.removeEventListener('mousedown', handleClikkOutside);
      }
    }, []);
  
  return (
    <div className='' style={{ display: visible ? 'block' : 'none' }}>
    <div className='grid grid-cols-1 md:grid-cols-1 gap-4 p-4 w-fit '>
      <div className='flex  items-center justify-between '>
        <div className=''>
      <label htmlFor='name' className='text-sm'>Name:</label>
      <input autoFocus ref={nameRef} className='outline-none' type="text"  value={Name} onChange={(e)=>setName(e.currentTarget.value)} readOnly={!edit} />
      </div>
      <FontAwesomeIcon icon={faEdit} onClick={() => {
        setEdit(true);
        nameRef.current?.focus(); }} className="ml-2 text-white cursor-pointer bg-blue-500 rounded-md p-3 hover:bg-blue-700" />
      </div>
      <div className='flex items-center justify-between'>
        <div >
      <label htmlFor='surname' className='text-sm'>Surname:</label>
      <input className='outline-none' ref={surnameRef} type="text" value={Surname} onChange={(e)=>setSurname(e.currentTarget.value)} readOnly={!edit} />
        </div>
       <FontAwesomeIcon icon={faEdit} onClick={() => {
        setEdit(true);
        surnameRef.current?.focus(); }} className="ml-2 text-white cursor-pointer bg-blue-500 rounded-md p-3 hover:bg-blue-700" />
      </div>
           <div className='flex items-center justify-between'>
            <div>
      <label htmlFor='password' className='text-sm'>Password:</label>
      <input className='outline-none' type="password" value={Password} readOnly={!edit} />
            </div>
       <Link onClick={()=>sendEmailNotification(user.email)} href="/pages/VerifyCode"><FontAwesomeIcon icon={faEdit} className="ml-2 text-white cursor-pointer bg-blue-500 rounded-md p-3 hover:bg-blue-700" /></Link>
      </div>
       <div className='flex items-center justify-between'>
        <div>
      <label htmlFor='email' className='text-sm'>Email:</label>
      <input className='outline-none' type='email' value={Email} readOnly={!edit} />
      </div>
     
      </div>
      <div className='flex items-center justify-between'>
        <div>
      <label htmlFor='username' className='text-sm'>Username:</label>
      <input className='outline-none' ref={usernameRef} onChange={(e)=>setUsername(e.currentTarget.value)} type='text' value={Username} readOnly={!edit} />
        </div>
       <FontAwesomeIcon icon={faEdit} onClick={() => {
        setEdit(true);
        usernameRef.current?.focus(); }} className="ml-2 text-white cursor-pointer bg-blue-500 rounded-md p-3 hover:bg-blue-700" />
      </div>
      
      
    </div>
    <button className='bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-500' onClick={saveChanges}>Save changes</button>
    </div>
  )
}

export default AccountDisplayComponent
