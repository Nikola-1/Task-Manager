'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, useState } from "react";

interface TaskDisplayProps {
    setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
   ToggleModal:boolean
  }
export default function TaskDisplay({setToggleModal}:TaskDisplayProps){
    const [inputValue,setInputValue] = useState("Add task");
const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
        setInputValue(e.target.value);
}

 const handleOpenModal = ()=>{
        setToggleModal(true);
       
    }
    const handleCloseModal = () => {
        setToggleModal(false); // Zatvaranje modala
      };
    const [toggle,setToggle] = useState(true);
    const [menuButtonToggle,setMenuButtonToggle] = useState(Number);
    return(
        
        <div className="w-full flex  ">
            <div  className="task-list w-full md:w-2/4 md:border-r-4 border-blue-300 flex flex-col ">
                    <h3 className="pr-3 pl-3">Today</h3>
                    <div className="relative flex justify-between text-white items-center m-3 p-1 bg-blue-300 rounded-md z-0 group">
                       
         
                        <input className="absolute z-20 bg-transparent outline-none group-focus-within:outline-none placeholder-white" onChange={handleChange} onKeyDown={(e)=>{
                            if(e.key === "Enter"){
                                console.log(inputValue);
                            }
                        }} placeholder={inputValue}></input>
                       
                      
                        <div className="flex items-center z-10 group-focus-within:invisible">
                            <FontAwesomeIcon className={ inputValue == "" || inputValue == " " ? "" : "hidden"} icon={faPlus} height={15} width={15} ></FontAwesomeIcon>
                            <p  className="m-1">{inputValue == "" || inputValue == " " ? "Add task" : ""}</p>
                        </div>
                             <div className="flex items-center">
                                <FontAwesomeIcon className="m-1" onClick={handleOpenModal} icon={faCalendar} width={15} height={15}>
                                    </FontAwesomeIcon><FontAwesomeIcon icon={faArrowDown} width={15} height={15}></FontAwesomeIcon>
                        </div>
                        
                    </div>
                    <div className="flex justify-between  items-center m-3 p-1  text-blue-900 "><div className="flex items-center "><input type="checkbox" className="m-1"></input><p className="">Pera</p></div><p>Today</p></div>
            </div>  
            <div className="task-description w-2/4 hidden md:flex">
              <p>Pera</p>
            </div>
        </div>
    )
}