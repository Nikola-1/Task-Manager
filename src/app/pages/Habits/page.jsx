import { faAngleDown, faCircle, faCubesStacked, faEllipsis, faGripVertical, faPlus, faSmile } from "@fortawesome/free-solid-svg-icons";
import { faCubes } from "@fortawesome/free-solid-svg-icons/faCubes";
import { faListDots } from "@fortawesome/free-solid-svg-icons/faListDots";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HabitsPage(){
    return(
     <div className="flex flex-col items-start w-dvw  content-center overflow-hidden">
     <div className="Habits-navbar flex flex-row  justify-between w-full ">
           <div className="flex flex-row items-center ">
            <h3 className="text-2xl m-3">Habit</h3>
            <FontAwesomeIcon icon={faAngleDown} width={30} height={30} className="text-2xl "></FontAwesomeIcon>
           </div>
           <div className="Habit-Settings">
                <FontAwesomeIcon icon={faGripVertical} width={30} height={30} className="text-2xl m-3"></FontAwesomeIcon>
                <FontAwesomeIcon icon={faPlus} width={30} height={30} className="text-2xl m-3"></FontAwesomeIcon>
                <FontAwesomeIcon icon={faEllipsis} width={50} height={30} className="text-2xl m-3"></FontAwesomeIcon>
           </div>
     </div>
        <div className="Habits-week flex m-auto md:m-0 "> {/*Slajder napraviti*/}
                <div className="flex">
                        <div className="flex flex-col items-center justify-center bg-blue-300 rounded-md p-3 m-2">
                                    <h3>Sun</h3>
                                    <p>5</p>
                                    <FontAwesomeIcon icon={faCircle} > </FontAwesomeIcon>
                        </div>
                </div>
                <div className="flex">
                        <div className="flex flex-col items-center justify-center bg-blue-300 rounded-md p-3 m-2">
                                    <h3>Sun</h3>
                                    <p>5</p>
                                    <FontAwesomeIcon icon={faCircle} > </FontAwesomeIcon>
                        </div>
                </div>
                <div className="flex">
                        <div className="flex flex-col items-center justify-center bg-blue-300 rounded-md p-3 m-2">
                                    <h3>Sun</h3>
                                    <p>5</p>
                                    <FontAwesomeIcon icon={faCircle} > </FontAwesomeIcon>
                        </div>
                </div>
                <div className="flex">
                        <div className="flex flex-col items-center justify-center bg-blue-300 rounded-md p-3 m-2">
                                    <h3>Sun</h3>
                                    <p>5</p>
                                    <FontAwesomeIcon icon={faCircle} > </FontAwesomeIcon>
                        </div>
                </div>
                <div className="flex ">
                        <div className="flex flex-col items-center justify-center bg-blue-300 rounded-md p-3 m-2">
                                    <h3>Sun</h3>
                                    <p>5</p>
                                    <FontAwesomeIcon icon={faCircle} > </FontAwesomeIcon>
                        </div>
                </div>
                <div className="flex">
                        <div className="flex flex-col items-center justify-center bg-blue-300 rounded-md p-3 m-2">
                                    <h3>Sun</h3>
                                    <p>5</p>
                                    <FontAwesomeIcon icon={faCircle} > </FontAwesomeIcon>
                        </div>
                </div>
                <div className="flex">
                        <div className="flex flex-col items-center justify-center bg-blue-300 rounded-md p-3 m-2">
                                    <h3>Sun</h3>
                                    <p>5</p>
                                    <FontAwesomeIcon icon={faCircle} > </FontAwesomeIcon>
                        </div>
                </div>
        </div>
        <div className="Habits flex flex-col md:w-6/12  w-11/12 m-auto md:m-0">
                <div className="row1 flex flex-col w-full">
                 
                        <div className="flex items-center justify-start m-3">
                            <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                            <h3 className="mr-2">Morning</h3>
                            <p>1</p>
                        </div>
                        <div className="flex items-center w-full mt-1 mx-2 p-3 rounded-xl bg-blue-300">
                                <FontAwesomeIcon icon={faSmile} className="text-xl p-1 m-1 bg-blue-900 rounded-xl text-white"></FontAwesomeIcon>
                        </div>
                </div>
                <div className="row1 flex flex-col w-full">
                 
                        <div className="flex items-center justify-start m-3">
                            <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                            <h3 className="mr-2">Morning</h3>
                            <p>1</p>
                        </div>
                        <div className="flex items-center w-full mt-1 mx-2 p-3 rounded-xl bg-blue-300">
                                <FontAwesomeIcon icon={faSmile} className="text-xl p-1 m-1 bg-blue-900 rounded-xl text-white"></FontAwesomeIcon>
                        </div>
                </div>
            </div>
            <div>
            
            </div>
     </div>   
    )
}