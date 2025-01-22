'use client'
import Image from "next/image"
import Today from "../../../../assets/img/october.png"
import SevenDays from "../../../../assets/img/7-days.png"
import message from "../../../../assets/img/message-alert.png"
import briefCase from "../../../../assets/img/3d-briefcase.png"
import music from "../../../../assets/img/3d-music.png"
import paperBag from "../../../../assets/img/3d-paper-bag.png"
import { faAnglesDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react"
import "./TaskMenu.css";
interface TaskMenuProps {
    setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
   ToggleModal:boolean
  }
export default function TaskMenu({ ToggleModal,setToggleModal }: TaskMenuProps){
    const handleOpenModal = ()=>{
        setToggleModal(true);
    }
    const handleCloseModal = () => {
        setToggleModal(false); // Zatvaranje modala
      };
    const [toggle,setToggle] = useState(true);
    const [menuButtonToggle,setMenuButtonToggle] = useState(Number);
    return(
        <div className="Task-menu border-blue-300 md:border-r-2 md:border-l-2" id="TaskMenu">
            
        <div className="task-menu-wrapper md:w-64 w-dvw   md:h-screen  ">
        <FontAwesomeIcon icon={faAnglesDown} onClick={()=>toggle ? setToggle(false) : setToggle(true)} className="size-16 md:hidden flex items-center justify-center align-middle m-auto text-blue-400 "></FontAwesomeIcon>
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
                    <li onClick={()=>setMenuButtonToggle(1)} className={menuButtonToggle == 1 ? "group background-animation flex transition-all duration-200 flex-row justify-between align-middle p-1 bg-blue-300   items-center text-blue-900" : "flex transition-all duration-200 flex-row justify-between align-middle p-1   items-center text-blue-900"}  >
                        <div className=" group-[]:translate-x-3 transition-all  flex flex-row align-middle items-center "><Image src={briefCase} width={20} height={10} alt="Calendar with number on it"></Image> <p className="m-2">Today</p> </div> <p>3</p>
                    </li>
                    <li onClick={()=>setMenuButtonToggle(2)} className={menuButtonToggle == 2 ? "group flex transition-all duration-200 flex-row justify-between align-middle p-1 bg-blue-300   items-center text-blue-900" : "flex transition-all duration-200 flex-row justify-between align-middle p-1   items-center text-blue-900"}>
                        <div className="group-[]:translate-x-3   flex flex-row align-middle items-center  transition-all"><Image src={music} width={20} height={10} alt="Calendar with number on it"></Image> <p className="m-2">Music</p> </div> <p>2</p>
                    </li>
                    <li onClick={()=>setMenuButtonToggle(3)} className={menuButtonToggle == 3 ? "group flex transition-all duration-200 flex-row justify-between align-middle p-1 bg-blue-300   items-center text-blue-900" : "flex transition-all duration-200 flex-row justify-between align-middle p-1   items-center text-blue-900"}>
                        <div className="group-[]:translate-x-3 transition-all  flex flex-row align-middle items-center "><Image   src={paperBag} width={20} height={10} alt="Calendar with number on it"></Image> <p className="m-2">Shopping</p> </div> <p>1</p>
                    </li>
                </ul>

                
            </div>
            </div>
        </div>
    </div>
    )
}