import React, { useEffect, useRef } from 'react'

export function OptionsMenu({options,open,x,y,closeMenu}:{
    options:{label:string; action:()=> void} [];
    open:boolean;
    x:number;
    y:number;
    closeMenu:()=>void;
    
}) {
    if(!open) return null;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const divRef = useRef<HTMLDivElement>(null);
    useEffect(()=>{
      if(!open) return
      const handelClickOutside = (e:MouseEvent) =>{
            if(divRef.current && !divRef.current.contains(e.target as Node)){
              closeMenu();
            }
      }
      document.addEventListener("mousedown",handelClickOutside);

      return () => {
        document.removeEventListener("mousedown",handelClickOutside);
      };
  
    },[open]);


    return (
        <div ref={divRef} onClick={(e)=> e.stopPropagation()}
      className="fixed  z-20  bg-white shadow-lg rounded-xl p-2 flex flex-col gap-1"
      style={{
        top:y,
        left:x
      }}
      
    >
      {options.map((opt) => (
        <button
          key={opt.label}
          onClick={opt.action}
          className="px-3 py-2 rounded-md hover:bg-gray-100 text-left text-sm"
        >
          {opt.label}
        </button>
      ))}
    </div>
    )
}

