/* eslint-disable react/jsx-key */
'use client'
import {  faAngleLeft, faAngleRight, faClock, faRepeat, faSign } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

import "./style.css";
interface ModalProps{
    setActive:React.Dispatch<React.SetStateAction<boolean>>;
   
    isActive:boolean
    calendarDate:Date | null;
    setCalendarDate:React.Dispatch<React.SetStateAction<Date | null>>
}

export default function CalendarComponent({isActive,setActive,setCalendarDate}: ModalProps){
    

    const n =31;
    const RepeatOptions =['Daily','Weekly','Monthly','Yearly']
    const MonthNames = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]
    const [Year,setYear] = useState(new Date().getFullYear());
    const [Month,setMonth] = useState(new Date().getMonth());
    const [Day,setDay] = useState(new Date().getDate()-1);
    const ReminderOptions =['1 day early','2 days early','3 days early','4 days early']
  
    
  
    
    useEffect(()=>{
     
      
      setCalendarDate(new Date(`${Year}-${Month+1}-${Day+2}`));
      
    },[Year,Month,Day])
    
    return(
          <div className="flex flex-col justify-start">
          <div className="flex justify-center items-center">
          <FontAwesomeIcon icon={faAngleLeft} className="m-2" onClick={()=> setYear(e=>e-1)}></FontAwesomeIcon>
                <h3>{Year}</h3>
                <FontAwesomeIcon icon={faAngleRight} className="m-2" onClick={()=> setYear(e=>e+1)}></FontAwesomeIcon>
                </div>
                <div className="flex justify-start items-center">
                <FontAwesomeIcon icon={faAngleLeft} className="m-2" onClick={()=>Month > 0 ? setMonth(e=>e-1) : setMonth(11)}></FontAwesomeIcon>
                <h3 className="min-w-28 text-center">{MonthNames[Month]}</h3>
                <FontAwesomeIcon icon={faAngleRight} className="m-2" onClick={()=>Month < 11 ? setMonth(e=>e+1) : setMonth(0)}></FontAwesomeIcon>
                </div>
                <div className="grid grid-cols-7 ">
           
                  {
                     [...Array(n)].map((e,i) => <span onClick={()=>{
                       
                        setDay(i);
                        
                        
                        
                       
                    }}  className={i==Day ? "p-2 text-center bg-blue-400 text-white transition-all rounded-xl" : "p-2 text-center" } key={i}>{i+1}</span>)

                  }
                </div>
                
                  <div className="flex flex-col relative">
                    <div className="flex  justify-between items-center mt-2">
                        <FontAwesomeIcon icon={faClock} width={30} height={30}></FontAwesomeIcon>
                    <select className=" w-full items-center">
                        
                        <option className="w-dvw">Time</option>
                        {
                     
                     // eslint-disable-next-line react/jsx-key
                     RepeatOptions.map((e,i) => <option key={i}>{e}</option>)
                     
                   }
                    </select>
                    </div>
                    <div className="flex  justify-between items-center mt-2">
                        <FontAwesomeIcon icon={faSign} width={30} height={30}></FontAwesomeIcon>
                    <select className=" w-full items-center">
                        
                        <option className="w-dvw">Reminder</option>
                        {
                     
                     ReminderOptions.map((e,i) => <option key={i}>{e}</option>)
                     
                   }
                    </select>
                    </div>
                    <div className="flex  justify-between items-center mt-2">
                        <FontAwesomeIcon icon={faRepeat} width={30} height={30}></FontAwesomeIcon>
                    <select className=" w-full items-center">
                        
                        <option className="w-dvw">Repeat</option>
                        {
                     
                    RepeatOptions.map((e,i) => <option key={i}>{e}</option>)
                    
                  }
                     
                    </select>
                    </div>
                {/* <div className="flex justify-between items-center dugme " key="1">
                
                    <div className="flex justify-start items-center">
                    <FontAwesomeIcon icon={faClock} className="m-3 text-blue-400 " height={15} width={15}></FontAwesomeIcon> 
                    <p>Time</p>
                    </div> 
                    <FontAwesomeIcon icon={faAngleRight} className="m-3 text-blue-400 strelica" height={15} width={15}></FontAwesomeIcon> 
              
                </div> */}
        
                </div>
               
                <div className="flex w-full">
                    <button onClick={()=>{
                      setCalendarDate(new Date(`${Year}-${Month+1}-${Day+2}`));
                      
                        setActive(!isActive);
                        
                      
                       }}  className="bg-blue-400 w-2/4 m-2 p-1 rounded-md hover:bg-blue-500">OK</button>
                    <button onClick={()=>{
                        setActive(!isActive);
                      
                      
                        setCalendarDate(new Date(`${Year}-${Month+1}-${Day+2}`));
                        
                        
                    }
                        
                       } className="bg-white text-gray-500 border-gray-500 border-2 outline-none w-2/4 m-2 p-0.5 rounded-md hover:bg-gray-100">Cancel</button>
                </div>
          </div>      
    )
}