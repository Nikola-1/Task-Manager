import { supabase } from '@/app/connection/supabaseclient';
import React, { useState } from 'react'
interface TagModalProps{
    isActive:boolean;
    setActive:React.Dispatch<React.SetStateAction<boolean>>;
}
const TagModalComponent = ({isActive,setActive}:TagModalProps) => {
    const [name,setName] = useState<string>();
    const [color,setColor] = useState<string | null>(null);
    const AddTag = () =>{
        //const {data,error} = supabase.from("Tags").insert({name:name,color:color})
    }

  return (
    <div className={isActive == true ? "flex absolute w-2/12 right-2/4 top-2/4  shadow-md rounded-md bg-white  bottom-2/4 m-auto h-1/4  " : " hidden"} >
            <div className=" inset-0 flex items-center align-middle justify-center w-full">
                <div className="flex  justify-between w-full h-full relative">
            <div className="flex flex-col p-3 relative  xl:w-full ">
                <h3>Add Tag</h3>
                <div className="flex flex-col w-full">
                    <div className="flex w-full">
                    
                    <input  type="text" className=" border-blue-300 border-2 rounded-md  outline-none indent-1  w-full"></input>
                    </div>
                    <div className="relative">
                  
                    </div>
                </div>
               
                <div className="flex w-max items-center align-middle my-1">
                    <p>Color</p>
                    <div className='flex'>
                        <p className='rounded-full w-6 h-6 bg-red-800 m-1'></p>
                           <p className='rounded-full w-6 h-6 bg-blue-800 m-1'></p>
                              <p className='rounded-full w-6 h-6 bg-green-800 m-1'></p>
                                 <p className='rounded-full w-6 h-6 bg-orange-800 m-1'></p>
                                    <p className='rounded-full w-6 h-6 bg-red-800 m-1'></p>
                        </div>
                </div>
                <div className=" flex w-full my-1">
                    <p className='w-1/4'>Parent</p>
                    <select className='w-full'>
                        <option className='w-3/4'>None</option>
                    </select>
                </div>
                <div onClick={()=>{
                   
                } } className=" right-1 absolute bottom-1 flex">
                    <p className="hover:bg-blue-300 hover:text-white border-blue-300 hover:cursor-pointer m-2 p-2 border-2 rounded-md " onClick={async()=>{
         
                   
                } } >Add</p>
                    <p className="border-blue-300 cursor-pointer m-2 p-2 border-2 rounded-md hover:text-white hover:bg-blue-300" onClick={async()=>{
                 setActive(false);
                   
                } } >Close</p>

                </div>
                
            </div>
               
              
            </div>
            </div>
            </div>
  )
}

export default TagModalComponent
