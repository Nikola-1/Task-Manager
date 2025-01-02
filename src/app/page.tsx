import Nav from "./components/fixed/nav";
import Task from "./components/TaskComponent/Task";


export default function Home() {
  return (
    <>
        <div className="flex justify-start w-dvw">
        <Nav></Nav>
        <Task></Task>
        </div>
    </>
  );
}
