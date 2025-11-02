import { supabase } from '@/app/connection/supabaseclient';
import React, {  useEffect, useState } from 'react'
import { Editor } from '@tiptap/core';
import TaskCategoryImage from '../TaskDisplay/TaskCategoryImage';
import { faClose, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TaskType } from '../Types/TaskType';
export interface TaskProps{
     
        id:number
        activeTask:string | undefined
        setActiveTask:React.Dispatch<React.SetStateAction<string | undefined>>;
        filter:string;
        setSelectedTask:React.Dispatch<React.SetStateAction<TaskType | null>>;
        
        refreshTasks: ()=> Promise<void>
        editor:Editor
}
export default function Task ({id,setActiveTask,filter,editor,setSelectedTask,activeTask,refreshTasks} : TaskProps){
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const [Task,setTask] = useState<any>(Object);
        async function getTask(){
          const { data, error } = await supabase.from("tasks").select("*").eq("id", id);



          
if (error) {
  console.error(error);
  return;
}

setTask(data[0]);


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
 const deleteOneDeleted = async(id:number)=>{
        await supabase.from("tasks").delete().eq("id",id);
        setSelectedTask(null);
         refreshTasks();
    }
        const updateStatus = async(id:number)=>{
                
                if(await supabase.from("tasks").select("*").eq("id",id).eq("Completed","FALSE")){
                        await supabase.from("tasks").update({Completed:"TRUE"}).eq("id",id);
                }
               
                
            }
function DateExpression(item: any){
       
            switch(new Date(item).getDate() - new Date().getDate() ){
                case 0: return "Today";
                case 1: return "Tomorrow";
            
                default: return `${ new Date(item).toLocaleDateString("sr-RS")}`;
              
            }
          
        }



        useEffect(()=>{
          
                getTask();
          refreshTasks();
        },[])
        
    return(
            <>
                    {<div onClick={async ()=>{
                                         editor.commands.setContent(Task.content)
                                         setSelectedTask({...Task});
                                       
                                      
                                         setActiveTask(Task);
                                        
                                        }}    className={`flex justify-between items-center text-blue-900 transition-all p-3 cursor-pointer
                              ${
                                activeTask === Task
                                  ? "bg-blue-400 hover:bg-blue-400" // aktivni task
                                  : "hover:bg-blue-300" // ostali
                              }
                            `}><div className="flex items-center  " key={Task.id}>
                                            <input type="checkbox" className="m-1" onClick={()=> updateStatus(Task.id)}></input><p className="">{Task.name}</p>  {Task.category_id !== null && Task.category_id !== undefined && (
                      <TaskCategoryImage id={Task.category_id} />
                    )}</div><div className="flex items-center "><p className="mx-2">{
                                              
                                           Task.date != null ? DateExpression(Task.date) : "no date"
                                            }</p>
                                         
                                         {filter != "Deleted" ?<FontAwesomeIcon icon={faClose} onClick={()=>DeleteData(Task.id)} className="cursor-pointer"></FontAwesomeIcon> : <FontAwesomeIcon icon={faTrashAlt} onClick={()=>deleteOneDeleted(Task.id)} className="cursor-pointer"></FontAwesomeIcon>}   </div></div>}
            </>

    )
}
