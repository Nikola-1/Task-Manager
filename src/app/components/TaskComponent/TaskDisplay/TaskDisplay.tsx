/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
 'use client'
 import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClose, faEarListen, faEllipsis, faNoteSticky, faSadCry, faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Placeholder from '@tiptap/extension-placeholder'
import React, { ChangeEvent, useEffect, useState, useReducer } from "react";
import { supabase } from "@/app/connection/supabaseclient";
import useFilterTasks from "../hooks/useFilterTasks";
import { useEditor,EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Document from '@tiptap/extension-document'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from "@tiptap/extension-list-item";
import TaskCategoryImage from "./TaskCategoryImage";
import  {TextStyle,FontFamily}  from '@tiptap/extension-text-style'
import Task from "../Task/Task";

import { TaskType } from "../Types/TaskType";


interface TaskDisplayProps {
    setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;

   ToggleModal:boolean;
    fullDate: Date | null;
   setFullDate:React.Dispatch<React.SetStateAction<Date | null>>;
   tasksArray:TaskType[];
   setTasksProp: React.Dispatch<React.SetStateAction<any[]>>
   refreshTasks: ()=> Promise<void>
   filter: string
   filterImage:string
   categoryId:number
   
   setSelectedTaskProp: React.Dispatch<React.SetStateAction<TaskType | null>>
   selectedTaskProp:TaskType | null
  }
export default function TaskDisplay({setToggleModal,fullDate,setFullDate,tasksArray,setTasksProp,refreshTasks,filter,filterImage,categoryId,setSelectedTaskProp,selectedTaskProp}:TaskDisplayProps){
  
     
    const {tasks,loading} = useFilterTasks("tasks",null,0);
    const [activeTask,setActiveTask] = useState<string | undefined>("");
    const [DDL,setDDL] = useState<boolean>(false);
    const FontArray:string[] = ['Montserrat','Roboto','Bebas Neue','Fascinate','Google Sans Code'];
     const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      OrderedList,
      ListItem,
      Document,
      Placeholder.configure({
        placeholder: "Write something awesome..."
      }),
      FontFamily
    ],
    content: selectedTaskProp != null ? `${selectedTaskProp.content}` : `${Placeholder}`,
      immediatelyRender: false
    
  })
useEffect(() => {
  if (!editor || !selectedTaskProp) return;

  const currentHTML = editor.getHTML();
  if (currentHTML !== selectedTaskProp.content) {
    editor.commands.setContent(selectedTaskProp.content || "");
  }
}, [selectedTaskProp?.id]);
// useEffect(() => {

//   if (!selectedTaskProp || tasksArray.length === 0) return;

//   const updated = tasksArray.find(t => t.id === selectedTaskProp.id);

//   if (updated && updated.content !== selectedTaskProp.content) {

    
//     setSelectedTaskProp({...updated})
    
