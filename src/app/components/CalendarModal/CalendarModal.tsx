import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CalendarComponent from "../CalendarComponent/CalendarComponent";
import { useEffect, useState } from "react";

interface ModalProps{
    setActive:React.Dispatch<React.SetStateAction<boolean>>;
    isActive:boolean;
    DateInherited:Date;
    setDate:React.Dispatch<React.SetStateAction<Date>>;
}

export default function CalendarModal({isActive,setActive,DateInherited,setDate}: ModalProps){
    const [toggleModalCalendar,setToggleModalCalendar] = useState(false); 
    const [CalendarDate,setCalendarDate] = useState(new Date());
    useEffect(()=>{
        setDate(CalendarDate);
        console.log(CalendarDate);
    },[CalendarDate])
    return(
         <div className={isActive == true ? "flex absolute md:w-4/12 w-full md:translate-x-1/4   md:top-1/4  top-2/4 md:left-2/4  shadow-md rounded-md bg-white  bottom-2/4 m-auto h-fit " : " hidden"} >
                <div className=" inset-0 flex items-center align-middle justify-center w-full">
                    
                <div className="flex flex-col p-3 relative w-full h-full">
                    <h3 className="">Add list</h3>
                    
                    <div className="flex w-max">
                        <p>Folder</p>
                        <select>
                            <option>None</option>
                        </select>
                    </div>
                    <div className=" flex w-max ">
                        <p>Type</p>
                        <select>
                            <option>None</option>
                        </select>
                    </div>
                    <CalendarComponent calendarDate={CalendarDate} setCalendarDate={setCalendarDate} isActive={isActive} setActive={setActive} ></CalendarComponent>
               
                </div>
                   

                </div>
                </div>
    )
}