import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function TaskDisplay(){
    return(
        <div className="w-full flex  ">
            <div  className="task-list w-full md:w-2/4 md:border-r-4 border-blue-300 flex flex-col">
                    <h3 className="pr-3 pl-3">Today</h3>
                    <div className="flex justify-between text-white items-center m-3 p-1 bg-blue-300 rounded-md">
                        
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faPlus} height={15} width={15}></FontAwesomeIcon>
                            <p className="m-1">Add Task</p>
                        </div>
                             <div className="flex items-center">
                                <FontAwesomeIcon className="m-1" icon={faCalendar} width={15} height={15}>
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