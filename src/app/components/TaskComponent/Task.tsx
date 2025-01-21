



import TaskDisplay from "./TaskDisplay/TaskDisplay";
import TaskMenu from "./TaskMenu/TaskMenu";

import ListModal from "./ListModal/ListModal";
export default function Task(){

    return(
       <div className="flex md:flex-row flex-col w-full ">
        <TaskMenu></TaskMenu>
        <TaskDisplay></TaskDisplay>
        <ListModal></ListModal>
    
    </div>
    )

}

