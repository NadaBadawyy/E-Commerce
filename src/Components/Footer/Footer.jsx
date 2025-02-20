import React from "react";
import style from "./Footer.module.css";
export default function Footer() {
  return (
    <>
      <footer className=" p-5  bg-[#F8F9FA] font-mono ">
        <div className=" flex justify-center items-center flex-col md:flex-row md:justify-around gap-y-2">
          <h2 className="capitalize text-2xl ">made by <span className="text-[#0AAD0A] font-bold">Nada Badawy</span> </h2>
          <div className="social media flex gap-x-4 text-xl">
          <a href="https://web.facebook.com/nada.badawy.790" target="_plank"><i class="fa-brands fa-facebook hover:text-[#0AAD0A]"></i></a>
          <a href="https://www.linkedin.com/in/nada-badawy-3027b6298/" target="_plank"><i class="fa-brands fa-github hover:text-[#0AAD0A]" ></i></a>
          <a href="https://github.com/NadaBadawyy" target="_plank"><i class="fa-brands fa-linkedin hover:text-[#0AAD0A]"></i></a>
          <a href="mailto:nadabadawy505@gmail.com" target="_plank"><i class="fa-solid fa-envelope hover:text-[#0AAD0A]"></i></a>
          
          
          
          

          </div>
        </div>

      </footer>
    </>
  );
}
