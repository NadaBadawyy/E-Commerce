import React from "react";
import style from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import back from '../../../public/back.svg'
export default function Layout() {
  return (
    <>
    <div  >
    <Nav/>
      <div className=" p-1 md:container py-5 my-5 m-auto text-center font-mono min-h-[80vh]">
        <Outlet />
      </div>
    </div>
      <Footer/>
     
    </>
  );
}
