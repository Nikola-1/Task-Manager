'use client'

import TaskDisplay from "./TaskDisplay/TaskDisplay";
import TaskMenu from "./TaskMenu/TaskMenu";
import ListModal from "./ListModal/ListModal";
import { useEffect, useState } from "react";
import CalendarModal from "../CalendarModal/CalendarModal";
import { useAuth } from "@/app/context/AuthContext";
import useFilterTasks from "./hooks/useFilterTasks";
import TagModalComponent from "../TagModal/TagModalComponent";
import { TaskType } from "./Types/TaskType";

//import { FilterType } from "./Types/FilterType";
export default function TaskComponent(){
    const [refreshFlag,setRefreshFlag] = useState(false);
    const [refreshFlagTags,setRefreshFlagTags] = useState(false);
    const triggerRender = ()=>{
        
        setRefreshFlag(prev => !prev);
    }
    const triggerRenderTags = ()=>{
        setRefreshFlagTags(prev => !prev);
    }
    const [toggleModalMenu,setToggleModalMenu] = useState(false); 
    const [toggleModalCalendar,setToggleModalCalendar] = useState(false); 
    const [toggleModalTag,setToggleModalTag] = useState(false);
    const [selectedDate,setSelectedDate] = useState<Date | null>(new Date());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    
    const [selectedTask,setSelectedTask] = useState(Object);
    const [Filter,setFilter] = useState<string>("Today");
    const [FilterImage,setFilterImage] = useState<string>("");
    const [editListItem,setEditListItem] = useState<object | null>(null);
    //task menu treba da napravi informaciju za taskDisplay kako bi prikazao novu listu taskova 
  
        const [categoryId,setCategoryId] = useState(0);
          const isCategory = categoryId !== 0;
        const [sideMenuVisible,setSideMenuVisible] = useState<boolean>(false);
    const { tasks, refresh } = useFilterTasks(Filter,isCategory,categoryId);
    
    const [nameCategory,setnameCategory] = useState<string | undefined>();
const [ModeModal,setModeModal]=useState<string | undefined>();
    const {user} =useAuth();
    
    
    useEffect(()=>{
         
      
       
    },[Filter,tasks,categoryId,FilterImage])
    
   
    useEffect(()=>{
        setSelectedTask(null);
        
    },[Filter,categoryId])
    
    return(
       <div className="flex md:flex-row flex-col w-full ">
          
        <TaskMenu refreshFlagTags={refreshFlagTags} setToggleModalTag={setToggleModalTag} ToggleModalTag={toggleModalTag} Mode={ModeModal} setNameCategory={setnameCategory} setMode={setModeModal} setEditListItem={setEditListItem} SideMenuVisible={sideMenuVisible} refreshFlag={refreshFlag}  setSelectedTask={setSelectedTask}  setFilterImage={setFilterImage} setCategoryId={setCategoryId} categoryId={categoryId} setToggleModal={setToggleModalMenu} setTaskFilter={setFilter} ToggleModal={toggleModalMenu} TaskFilter={Filter}></TaskMenu>
        <TaskDisplay  refreshFlag={refreshFlag} SideMenuVisible={sideMenuVisible} setSideMenuVisible={setSideMenuVisible} selectedTaskProp={selectedTask}  setSelectedTaskProp={setSelectedTask} categoryId={categoryId} filterImage={FilterImage} filter={Filter}   refreshTasks={refresh} tasksArray={tasks}  fullDate={selectedDate} setFullDate={setSelectedDate} ToggleModal={toggleModalCalendar} setToggleModal={setToggleModalCalendar}></TaskDisplay>
        <ListModal setTaskFilter={setFilter} setFilterImage={setFilterImage} nameCategory={nameCategory} setnameCategory={setnameCategory} Mode={ModeModal} setEditListItem={setEditListItem} editListItem={editListItem}  onUpdate={triggerRender}  isActive={toggleModalMenu} setActive={setToggleModalMenu}></ListModal>
       
        <CalendarModal setDate={setSelectedDate} DateInherited={selectedDate}  isActive={toggleModalCalendar} setActive={setToggleModalCalendar}></CalendarModal>
        <TagModalComponent onUpdate={triggerRenderTags} refreshFlagTags={refreshFlagTags} isActive={toggleModalTag} setActive={setToggleModalTag} />
    </div>
    )

}