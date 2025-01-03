import Nav from "./components/fixed/nav";
import Task from "./components/TaskComponent/Task";


export default function Home() {
  return (
    <>
        <div className="flex md:flex-row flex-col justify-center items-center  md:justify-start w-dvw" id="root">
        <Nav></Nav>
        <Task></Task>
        </div>
    </>
  );
}
