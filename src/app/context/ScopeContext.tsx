'use client'
import { useParams } from 'next/navigation';

import React, { Children, useEffect } from 'react'
import { createContext } from 'react'


interface ScopeContextType { //definisem oblike podatka u contextu
  
    groupId: number | null;
    setGroupId: (groupId: number | null) => void; 
   
}

const ScopeContext = createContext<ScopeContextType | undefined>(undefined); // inicijalizujem context
export const ScopeProvider = ({ children }: { children: React.ReactNode }) => { // pravim provider komponentu koja ce obaviti context
          const params = useParams<{ group?: string }>();

   
    
    const [groupId,setGroupId] = React.useState<number | null>(null); // inicijalizujem state koji cu da delim kroz context opet
    
    useEffect(()=>{
    
       const g = params?.group;
         if(g){
         
                setGroupId(parseInt(g));
            }else{
                
                setGroupId(null);
            }
            console.log(params?.group);
            
    },[params?.group])
   
  return (
    <ScopeContext.Provider value={{groupId,setGroupId}}> {/* prosledjujem state kroz context */}
    {children}
    </ScopeContext.Provider>
  )
}
export function useScope(){
    const context = React.useContext(ScopeContext);
    if(!context) throw new Error("useScope mora biti koriscen unutar ScopeProvider-a");
    return context;
}
