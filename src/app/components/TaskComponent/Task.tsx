import Image from "next/image"
import Today from "../../../assets/img/october.png"
import SevenDays from "../../../assets/img/7-days.png"
import message from "../../../assets/img/message-alert.png"
import briefCase from "../../../assets/img/3d-briefcase.png"
import music from "../../../assets/img/3d-music.png"
import paperBag from "../../../assets/img/3d-paper-bag.png"
export default function Task(){
    return(
<div className="Task-menu border-blue-300 border-r-2 border-l-2">
        <div className="task-menu-wrapper w-64   h-screen  ">
            <div className="Task-intervals ">
                <ul className=" p-3">
                    <li className="flex flex-row justify-between align-middle p-1 bg-blue-300   items-center text-blue-900">
                        <div className="flex flex-row align-middle items-center "><Image src={Today} width={30} height={20} alt="Calendar with number on it"></Image> <p className="m-2">Today</p> </div> <p>3</p>
                    </li>
                    <li className="flex justify-between  p-1   items-center text-blue-900">
                        <div className="flex flex-row align-middle items-center"><Image src={SevenDays} width={30} height={20} alt="Calendar with number on it"></Image><p className="m-2">7 days</p> </div> <p>3</p>
                    </li>
                    <li className="flex justify-between   p-1   items-center text-blue-900">
                        <div className="flex flex-row align-middle items-center"><Image src={message} width={30} height={20} alt="Calendar with number on it"></Image><p className="m-2">Inbox</p> </div> <p>3</p>
                    </li>
                    <hr className="border-blue-300 border-t-2 mt-3"></hr>
                </ul>

                
            </div>
            <div className="Task-intervals ">
                <div className="flex">
                <h5 className="text-blue-900 font-bold m-3 p-0.5">List</h5>
                <p className="bg-blue-300 w-fit m-3 p-0.5 text-blue-900">Used: 8/9</p>
                </div>
                <ul className=" p-3">
                    <li className="flex flex-row justify-between align-middle p-1 bg-blue-300   items-center text-blue-900">
                        <div className="flex flex-row align-middle items-center "><Image src={briefCase} width={20} height={10} alt="Calendar with number on it"></Image> <p className="m-2">Today</p> </div> <p>3</p>
                    </li>
                    <li className="flex flex-row justify-between align-middle p-1    items-center text-blue-900">
                        <div className="flex flex-row align-middle items-center "><Image src={music} width={20} height={10} alt="Calendar with number on it"></Image> <p className="m-2">Music</p> </div> <p>2</p>
                    </li>
                    <li className="flex flex-row justify-between align-middle p-1  items-center text-blue-900">
                        <div className="flex flex-row align-middle items-center "><Image src={paperBag} width={20} height={10} alt="Calendar with number on it"></Image> <p className="m-2">Shopping</p> </div> <p>1</p>
                    </li>
                </ul>

                
            </div>
        </div>
    </div>
    )
    
}