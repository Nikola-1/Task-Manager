import React from 'react'
import { useAuth } from '@/app/context/AuthContext'
import { UserType } from '../../TaskComponent/Types/UserType';

interface AccountOptionsComponentProps {
    user: UserType | null;
    logout: () => void;
}
const AccountOptionsComponent = ({user,logout}: AccountOptionsComponentProps) => {
    
    


  return (
    <div>
      <ul>
        <li className='p-2 hover:bg-blue-300 hover:text-white rounded-md cursor-pointer'>Profile Settings</li>
        <li className='p-2 hover:bg-blue-300 hover:text-white rounded-md cursor-pointer'>Privacy Settings</li>
        <li className='p-2 hover:bg-blue-300 hover:text-white rounded-md cursor-pointer' onClick={() => logout()}>Logout</li>    
      </ul>
    </div>
  )
}

export default AccountOptionsComponent

