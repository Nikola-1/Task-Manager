'use client'
import { faAngleDown, faCircle, faCubesStacked, faEllipsis, faGripVertical, faPlus, faSmile } from "@fortawesome/free-solid-svg-icons";
import { faCubes } from "@fortawesome/free-solid-svg-icons/faCubes";
import { faListDots } from "@fortawesome/free-solid-svg-icons/faListDots";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState,Component } from "react";
import HabitsList from "@/app/components/HabitComponent/HabitList/HabitList.tsx";


export default function HabitsPage(){
      return(
        <HabitsList></HabitsList>
      )  

    
}