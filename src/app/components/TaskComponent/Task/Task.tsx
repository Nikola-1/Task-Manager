import { supabase } from '@/app/connection/supabaseclient';
//import React, {  useEffect, useState } from 'react'
import { Editor } from '@tiptap/core';
import TaskCategoryImage from '../TaskDisplay/TaskCategoryImage';
import { faClose, faEllipsis, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TaskType } from '../Types/TaskType';
export interface TaskProps {
  task: TaskType;
  selectedTask: TaskType | null;
  
  filter: string;
  setSelectedTask: React.Dispatch<React.SetStateAction<TaskType | null>>;
  refreshTasks: () => Promise<void>;
  editor: Editor;
  
}
export default function Task({ task, filter, setSelectedTask, selectedTask, refreshTasks }: TaskProps) {
  const updateStatus = async (id: number) => {
    const { error } = await supabase.from("tasks").update({ Completed: "TRUE" }).eq("id", id);
    if (!error) refreshTasks();
  };

  function DateExpression(item: any) {
    switch (new Date(item).getDate() - new Date().getDate()) {
      case 0: return "Today";
      case 1: return "Tomorrow";
      default: return `${new Date(item).toLocaleDateString("sr-RS")}`;
    }
  }
  const deleteOneDeleted = async(id:number)=>{
          await supabase.from("tasks").delete().eq("id",id);
          setSelectedTask(null);
           refreshTasks();
      }
 const DeleteData = async (id:number)=>{
        
        const { error } = await supabase.from("tasks").update({Deleted:"TRUE"}).eq("id", id);
  if (!error) {
    setSelectedTask(null);
    refreshTasks(); // <<< ovo pokreće ponovni fetch iz hooka
  } else {
    console.error("Delete failed:", error.message);
  }
  
    }
    
  return (
    <div
      
      className='group flex items-center'
    >
      <div onClick={() => {
        if (selectedTask === task) return;
        setSelectedTask(task); 
        
      }} className={` flex justify-between w-full items-center text-blue-900 transition-all p-3 cursor-pointer ${
        selectedTask === task ? "bg-blue-400 rounded-md" : "hover:bg-blue-300 rounded-md"
      }`}>
      <div className="flex items-center ">
        
        <input  type="checkbox" className="m-1" onClick={() => updateStatus(task.id)} />
        <p>{task.name}</p>
        {task.category_id && <TaskCategoryImage id={task.category_id} />}
      </div>
      <div className='flex items-center'>
      <div className="flex items-center">
        <p className="mx-2">{task.date ? DateExpression(task.date) : "no date"}</p>
        <FontAwesomeIcon
          icon={filter !== "Deleted" ? faClose : faTrashAlt}
          onClick={async() => 
            
            filter !== "Deleted" ? DeleteData(task.id)
              : deleteOneDeleted(task.id)
              
          }
          className="cursor-pointer mx-2"
        />
        
      </div>
      </div>
      </div>
      <FontAwesomeIcon
          icon={faEllipsis}
          
          className="cursor-pointer invisible  group-hover:visible m-1 size-3"
        />
        
    </div>
  );
}