//   }
// }, [tasksArray]);
  
  //    useEffect(()=>{
 
  
  const saveContent = async(id:number)=>{
      const html = editor?.getHTML() || "";

      
      
      const {data:updatedTask, error} = await supabase.from('tasks').update({content:html}).eq("id",id).select().single();
     
  
       if (!error && updatedTask) {
  
    console.log("Uspeh")
  
    setTasksProp(prev => prev.map(t => (t.id === id ? updatedTask : t)));
     setSelectedTaskProp(updatedTask);
      
      
    
     
     
        
    
  } else {
    console.error("Save failed:", error?.message);
    return;
  }
  }
    const ShowData = async()=>{
       const {data,error} = await supabase.from("tasks").select("*").order("id", { ascending: true });
    
       setTasksProp(data ?? []);
        
       
    }
    const deleteOneDeleted = async(id:number)=>{
        await supabase.from("tasks").delete().eq("id",id);
        setSelectedTaskProp(null);
         refreshTasks();
    }
    const deleteDeleted = async() =>{
      setSelectedTaskProp(null);
       tasksArray.forEach(async (e)=>await supabase.from("tasks").delete().eq("id", e.id));
       refreshTasks();
    }
    const CategoryImage = async(id:number)=>{
            const {data,error} = await supabase.from("Categories").select("image").eq("category_id",id).single();
            
            return `${data?.image}`;
    }
   
    const updateStatus = async(id:number)=>{
        
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
     
         refreshTasks();
    },[])
    

    
    
        function DateExpression(item: any){
       
            switch(new Date(item).getDate() - new Date().getDate() ){
                case 0: return "Today";
                case 1: return "Tomorrow";
            
                default: return `${ new Date(item).toLocaleDateString("sr-RS")}`;
              
            }
          
        }
         const [, forceUpdate] = useReducer(x=>x+1,0);
          useEffect(()=>{
            if(!editor) return;

            const rerender = () => forceUpdate();
            editor.on('selectionUpdate',rerender);
            editor.on('transaction',rerender);

            return ()=>{
              editor.off('selectionUpdate',rerender);
              editor.off('transaction',rerender);
            }
          }, [editor])
          
          if (!editor) return null;
     
         
    return(
        
        <div className="w-full flex h-full   ">
            
            <div  className="task-list h-full  w-full md:w-2/4 md:border-r-2  flex flex-col ">
            <div className="flex justify-between h-fit items-center p-3">
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
                       
                      
                        <div className="flex  items-center z-10 group-focus-within:invisible">   
                            <FontAwesomeIcon className={ inputValue == "" || inputValue == " " ? "" : "hidden"} icon={faPlus} height={15} width={15} ></FontAwesomeIcon>
                            <p  className="m-1">{inputValue == "" || inputValue == " " ? "Add task" : ""}</p>
                        </div>
                             <div className="flex  items-center">
                                <p>{fullDate != new Date() && fullDate != null ? new Date(fullDate.getTime() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString("sr-RS"): ""}</p>
                                <FontAwesomeIcon className="m-1" onClick={handleOpenModal} icon={faCalendar} width={15} height={15}>
                                    </FontAwesomeIcon><FontAwesomeIcon icon={faArrowDown} width={15} height={15}></FontAwesomeIcon>
                        </div>
                        
                    </div>
                    
                    {filter == "Deleted" ?  <div className="flex justify-center  mx-auto m-3 w-9/12 h-fit bg-blue-400 font-bold text-white rounded-md cursor-pointer" onClick={deleteDeleted}>Delete</div> : <></>}
                    

                 <div className=" overflow-y-scroll h-96">
                    {
                        tasksArray.length != 0 ?
                    tasksArray?.map((item)=>( 
                 <Task
  key={item.id}
  task={item}
  selectedTask={selectedTaskProp}
  
  setSelectedTask={setSelectedTaskProp}
  refreshTasks={refreshTasks}
  filter={filter}
  editor={editor}
/>
                )): <div className="flex justify-center align-middle items-center m-auto"><p className="flex justify-center align-middle items-center font-bold text-blue-900 ">No Tasks </p></div>
                }
                 </div>
            </div> 
                
         {selectedTaskProp != null ? <div className="task-description w-2/4 hidden h-dvh md:flex flex-col">
              
              
               <div style={{ margin: '0.4rem' }}>
        <button className="text-white border-2 bg-blue-300 p-1 rounded-md text-sm m-1 border-blue-300 hover:bg-white hover:text-blue-300" onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>
        <button className="text-white border-2 bg-blue-300 p-1 rounded-md text-sm m-1 border-blue-300 hover:bg-white hover:text-blue-300" onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>
        <button className="text-white border-2 bg-blue-300 p-1 rounded-md text-sm m-1 border-blue-300 hover:bg-white hover:text-blue-300" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          Ordered List
        </button>
        <button className="text-white border-2 bg-blue-300 p-1 rounded-md text-sm m-1 border-blue-300 hover:bg-white hover:text-blue-300" onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Clear formatting
        </button>
        
      </div>
       <div className="flex justify-start mx-1 " style={{ marginBottom: '1rem' }}>
        <div onClick={()=>setDDL(!DDL)} className="selectFontDDL text-white w-32 border-2 relative  bg-blue-300 p-1 rounded-md text-xs m-1 border-blue-300 hover:bg-white hover:text-blue-300 " >
        
        <p>{editor.getAttributes('textStyle').fontFamily != null ? editor.getAttributes('textStyle').fontFamily : "Select font"}</p>

        <div className={DDL == true ? "h-fit transition-all w-full left-0 border-2  border-blue-300 rounded-md absolute z-10 bg-blue-300 text-white " : "h-0 border-blue-300 transition-all w-full rounded-md"  }>

        {FontArray.map((item)=>  <div key={item} className={DDL == true ? "visible p-3 hover:bg-white transition-all rounded-md hover:text-blue-300" :" invisible transition-all "}  onClick={(e)=>editor.chain().focus().setFontFamily(item).run()}>{item}</div>)}
          </div>
           
        </div>
          <div><p  className="text-white border-2 bg-blue-300 p-1 rounded-md text-xs m-1 border-blue-300 hover:bg-white hover:text-blue-300">  Comic Sans MS</p></div>
            <div><p   className="text-white border-2 bg-blue-300 p-1 rounded-md text-xs m-1 border-blue-300 hover:bg-white hover:text-blue-300">H2</p></div>
             <div><p  className="text-white border-2 bg-blue-300 p-1 rounded-md text-xs m-1 border-blue-300 hover:bg-white hover:text-blue-300">H3</p></div>
              <div><p className="text-white border-2 bg-blue-300 p-1 rounded-md text-xs m-1 border-blue-300  hover:bg-white hover:text-blue-300 ">H4</p></div>
             
      </div>
      
                <EditorContent key={selectedTaskProp?.id} className="outline-none border-none ProseMirror my-2 p-1 overflow-y-scroll max-h-dvh" editor={editor} />
                 <button className="text-white border-2  bg-blue-300 p-1 rounded-md text-sm m-1 w-fit border-blue-300 hover:bg-white hover:text-blue-300" onClick={()=>saveContent(selectedTaskProp.id)}> Save</button>
            </div> : ""}
            
            
           
        </div>
        
    )
} 