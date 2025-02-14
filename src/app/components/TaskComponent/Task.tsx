

'use client'

import TaskDisplay from "./TaskDisplay/TaskDisplay";
import TaskMenu from "./TaskMenu/TaskMenu";

import ListModal from "./ListModal/ListModal";
import { useEffect, useState } from "react";
import CalendarModal from "../CalendarModal/CalendarModal";
export default function Task(){
    const [toggleModalMenu,setToggleModalMenu] = useState(false); 
    const [toggleModalCalendar,setToggleModalCalendar] = useState(false); 
    return(
       <div className="flex md:flex-row flex-col w-full ">
        <TaskMenu setToggleModal={setToggleModalMenu} ToggleModal={toggleModalMenu}></TaskMenu>
        <TaskDisplay ToggleModal={toggleModalCalendar} setToggleModal={setToggleModalCalendar}></TaskDisplay>
        <ListModal isActive={toggleModalMenu} setActive={setToggleModalMenu}></ListModal>
        <CalendarModal  isActive={toggleModalCalendar} setActive={setToggleModalCalendar}></CalendarModal>
    </div>
    )

}

