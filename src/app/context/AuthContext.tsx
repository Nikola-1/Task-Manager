"use client";
import { createContext,useContext,useState,ReactNode } from 'react'
import { UserType } from '../components/TaskComponent/Types/UserType';

interface AuthContextType {
    user:UserType | null;
    setUser: (user:UserType | null)=> void;
    loggedIn: boolean;
    setLoggedIn:(loggedIn:boolean) => void;
    DisplayTasks:boolean;
     setDisplayTasks:(DisplayTasks:boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children:ReactNode}){
    const [user,setUser] = useState<UserType|null>(null);
    const [loggedIn,setLoggedIn] = useState(false);
    const [DisplayTasks,setDisplayTasks] = useState(false);

    
  return (
    <AuthContext.Provider value = {{user, setUser,loggedIn,setLoggedIn,DisplayTasks,setDisplayTasks}}>
            {children}
        </AuthContext.Provider>
  )
}

export function useAuth(){
    const context = useContext(AuthContext);
    if(!context) throw new Error("useAuth mora biti koriscen unutar AuthProvider-a");
    return context;
}

