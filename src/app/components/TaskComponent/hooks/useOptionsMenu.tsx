import  { useState } from 'react'

export default function useOptionsMenu(name: string, handlers:Record<string, ()=>void>){
    const [open,setOpen] = useState(false);
    const toggleMenu = () => setOpen((p)=> !p);


    const options = Object.entries(handlers).map(([label,action]) => ({
        label: `${label} ${name}`,
        action,
    }));

    return {open,toggleMenu,setOpen,options};

 
  
}


