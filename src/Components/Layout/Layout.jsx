import React, { useContext, useEffect } from "react";
import style from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import back from '../../../public/back.svg'
import { DarkSide } from "../../Context/DarkSide";
export default function Layout() {
  const {colorTheme,setTheme,darkSide,setDarkSide}=useContext(DarkSide);
  useEffect(()=>{
    if(window.matchMedia("(prefers-color-scheme: dark)").matches){
      window.document.documentElement.classList.add('dark')
      setDarkSide(true);
      setTheme('dark');
    }
  },[])
  return (
    <>
    <div >
    <Nav/>
      <div className="p-1 md:p-8 py-5 my-5 m-auto text-center font-mono min-h-[85vh]">
        <Outlet />
      </div>
    </div>
      <Footer/>
     
    </>
  );
}
