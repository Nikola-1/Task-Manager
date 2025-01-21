import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ListModal(){
    return(
        <div className="absolute w-full top-2/4 left-0">
        <div className=" inset-0 flex items-center justify-center w-full">
        <div className="flex flex-col">
            <h3>Add list</h3>
            <div className="flex">
                <FontAwesomeIcon icon={faSmile} className="cursor-pointer hover:bg-blue-900 hover:border-blue-900 text-white bg-blue-300 border-blue-300 border-2  p-1 rounded-l-md" width={20} height={20}></FontAwesomeIcon>
                <input type="text" className=" border-blue-300 border-2 rounded-r-md border-l-0 outline-none indent-1"></input>
            </div>
            <div className="flex">
                <p>Folder</p>
                <select>
                    <option>None</option>
                </select>
            </div>
        </div>
        </div>
        </div>
    )
}