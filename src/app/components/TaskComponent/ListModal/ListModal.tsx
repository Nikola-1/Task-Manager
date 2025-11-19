
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import SmileModal from "../../SmileModalComponent/SmileModal";
import { supabase } from "@/app/connection/supabaseclient";
import { useAuth } from "@/app/context/AuthContext";


interface ModalProps{
    setActive:React.Dispatch<React.SetStateAction<boolean>>;
    isActive:boolean
    onUpdate: React.Dispatch<React.SetStateAction<void>>;
}
export default function ListModal({isActive,setActive,onUpdate}: ModalProps){
    const [toggleModalCalendar,setToggleModalCalendar] = useState(false); 
    const [nameCategory,setnameCategory] = useState<string>("");
    const [ActiveSticker,setActiveSticker] = useState<object | null>();
    const {user} = useAuth();

      const handleSave = () => {
    // npr. kada korisnik klikne "Save"
    onUpdate(); // ovo izaziva rerender TaskList-a
  };
    async function AddListItem(){
        const {error} = await supabase.from('Categories').insert({image:ActiveSticker?.sticker_path,name:nameCategory,user_id:user?.id});
        if(error){
            console.log(error);
            
        }
        else{
            console.log('uspesno dodato');
            handleSave();
        }
    }
    
    return(
        <div className={isActive == true ? "flex absolute w-8/12 translate-x-1/4  top-2/4 left-0 shadow-md rounded-md bg-white  bottom-2/4 m-auto h-2/4  " : " hidden"} >
        <div className=" inset-0 flex items-center align-middle justify-center w-full">
            <div className="flex  justify-between w-full h-full relative">
        <div className="flex flex-col p-3 relative  xl:w-full ">
            <h3>Add list</h3>
            <div className="flex flex-col w-full">
                <div className="flex w-full">
                {ActiveSticker != null ? <Image onClick={()=> toggleModalCalendar ? setToggleModalCalendar(false) : setToggleModalCalendar(true)} src={"/img/"+ActiveSticker?.sticker_path+".png"} width={30} height={30}  className="cursor-pointer hover:bg-blue-900 hover:border-blue-900 text-white bg-blue-300 border-blue-300 border-2  p-1 rounded-l-md" alt="Sticker_image" />  : <FontAwesomeIcon icon={faSmile} onClick={()=> toggleModalCalendar ? setToggleModalCalendar(false) : setToggleModalCalendar(true)} className="cursor-pointer hover:bg-blue-900 hover:border-blue-900 text-white bg-blue-300 border-blue-300 border-2  p-1 rounded-l-md" width={20} height={20}></FontAwesomeIcon> }
                <input onChange={(e)=>setnameCategory(e.currentTarget.value)} type="text" className=" border-blue-300 border-2 rounded-r-md border-l-0 outline-none indent-1  w-full"></input>
                </div>
                <div className="relative">
                <SmileModal ActiveStickerProp={ActiveSticker} setActiveStickerProp={setActiveSticker} isActive={toggleModalCalendar} setActive={setToggleModalCalendar}></SmileModal>
                </div>
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
            <div onClick={()=>{
                setActive(!isActive);
                setActiveSticker(null);
            } } className="hover:bg-blue-300  hover:text-white hover:cursor-pointer float-right absolute bottom-0 p-2 m-1 border-2 text-blue-300 border-blue-300 rounded-md ">
                <p className="">Close</p>
            </div>
            <div onClick={async()=>{
            AddListItem();
               
            } } className="hover:bg-blue-300  hover:text-white hover:cursor-pointer float-right w-fit bottom-0 p-2 m-1 border-2 text-blue-300 border-blue-300 rounded-md ">
                <p className="">Add</p>
            </div>
        </div>
            <div className="w-2/4 h-full bg-blue-800 rounded-r-md"></div>
          
        </div>
        </div>
        </div>
    )
}