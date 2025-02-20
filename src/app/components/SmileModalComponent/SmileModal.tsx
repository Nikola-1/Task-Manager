import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import icon from "../../../assets/img/3d-briefcase.png"
interface ModalProps{
    setActive:React.Dispatch<React.SetStateAction<boolean>>;
    isActive:boolean
}
export default function SmileModal({isActive,setActive}: ModalProps){
    return(
         <div className={isActive == true ? "flex absolute   w-full     top-4/4   shadow-md rounded-md bg-white   m-auto h-48  " : " hidden"} >
                <div className=" inset-0 flex items-center align-middle justify-center w-fit">
                    
                <div className="flex flex-col p-3 relative w-fit h-full ">
                  
                    <div className="grid xl:grid-cols-12 grid-cols-5  gap-4 h-32 mb-3 overflow-scroll">
                                <img src="/img/3d-music.png" height={30} width={30}></img>
                                <img src="/img/3d-paper-bag.png" height={30} width={30}></img>
                                <img src="/img/3d-briefcase.png" height={30} width={30}></img>
                                <img src="/img/3d-music.png" height={30} width={30}></img>
                                <img src="/img/3d-paper-bag.png" height={30} width={30}></img>
                                <img src="/img/3d-briefcase.png" height={30} width={30}></img>
                                <img src="/img/3d-music.png" height={30} width={30}></img>
                                <img src="/img/3d-paper-bag.png" height={30} width={30}></img>
                                <img src="/img/3d-briefcase.png" height={30} width={30}></img>
                    </div>
                   
                   
                    <div onClick={()=> setActive(!isActive)} className="hover:bg-blue-300  hover:text-white hover:cursor-pointer float-right w-fit  bottom-0 p-2 m-1 border-2 text-blue-300 border-blue-300 rounded-md ">
                        <p className="">cancel</p>
                    </div>
                </div>
                   
               
                </div>
                </div>
    )
}