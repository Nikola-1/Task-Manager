

'use client'

import TaskDisplay from "./TaskDisplay/TaskDisplay";
import TaskMenu from "./TaskMenu/TaskMenu";

import ListModal from "./ListModal/ListModal";
import { useState } from "react";
export default function Task(){
    const [toggleModal,setToggleModal] = useState(false);
    return(
       <div className="flex md:flex-row flex-col w-full ">
        <TaskMenu></TaskMenu>
        <TaskDisplay></TaskDisplay>
        <ListModal isActive={toggleModal}></ListModal>
        
    </div>
    )

}

