import { supabase } from '@/app/connection/supabaseclient';
import { useAuth } from '@/app/context/AuthContext';
import React, { act, useEffect, useRef, useState } from 'react'
interface TagModalProps{
    isActive:boolean;
    setActive:React.Dispatch<React.SetStateAction<boolean>>;
    refreshFlagTags:boolean;
      onUpdate: React.Dispatch<React.SetStateAction<void>>;
}
const TagModalComponent = ({isActive,setActive,refreshFlagTags,onUpdate}:TagModalProps) => {
    const [name,setName] = useState<string>();
    const [color,setColor] = useState<string | null>(null);
    const [parentTag,setParentTag] = useState<number | null>(null);
    const [activeColor,setActiveColor] = useState<number>(0);

    const [tags,setTags] = useState<any[]>();
    const [x,setX]= useState<number>();
    const [y,setY] = useState<number>();
    const ColorInput = useRef<HTMLDivElement>(null); 
    const {user} = useAuth();

    const AddTag = async () =>{
        const {error} = await supabase.from("Tags").insert({name:name,color:color,parent_id:parentTag,User_id:user?.id})

        if(error){
            console.log(error)
        }
        else{
            GetTags();
            setActive(false);
            onUpdate();
        }
    }
    const GetTags= async() =>{
        const {data,error} = await supabase.from("Tags").select("*").eq("User_id",user?.id);

        if(error){
            console.log(error);
        }
        else{
            
            setTags(data || []);
            console.log(data);
            
        }

    }
    
    const ChangePositionColorInput =(e)=>{
            ColorInput.current?.click();
           
            setX(e.clientX);
            setY(e.clientY);
            console.log(x,y);
            console.log(ColorInput);
    }
    const handleClick = async (e)=>{
        const id = e.currentTarget.dataset.colorId;
        const colorCode=e.currentTarget.dataset.colorCode;
        console.log(id);
        setActiveColor(id);
        setColor(colorCode);
        console.log(color);
    }

   useEffect(()=>{
        GetTags();
   },[isActive])
  return (
    <div className={isActive == true ? "flex absolute w-2/12 right-2/4 top-2/4  shadow-md rounded-md bg-white  bottom-2/4 m-auto h-1/4  " : " hidden"} >
            <div className=" inset-0 flex items-center align-middle relative justify-center w-full">
                <div className="flex  justify-between w-full h-full relative">
            <div className="flex flex-col p-3 relative  xl:w-full ">
                <h3>Add Tag</h3>
                <div className="flex flex-col w-full">
                    <div className="flex w-full">
                    
                    <input onChange={e=>setName(e.currentTarget.value)} type="text" className=" border-blue-300 border-2 rounded-md  outline-none indent-1  w-full"></input>
                    </div>
                    <div className="relative">
                  
                    </div>
                </div>
               
                <div className="flex w-max items-center align-middle my-1">
                    <p>Color</p>
                    <div className='flex'>
                        <p data-color-id={1} data-color-code={"#991b1b"} className={`rounded-full w-6 h-6 bg-red-800 m-1 p-3 hover:border-blue-400 border-2 transition-all cursor-pointer ${activeColor == 1 ? `border-blue-400` : ``}`} onClick={handleClick}  ></p>
                           <p data-color-id={2} data-color-code={"#3730a3"} className={`rounded-full w-6 h-6 bg-indigo-800  p-3 m-1 hover:border-blue-400 border-2 transition-all cursor-pointer ${activeColor == 2 ? `border-blue-400` : ``}` } onClick={handleClick} ></p>
                                <p data-color-id={3} data-color-code={"#9a3412"} className={`rounded-full w-6 h-6 bg-orange-800  p-3 m-1 hover:border-blue-400 border-2 transition-all cursor-pointer ${activeColor == 3 ? `border-blue-400` : ``}`} onClick={handleClick} ></p>
                                  <p data-color-id={4} data-color-code={"#1e40af"} className={`rounded-full w-6 h-6 bg-blue-800  p-3 m-1 hover:border-blue-400 border-2 transition-all cursor-pointer ${activeColor == 4 ? `border-blue-400` : ``}`} onClick={handleClick} ></p>
                                     <p data-color-id={5} data-color-code={"#166534"} className={`rounded-full w-6 h-6 bg-green-800  p-3 m-1 hover:border-blue-400 border-2 transition-all cursor-pointer ${activeColor == 5 ? `border-blue-400` : ``}`} onClick={handleClick} ></p>
                                     <p data-color-id={6} data-color-code={"#166534"} className={`rounded-full w-6 h-6 bg-gradient-to-r from-blue-600 via-red-400 to-green-300  p-3 m-1 hover:border-blue-400 border-2 transition-all cursor-pointer ${activeColor == 6 ? `border-blue-400` : ``}`} onClick={(e)=>{handleClick(e);ChangePositionColorInput(e); }} ></p>
                                      <input ref={ColorInput} onChange={e=>setColor(e.currentTarget.value)} type='color' className={`invisible`} ></input>
                        </div>
                </div>
                <div className=" flex w-full my-1">
                    <p className='w-1/4'>Parent</p>
                    <select className='w-full'>
                        <option  value={0} className='w-3/4'>None</option>
                        {tags?.map(tag => <option key={tag.id} onClick={()=>setParentTag(tag.id)} value={tag.id} className='w-3/4'>{tag.name}</option>)}
                    </select>
                </div>
                <div onClick={()=>{
                   
                } } className=" right-1 absolute bottom-1 flex">
                    <p className="hover:bg-blue-300 hover:text-white border-blue-300 hover:cursor-pointer m-2 p-2 border-2 rounded-md " onClick={async()=>{
                        AddTag();
                   
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
