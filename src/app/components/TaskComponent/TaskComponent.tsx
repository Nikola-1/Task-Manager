'use client'

import TaskDisplay from "./TaskDisplay/TaskDisplay";
import TaskMenu from "./TaskMenu/TaskMenu";
import ListModal from "./ListModal/ListModal";
import { useEffect, useState } from "react";
import CalendarModal from "../CalendarModal/CalendarModal";

import useFilterTasks from "./hooks/useFilterTasks";
import { Editor } from "@tiptap/core";
//import { FilterType } from "./Types/FilterType";
export default function TaskComponent(){
    const [toggleModalMenu,setToggleModalMenu] = useState(false); 
    const [toggleModalCalendar,setToggleModalCalendar] = useState(false); 
    const [selectedDate,setSelectedDate] = useState<Date | null>(new Date());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [Tasks,setTasks] = useState<any[]>([]);
    const [selectedTask,setSelectedTask] = useState(Object);
    const [Filter,setFilter] = useState<string>("Today");
    const [FilterImage,setFilterImage] = useState<string>("");
    //task menu treba da napravi informaciju za taskDisplay kako bi prikazao novu listu taskova 
        const [categoryId,setCategoryId] = useState(0);
    const { tasks, refresh } = useFilterTasks(Filter,null,categoryId);

    const ShowData = async()=>{
            
           
           setTasks(tasks ?? []);
         
        }
    
    useEffect(()=>{
           ShowData();
      
          
    },[Filter,Tasks,tasks,categoryId,FilterImage])
    useEffect(()=>{
        setSelectedTask(null);
    },[])
   
    useEffect(()=>{
        setSelectedTask(null);
        console.log(selectedTask);
    },[Filter,categoryId])
    return(
       <div className="flex md:flex-row flex-col w-full ">
          
        <TaskMenu setSelectedTask={setSelectedTask}  setFilterImage={setFilterImage} setCategoryId={setCategoryId} categoryId={categoryId} setToggleModal={setToggleModalMenu} setTaskFilter={setFilter} ToggleModal={toggleModalMenu} TaskFilter={Filter}></TaskMenu>
        <TaskDisplay selectedTaskProp={selectedTask}  setSelectedTaskProp={setSelectedTask} categoryId={categoryId} filterImage={FilterImage} filter={Filter}   refreshTasks={refresh} tasksArray={Tasks} setTasksProp={setTasks} fullDate={selectedDate} setFullDate={setSelectedDate} ToggleModal={toggleModalCalendar} setToggleModal={setToggleModalCalendar}></TaskDisplay>
        <ListModal isActive={toggleModalMenu} setActive={setToggleModalMenu}></ListModal>
       
        <CalendarModal setDate={setSelectedDate} DateInherited={selectedDate}  isActive={toggleModalCalendar} setActive={setToggleModalCalendar}></CalendarModal>
        
    </div>
    )

}