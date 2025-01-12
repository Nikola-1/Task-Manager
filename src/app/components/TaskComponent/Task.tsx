



import TaskDisplay from "./TaskDisplay/TaskDisplay";
import TaskMenu from "./TaskMenu/TaskMenu";

export default function Task(){

    return(
       <div className="flex md:flex-row flex-col w-full ">
        <TaskMenu></TaskMenu>
        <TaskDisplay></TaskDisplay>
    
    
    </div>
    )

}

