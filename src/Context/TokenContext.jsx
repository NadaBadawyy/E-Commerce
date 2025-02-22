import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import React from 'react'
import { UserContext } from "./UserContext";
export let TokenContex=createContext()

export default function TokenContextProvider({children}) {
    
    let {LoginData}=useContext(UserContext);
    
    const [decodedToken, setdecodedToken] = useState(null);
    useEffect(()=>{
        
      
            const token = localStorage.getItem('Token')? localStorage.getItem('Token'):'';
            if(token!=''){
                const decoded = jwtDecode(token);
            setdecodedToken(decoded) 
            }
           
      
               
    },[LoginData])
  return (
    <TokenContex.Provider value={{setdecodedToken,decodedToken}}>
        {children}
      
    </TokenContex.Provider>
  )
}
