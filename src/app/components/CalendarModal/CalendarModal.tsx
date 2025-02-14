import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ModalProps{
    setActive:React.Dispatch<React.SetStateAction<boolean>>;
    isActive:boolean
}
export default function CalendarModal({isActive,setActive}: ModalProps){
    return(
         <div className={isActive == true ? "flex absolute md:w-4/12 w-full md:translate-x-1/4   md:top-1/4  top-2/4 md:left-2/4  shadow-md rounded-md bg-white  bottom-2/4 m-auto h-2/4  " : " hidden"} >
                <div className=" inset-0 flex items-center align-middle justify-center w-full">
                    
                <div className="flex flex-col p-3 relative w-full h-full">
                    <h3>Add list</h3>
                    <div className="flex w-full ">
                        <FontAwesomeIcon icon={faSmile} className="cursor-pointer hover:bg-blue-900 hover:border-blue-900 text-white bg-blue-300 border-blue-300 border-2  p-1 rounded-l-md" width={20} height={20}></FontAwesomeIcon>
                        <input type="text" className=" border-blue-300 border-2 rounded-r-md border-l-0 outline-none indent-1"></input>
                    </div>
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
                    <div onClick={()=> setActive(!isActive)} className="hover:bg-blue-300  hover:text-white hover:cursor-pointer float-right absolute bottom-0 p-2 m-1 border-2 text-blue-300 border-blue-300 rounded-md ">
                        <p className="">cancel</p>
                    </div>
                </div>
                   
               
                </div>
                </div>
    )
}