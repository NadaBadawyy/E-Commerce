import { useContext, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "../../Hooks/useDarkSide";
import { DarkSide } from "../../Context/DarkSide";


export default function Switcher() {
    const {colorTheme,setTheme,darkSide,setDarkSide}=useContext(DarkSide)

    const toggleDarkMode = (checked) => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };

    return (
        <>
          <div className="flex justify-center items-center  p-2  rounded-full  ">
          <DarkModeSwitch 
                
                checked={darkSide}
                onChange={toggleDarkMode}
                size={22}
                sunColor="#0AAD0A"
            />
          </div>

            
        </>
    );
}
