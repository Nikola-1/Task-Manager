


import "./task.css";
import TaskDisplay from "./TaskDisplay/TaskDisplay";
import TaskMenu from "./TaskMenu/TaskMenu";

export default function Task(){
  
    return(
       <div className="flex w-full">
        <TaskMenu></TaskMenu>
        <TaskDisplay></TaskDisplay>

    
    </div>
    )

}

