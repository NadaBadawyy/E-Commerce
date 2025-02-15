import React, { useContext } from 'react'
import style from './Nav.module.css'
import logo from '../../assets/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'
import { Navbar } from "flowbite-react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { WishlistContext } from '../../Context/WishlistContext'

export default function Nav() {
  let {noItems}=useContext(CartContext)
  let {favCount}=useContext(WishlistContext)
  let navigate=useNavigate()
  let {LoginData,setLoginData}=useContext(UserContext);
  function signOut(){
    localStorage.removeItem("Token");
    setLoginData(null);
    navigate('/login')
  }
  return (
    <>
      <Navbar fluid  className='fixed top-0 left-0 right-0 left-0 z-50 w-full  bg-[#FCFCFD]  shadow-md py-5 '>
        
        <div className= "md:justify-center md:items-center lg:justify-between md:flex-col lg:flex-row  w-full md:flex md:gap-y-10 flex-wrap ">
          <div className="md:flex justify-between items-center  ">
          <Navbar.Brand as={NavLink} to='/' >
          <div className="flex justify-between items-center w-full">
          <img src={logo} className="xl:ps-20 "   />
          <div className="px-5 "> <Navbar.Toggle /></div> 

          </div>
        
      </Navbar.Brand>
      <Navbar.Collapse >
        <Navbar.Link to="/" as={NavLink}   >
        <span className='hover:text-[#0AAD0A] text-base '>Home</span>
          
        </Navbar.Link>
        
        <Navbar.Link to="/products" as={NavLink} className=''> <span className='hover:text-[#0AAD0A] text-base '>Products</span> </Navbar.Link>
        <Navbar.Link to="/categories" as={NavLink} className=''> <span className='hover:text-[#0AAD0A] text-base '>Categories</span> </Navbar.Link>
        <Navbar.Link to="/brands" as={NavLink} className='  '> <span className=' hover:text-[#0AAD0A] text-base'>Brands</span> </Navbar.Link>
      </Navbar.Collapse>
          </div>
          <div className="pe-20 space-x-0">
          
      <Navbar.Collapse >
        {LoginData?<><Navbar.Link as={NavLink} to="/cart" className='' >
        <span className='relative hover:text-[#0AAD0A] text-base md:border-e md:p-3 md:mx-0 md:border-e-[#DEE2E6]  md:px-4 '>Cart <i class="fa-solid fa-cart-shopping "></i> {noItems>0&&<span className='absolute md:top-[5px] md:right-[5px] top-[-10px] right-[-10px] bg-[#0AAD0A] text-white w-[20px] h-[20px] rounded-full flex justify-center items-center'>{noItems}</span>}</span>
        </Navbar.Link>
        <Navbar.Link as={NavLink} to="/wishlist" className='' >
        <span className='relative hover:text-[#0AAD0A] text-base md:border-e md:p-3 md:mx-0 md:border-e-[#DEE2E6]  md:px-4'>Wishlist <i class="fa-solid fa-heart"></i> {favCount>0?<span className='absolute md:top-[5px] md:right-[5px] top-[-10px] right-[-10px] bg-[#0AAD0A] text-white w-[20px] h-[20px] rounded-full flex justify-center items-center'>{favCount}</span>:null}</span>
        </Navbar.Link> <p className='hover:text-[#0AAD0A] text-base py-3 ms-4 cursor-pointer md:py-0' onClick={signOut}>LogOut <i class="fa-solid fa-right-from-bracket"></i></p></>:<><Navbar.Link as={NavLink} to="/login" className='' >
        <span className='hover:text-[#0AAD0A] text-base md:border-e md:p-3 md:mx-0 md:border-e-[#DEE2E6]  md:px-4 '>Login</span>
        </Navbar.Link>
        <Navbar.Link as={NavLink} to="/register" className='' >
        <span className='hover:text-[#0AAD0A] text-base md:border-e md:p-3 md:mx-0 md:border-e-[#DEE2E6]  md:px-4'>register</span>
        </Navbar.Link></>}
        
        
        
       
        
      </Navbar.Collapse>
     
          </div>
        </div>
       
      
    </Navbar>
    </>
  )
}
