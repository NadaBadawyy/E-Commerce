import { useEffect, useState } from "react";
import { createContext } from "react";

export let UserContext=createContext()
export default function UserContextProvider(props){
    const [LoginData, setLoginData] = useState(null)
    useEffect(()=>{
        if(localStorage.getItem("Token")!=null)
            setLoginData(localStorage.getItem("Token"))
    },[])
    return <UserContext.Provider value={{LoginData,setLoginData}}>
        {props.children}
    </UserContext.Provider>

}