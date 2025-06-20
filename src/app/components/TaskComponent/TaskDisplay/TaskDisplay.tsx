/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
 'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClose, faEarListen, faEllipsis, faNoteSticky, faSadCry, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { ChangeEvent, useEffect, useState } from "react";
import { supabase } from "@/app/connection/supabaseClient";
import useFilterTasks from "../hooks/useFilterTasks";
import { useEditor,EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Document from '@tiptap/extension-document'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from "@tiptap/extension-list-item";
import TaskCategoryImage from "./TaskCategoryImage";
interface TaskDisplayProps {
    setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
   // setTask:React.Dispatch<React.SetStateAction<[]>>;
   ToggleModal:boolean;
   fullDate:Date;
   setFullDate:React.Dispatch<React.SetStateAction<Date>>;
   tasksArray:any[];
   setTasksProp: React.Dispatch<React.SetStateAction<any[]>>
   refreshTasks: ()=> Promise<void>
   filter: string
   filterImage:string
   categoryId:number
  }
export default function TaskDisplay({setToggleModal,fullDate,setFullDate,tasksArray,setTasksProp,refreshTasks,filter,filterImage,categoryId}:TaskDisplayProps){
  
    const [selectedTask,setSelectedTask] = useState(Object);
    const {tasks,loading} = useFilterTasks("tasks",null,0);

     const editor = useEditor({
    extensions: [
      StarterKit,
      OrderedList,
      ListItem,
      Document
    ],
    content: `${selectedTask.content}`,
    
  })
  const saveContent = async(id:number)=>{
      const html = editor?.getHTML();
      const {error} = await supabase.from('tasks').update({content:html}).eq("id",id)
  }
    const ShowData = async()=>{
       const {data,error} = await supabase.from("tasks").select("*")
    
       setTasksProp(tasks ?? []);
       console.log(tasksArray);
       
    }
    const CategoryImage = async(id:number)=>{
            const {data,error} = await supabase.from("Categories").select("image").eq("category_id",id).single();
            console.log(data?.image)
            return `${data?.image}`;
    }
    const DeleteData = async (id:number)=>{
        console.log("refreshTasks is:", refreshTasks);
        const { error } = await supabase.from("tasks").update({Deleted:"TRUE"}).eq("id", id);
  if (!error) {
    refreshTasks(); // <<< ovo pokreće ponovni fetch iz hooka
  } else {
    console.error("Delete failed:", error.message);
  }
  
    }
    const updateStatus = async(id:number)=>{
        console.log("refreshTask is:",refreshTasks);
        if(await supabase.from("tasks").select("*").eq("id",id).eq("Completed","FALSE")){
                await supabase.from("tasks").update({Completed:"TRUE"}).eq("id",id);
        }
       
        
    }
    const [inputValue,setInputValue] = useState("Add task");
const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
        setInputValue(e.target.value);
}

 const handleOpenModal = ()=>{
        setToggleModal(true);
       
    }
    const AddTask = async (name:string,fullDate:Date,categoryId?:number) =>{
        
      const { error } = categoryId != 0 ? await supabase
        .from('tasks')
        .insert({  name: name,date:fullDate,category_id:categoryId }) : await supabase
        .from('tasks')
        .insert({  name: name,date:fullDate });
       
        if (!error) {
    refreshTasks(); // <<< ovo pokreće ponovni fetch iz hooka
  } else {
    console.error("Delete failed:", error.message);
  }

    }
    const handleCloseModal = () => {
        setToggleModal(false); // Zatvaranje modala
      };
    const [toggle,setToggle] = useState(true);
    const [menuButtonToggle,setMenuButtonToggle] = useState(Number);
    const [selectedDate,setSelectedDate] = useState('');
    useEffect(()=>{
     
        refreshTasks()
    },[])
    useEffect(()=>{
        
       console.log(selectedDate);
  
    },[selectedDate])
        function DateExpression(item: any){
       
            switch(new Date(item).getDate() - new Date().getDate() ){
                case 0: return "Today";
                case 1: return "Tomorrow";
            
                default: return `${ new Date(item).toLocaleDateString("sr-RS")}`;
              
            }
          
        }
          if (!editor) return null
    return(
        
        <div className="w-full flex   ">
            
            <div  className="task-list w-full md:w-2/4 md:border-r-2  flex flex-col ">
            <div className="flex justify-between items-center p-3">
                    <h3 className="pr-3 pl-3 flex align-middle items-center ">{filter}{ filterImage == "" ? <p></p> : <img width={20} height={20} className="mx-2" src={"../img/"+filterImage+".png"}/>}</h3>
                    <FontAwesomeIcon className="cursor-pointer text-2xl" icon={faEllipsis}></FontAwesomeIcon>
                    </div>
                    <div className="relative flex justify-between text-white items-center m-3 p-1 bg-blue-300  rounded-md z-0 group">
                       
         
                        <input className="absolute z-20 bg-transparent outline-none group-focus-within:outline-none placeholder-white" onChange={handleChange} onKeyDown={(e)=>{
                            if(e.key === "Enter" && inputValue != "" && inputValue != " "){
                                AddTask(inputValue,fullDate,categoryId);
                                ShowData();
                            }
                       
                        }} placeholder={inputValue}></input>
                       
                      
                        <div className="flex items-center z-10 group-focus-within:invisible">   
                            <FontAwesomeIcon className={ inputValue == "" || inputValue == " " ? "" : "hidden"} icon={faPlus} height={15} width={15} ></FontAwesomeIcon>
                            <p  className="m-1">{inputValue == "" || inputValue == " " ? "Add task" : ""}</p>
                        </div>
                             <div className="flex items-center">
                                <p>{fullDate != new Date() && fullDate != null ? new Date(fullDate.getTime() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString("sr-RS"): ""}</p>
                                <FontAwesomeIcon className="m-1" onClick={handleOpenModal} icon={faCalendar} width={15} height={15}>
                                    </FontAwesomeIcon><FontAwesomeIcon icon={faArrowDown} width={15} height={15}></FontAwesomeIcon>
                        </div>
                        
                    </div>
                    {
                        tasksArray.length != 0 ?
                    tasksArray?.map((item)=>( 
                   <div onClick={async (i)=>{
                    editor.commands.setContent(item.content)
                    setSelectedTask(item);
                    console.log(selectedTask )
                    
                    }} key={item.id} className="flex justify-between  items-center    text-blue-900 hover:bg-blue-300 transition-all p-3  "><div className="flex items-center  " key={item.id}>
                        <input type="checkbox" className="m-1" onClick={()=> updateStatus(item.id)}></input><p className="">{item.name}</p>   <TaskCategoryImage id={item.category_id} /></div><div className="flex items-center "><p className="mx-2">{
                          
                       item.date != null ? DateExpression(item.date) : "no date"
                        }</p>
                     
                        <FontAwesomeIcon icon={faClose} onClick={()=>DeleteData(item.id)} className="cursor-pointer"></FontAwesomeIcon></div></div>
                )): <div className="flex justify-center align-middle items-center m-auto"><p className="flex justify-center align-middle items-center font-bold text-blue-900 ">No Tasks </p></div>}
                  
            </div> 
         
            <div className="task-description w-2/4 hidden md:flex flex-col">
              
              
               <div style={{ marginBottom: '1rem' }}>
        <button className={editor.isActive('bold') ? "font-bold m-3" : "font-light m-3"} onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>
        <button className={editor.isActive('italic') ? "font-bold m-3" : "font-light m-3"} onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>
        <button className={editor.isActive('orderedList') ? "font-bold m-3" : "font-light m-3"} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          Ordered List
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Clear formatting
        </button>
      </div>
                <EditorContent className="outline-none border-none ProseMirror" editor={editor}/>
            </div>
            <button onClick={()=>saveContent(selectedTask.id)}>Save</button>
        </div>
    )
} 