import React, { useContext, useEffect, useState } from 'react'
import style from './Profile.module.css'
import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import { Link } from 'react-router-dom';
import { TokenContex } from '../../Context/TokenContext';
import { UserContext } from '../../Context/UserContext';
import Login from '../Login/Login';
import { Helmet } from 'react-helmet';
export default function Profile() {
  const [userData, setuserData] = useState(null)
    let {decodedToken}=useContext(TokenContex)
     let {LoginData}=useContext(UserContext);
  async function getuserData(){
      let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/users/${decodedToken?.id}`);
    setuserData(res.data.data)
    
  }
  useEffect(()=>{
    getuserData();
  },[LoginData])
  return (
    <>
    <Helmet>
        <title>{userData?.name}</title>
      </Helmet>
      <div className="my-24">
        
        <form class=" max-w-xl m-auto">
          <div className="p-16 bg-[#F8F9FA] dark:bg-[#1F2937] rounded-2xl shadow-2xl">
          <h2 className="text-center text-[#0AAD0A] font-mono font-bold text-2xl my-3 capitalize">my profile</h2>
            <div class="mb-5">
              <label
                for="name"
                className="block mb-2 text-lg  font-medium text-gray-900 text-left text-[#0AAD0A] dark:text-white"
              >
                Your Name:
              </label>
              <input
              value={userData?.name}
                type="text"
                name="name"
                id="name"
                class="bg-white border focus:!border-[#0AAD0A] focus:border-2 text-gray-900 text-sm rounded-lg  block w-full"
                
                disabled
              />
           
            </div>
            <div class="mb-5">
              <label
                for="email"
                className="block mb-2 text-lg  font-medium text-gray-900 text-left text-[#0AAD0A] dark:text-white"
              >
                Your Email:
              </label>
              <input
              value={userData?.email}
                type="email"
                name="email"
                id="email"
                class="bg-white border focus:!border-[#0AAD0A] focus:border-2 text-gray-900 text-sm rounded-lg  block w-full"
                
                disabled
              />
           
            </div>
            <div class="mb-5">
              <label
                for="phone"
                className="block mb-2 text-lg  font-medium text-gray-900 text-left text-[#0AAD0A] dark:text-white"
              >
                Your Phone:
              </label>
              <input
              value={userData?.phone}
                type="tel"
                name="phone"
                id="phone"
                class="bg-white border focus:!border-[#0AAD0A] focus:border-2 text-gray-900 text-sm rounded-lg  block w-full"
                
                disabled
              />
           
            </div>
           
           <Link to={`/profile/change-profile`}>
           <button
              type="submit"
              class="text-white my-3 w-full md:w-auto bg-[#0AAD0A]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md me-3 mx-auto px-5 py-2.5 text-center "
            >
             <span>Update Data <i class="fa-solid fa-pen"></i></span>
            </button>
          </Link>
           <Link to={`/profile/change-password`}>
           <button
              type="submit"
              class="text-white w-full md:w-auto bg-[#0AAD0A]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md mx-auto px-5 py-2.5 text-center "
            >
             <span>Change Password <i class="fa-solid fa-key"></i></span>
            </button>
           </Link>
           
           
          </div>
        </form>
      </div>
    </>
  )
}
