"use client";
import { createContext,useContext,useState,ReactNode } from 'react'
import { UserType } from '../components/TaskComponent/Types/UserType';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user:UserType | null;
    setUser: (user:UserType | null)=> void;
    loggedIn: boolean;
    logout: () => void;
    setLoggedIn:(loggedIn:boolean) => void;
    DisplayTasks:boolean;
     setDisplayTasks:(DisplayTasks:boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children:ReactNode}){
    const [user,setUser] = useState<UserType|null>(null);
    const [loggedIn,setLoggedIn] = useState(false);
    const [DisplayTasks,setDisplayTasks] = useState(false);
    const router = useRouter();

     const logout = async () => {
    await router.push("/login");
    setUser(null);
    setLoggedIn(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
 
  };


  return (
    <AuthContext.Provider value = {{user, setUser,loggedIn,setLoggedIn,DisplayTasks,setDisplayTasks,logout}}>
            {children}
        </AuthContext.Provider>
  )
}

export function useAuth(){
    const context = useContext(AuthContext);
    if(!context) throw new Error("useAuth mora biti koriscen unutar AuthProvider-a");
    return context;
}

