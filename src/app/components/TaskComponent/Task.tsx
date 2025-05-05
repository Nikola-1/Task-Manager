

'use client'

import TaskDisplay from "./TaskDisplay/TaskDisplay";
import TaskMenu from "./TaskMenu/TaskMenu";

import ListModal from "./ListModal/ListModal";
import { useEffect, useState } from "react";
import CalendarModal from "../CalendarModal/CalendarModal";
export default function Task(){
    const [toggleModalMenu,setToggleModalMenu] = useState(false); 
    const [toggleModalCalendar,setToggleModalCalendar] = useState(false); 
    const [selectedDate,setSelectedDate] = useState(new Date());
    const [Tasks,setTasks] = useState([]);
    useEffect(()=>{
            console.log(selectedDate);
    },[selectedDate])
    return(
       <div className="flex md:flex-row flex-col w-full ">
          
        <TaskMenu setToggleModal={setToggleModalMenu} ToggleModal={toggleModalMenu}></TaskMenu>
        <TaskDisplay fullDate={selectedDate} setFullDate={setSelectedDate} ToggleModal={toggleModalCalendar} setToggleModal={setToggleModalCalendar}></TaskDisplay>
        <ListModal isActive={toggleModalMenu} setActive={setToggleModalMenu}></ListModal>
       
        <CalendarModal setDate={setSelectedDate} DateInherited={selectedDate}  isActive={toggleModalCalendar} setActive={setToggleModalCalendar}></CalendarModal>
    
    </div>
    )

}

