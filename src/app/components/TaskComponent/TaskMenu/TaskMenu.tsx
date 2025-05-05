'use client'
import Image from "next/image"
import Today from "../../../../assets/img/october.png"
import SevenDays from "../../../../assets/img/7-days.png"
import message from "../../../../assets/img/message-alert.png"
import briefCase from "../../../../assets/img/3d-briefcase.png"
import music from "../../../../assets/img/3d-music.png"
import paperBag from "../../../../assets/img/3d-paper-bag.png"
import { faAngleDown, faAngleRight, faAnglesDown, faCheck, faMarker, faPlus, faSign, faTag, faTicket, faTicketAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { supabase } from "@/app/connection/supabaseClient";
import React, { useState,useEffect, useMemo } from "react"
import "./TaskMenu.css";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons/faCheckSquare"

interface TaskMenuProps {
    setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
   ToggleModal:boolean
  }
  
export default function TaskMenu({ ToggleModal,setToggleModal }: TaskMenuProps){
    const [categories,setCategories] = useState<any[]>([]);
    const [visibleTags,setVisibleTags] = useState(false);
    const ShowData = async()=>{
        const {data,error} = await supabase.from("Categories").select('*');
    
       setCategories(data ?? []);
       console.log(categories);
    }
    const FilterData = ()=>{
        
    }
    const handleOpenModal = ()=>{
        setToggleModal(true);
    }
    const handleCloseModal = () => {
        setToggleModal(false); // Zatvaranje modala
      };
     
    const [toggle,setToggle] = useState(true);
    const [menuButtonToggle,setMenuButtonToggle] = useState(Number);
    
    useEffect(()=>{
        ShowData()
    },[])
    return(
        <div className="Task-menu border-blue-300 md:border-r-2 md:border-l-2 md:w-1/4" id="TaskMenu">
           
        <div className="task-menu-wrapper  w-full   md:h-screen    ">
        <FontAwesomeIcon icon={faAnglesDown} onClick={()=>{
            toggle ? setToggle(false) : setToggle(true);
            
            }} className="size-16 md:hidden flex items-center justify-center align-middle m-auto text-blue-400 "></FontAwesomeIcon>
            <div className={toggle ? "visible flex flex-col" : " hidden md:flex flex-col "}>
            <div className="Task-intervals ">
                <ul className="p-3">
                
                    <li className="flex flex-row justify-between align-middle p-1 bg-blue-300   items-center text-blue-900">
                        <div className="flex flex-row align-middle items-center "><Image src={Today} width={30} height={20} alt="Calendar with number on it"></Image> <p className="m-2">Today</p> </div> <p>3</p>
                    </li>
                    <li className="flex justify-between  p-1   items-center text-blue-900">
                        <div className="flex flex-row align-middle items-center"><Image src={SevenDays} width={30} height={20} alt="Calendar with number on it"></Image><p className="m-2">7 days</p> </div> <p>3</p>
                    </li>
                    <li className="flex justify-between   p-1   items-center text-blue-900">
                        <div className="flex flex-row align-middle items-center"><Image src={message} width={30} height={20} alt="Calendar with number on it"></Image><p className="m-2">Inbox</p> </div> <p>3</p>
                    </li>
                    <hr className="border-blue-300 border-t-2 mt-3"></hr>
                </ul>
            
                
            </div>
            <div className="Task-list ">
                <div className="flex items-center justify-between ">
                    <div className="flex">
                <h5 className="text-blue-900 font-bold m-3 p-0.5">List</h5>
                <p className="bg-blue-300 w-fit m-3 p-0.5 text-blue-900">Used: 3/9</p>
                </div>
                <FontAwesomeIcon onClick={()=> setToggleModal(!ToggleModal)} className="pr-3 hover:cursor-pointer text-blue-900" icon={faPlus} width={20} height={20}></FontAwesomeIcon>
                </div>
                <ul className=" p-3">
                {categories.map((cat,i)=> <li onClick={()=>setMenuButtonToggle(i)} key={i} className={menuButtonToggle == i ? "group background-animation flex transition-all duration-200 flex-row justify-between align-middle p-1 bg-blue-300   items-center text-blue-900" : "flex transition-all duration-200 flex-row justify-between align-middle p-1   items-center text-blue-900"}  >
                        <div className=" group-[]:translate-x-3 transition-all  flex flex-row align-middle items-center "><img src={"../img/"+cat.image+".png"} width={20} height={10} alt="Calendar with number on it"></img> <p className="m-2">{cat.name}</p> </div> <p>3</p>
                    </li>)}
                
                </ul>

                
            </div>
            <div className="Task-list ">
                <div className="flex items-center justify-between ">
                    <div className="flex transition-all">
                        
                <h5 className="text-blue-900 font-bold m-3 p-0.5 cursor-pointer" onClick={()=> visibleTags ?  setVisibleTags(false) : setVisibleTags(true)}><FontAwesomeIcon icon={faAngleRight} className={visibleTags ? "rotate-90 transition-all duration-500" : "rotate-0 transition-all duration-500"}></FontAwesomeIcon>Tags</h5>
   
                </div>
               
                </div>
                <ul className="p-3" >
              
                <li  className= {visibleTags ? "group background-animation flex transition-all duration-200 flex-row justify-between align-middle p-1    items-center text-blue-900" : "group background-animation flex transition-all duration-200 flex-row justify-between align-middle p-1    items-center text-blue-900 hidden" }    >
                        <div className=" group-[]:translate-x-3 transition-all  flex flex-row align-middle items-center "><FontAwesomeIcon icon={faTag} width={20} height={10}></FontAwesomeIcon> <p className="m-2">Web</p> </div> <p>3</p>
                    </li>
                    <hr className="border-blue-300 border-t-2 mt-3"></hr>
                </ul>

                
            </div>
            </div>
            <div className="p-3 flex justify-start items-center align-middle text-center align-middle hover:cursor-pointer text-blue-900">
      
                <FontAwesomeIcon icon={faCheckSquare} width={20} height={10} className="text-blue-300"/>

                <p className="px-2">Completed</p>
                </div>
                <div className="p-3 flex justify-start items-center align-middle text-center align-middle hover:cursor-pointer text-blue-900">
                <FontAwesomeIcon icon={faTrash} width={20} height={10} className="text-blue-300"/>
                <p className="px-2">Deleted</p>
                </div>
        </div>
    </div>
    )
}