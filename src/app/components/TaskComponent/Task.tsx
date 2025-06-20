'use client'

import TaskDisplay from "./TaskDisplay/TaskDisplay";
import TaskMenu from "./TaskMenu/TaskMenu";

import ListModal from "./ListModal/ListModal";
import { useEffect, useState } from "react";
import CalendarModal from "../CalendarModal/CalendarModal";

import useFilterTasks from "./hooks/useFilterTasks";
//import { FilterType } from "./Types/FilterType";
export default function Task(){
    const [toggleModalMenu,setToggleModalMenu] = useState(false); 
    const [toggleModalCalendar,setToggleModalCalendar] = useState(false); 
    const [selectedDate,setSelectedDate] = useState(new Date());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [Tasks,setTasks] = useState<any[]>([]);
    const [Filter,setFilter] = useState<string>("Today");
    const [FilterImage,setFilterImage] = useState<string>("");
    //task menu treba da napravi informaciju za taskDisplay kako bi prikazao novu listu taskova 
        const [categoryId,setCategoryId] = useState(0);
    const { tasks, refresh } = useFilterTasks(Filter,null,categoryId);

    const ShowData = async()=>{
            
            console.log(tasks);
           setTasks(tasks ?? []);
           console.log(Tasks);
        }
    useEffect(()=>{
            console.log(selectedDate);
    },[selectedDate])
    useEffect(()=>{
           ShowData();
           console.log(Filter);
          
    },[Filter,Tasks,tasks,categoryId,FilterImage])
    return(
       <div className="flex md:flex-row flex-col w-full ">
          
        <TaskMenu setFilterImage={setFilterImage} setCategoryId={setCategoryId} categoryId={categoryId} setToggleModal={setToggleModalMenu} setTaskFilter={setFilter} ToggleModal={toggleModalMenu} TaskFilter={Filter}></TaskMenu>
        <TaskDisplay categoryId={categoryId} filterImage={FilterImage} filter={Filter}   refreshTasks={refresh} tasksArray={Tasks} setTasksProp={setTasks} fullDate={selectedDate} setFullDate={setSelectedDate} ToggleModal={toggleModalCalendar} setToggleModal={setToggleModalCalendar}></TaskDisplay>
        <ListModal isActive={toggleModalMenu} setActive={setToggleModalMenu}></ListModal>
       
        <CalendarModal setDate={setSelectedDate} DateInherited={selectedDate}  isActive={toggleModalCalendar} setActive={setToggleModalCalendar}></CalendarModal>
    
    </div>
    )

}