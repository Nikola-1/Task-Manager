

'use client'

import TaskDisplay from "./TaskDisplay/TaskDisplay";
import TaskMenu from "./TaskMenu/TaskMenu";

import ListModal from "./ListModal/ListModal";
import { useEffect, useState } from "react";
export default function Task(){
    const [toggleModal,setToggleModal] = useState(false); 
    useEffect(()=>{
        console.log(toggleModal);
    },[toggleModal])
    return(
       <div className="flex md:flex-row flex-col w-full ">
        <TaskMenu setToggleModal={setToggleModal} ToggleModal={toggleModal}></TaskMenu>
        <TaskDisplay></TaskDisplay>
        <ListModal isActive={toggleModal} setActive={setToggleModal}></ListModal>
        
    </div>
    )

}

