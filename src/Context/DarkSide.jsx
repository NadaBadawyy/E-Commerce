import React, { createContext, useState } from 'react'
import useDarkSide from '../Hooks/useDarkSide';
export let DarkSide=createContext()
export default function DarkSideProvider({children}) {
    const [colorTheme, setTheme] = useDarkSide();
        const [darkSide, setDarkSide] = useState(
            colorTheme === "light" ? true : false
        );
  return (
    <DarkSide.Provider value={{colorTheme,setTheme,darkSide,setDarkSide}}>
      {children}
    </DarkSide.Provider>
  )
}
