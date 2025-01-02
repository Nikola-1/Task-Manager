/* eslint-disable @next/next/no-img-element */
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";
import menu from "../../../assets/img/menu.png";
import Image from "next/image";
import user from "../../../assets/img/user.png"
import Calendar from "../../../assets/img/calendar.png";
import sync from "../../../assets/img/sync.png";
import clock from "../../../assets/img/clock.png";
export default function Nav(){
    return(
        <div className="nav float-left w-36  bg-blue-300 h-screen">
             <div className="wrapper m-auto w-24 ">
                <ul className="flex flex-col justify-center align-middle ">
                    {/* <li><FontAwesomeIcon icon={faUser} width={30} height={30} /></li> */}
                    <li className="m-3 flex justify-center align-middle"><Image src={user} alt="user image"  width={40} height={40} /></li>
                    <li className="m-3 flex justify-center align-middle"><Image src={menu} alt="Meni image"  width={40} height={40} /></li>
                    <li className="m-3 flex justify-center align-middle"><Image src={Calendar} alt="Calendar image"  width={40} height={40} /></li>
                    <li className="m-3 flex justify-center align-middle"><Image src={sync} alt="sync image"  width={40} height={40} /></li>
                    <li className="m-3 flex justify-center align-middle"><Image src={clock} alt="clock image"  width={40} height={40} /></li>
                    <hr className="text-blue-900 border-blue-900 "></hr>
                </ul>
             </div>
        </div>
    )
}