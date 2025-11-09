"use client";
import { createContext,useContext,useState,ReactNode } from 'react'

interface AuthContextType {
    user:object | null;
    setUser: (user:object | null)=> void;
    loggedIn: boolean;
    setLoggedIn:(loggedIn:boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children:ReactNode}){
    const [user,setUser] = useState<object|null>(null);
    const [loggedIn,setLoggedIn] = useState(false);


    
  return (
    <AuthContext.Provider value = {{user, setUser,loggedIn,setLoggedIn}}>
            {children}
        </AuthContext.Provider>
  )
}

export function useAuth(){
    const context = useContext(AuthContext);
    if(!context) throw new Error("useAuth mora biti koriscen unutar AuthProvider-a");
    return context;
}

