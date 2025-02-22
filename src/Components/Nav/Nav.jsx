import React, { useContext } from "react";
import style from "./Nav.module.css";
import logo from "../../assets/freshcart-logo.svg";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { Navbar } from "flowbite-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { WishlistContext } from "../../Context/WishlistContext";
import { MegaMenu } from "flowbite-react";
import { jwtDecode } from "jwt-decode";
import { TokenContex } from "../../Context/TokenContext";
import Switcher from "../Switcher/Switcher";
export default function Nav() {
  let { noItems } = useContext(CartContext);
  let { favCount } = useContext(WishlistContext);
  let navigate = useNavigate();
  let {decodedToken}=useContext(TokenContex)
  let { LoginData, setLoginData } = useContext(UserContext);
 
  function signOut() {
    localStorage.removeItem("Token");
    setLoginData(null);
    navigate("/login");
  }
  return (
    <>
     <Navbar
        fluid
        className="fixed top-0 left-0 right-0 z-50 w-full  bg-[#FCFCFD] dark:bg-gray-900 shadow-md py-5 ">
        <div className="md:justify-center md:items-center lg:justify-between md:flex-col lg:flex-row  w-full md:flex md:gap-y-10 flex-wrap ">
          <div className="md:flex justify-between items-center  ">
            <Navbar.Brand as={NavLink} to="/">
              <div className="flex justify-between items-center w-full">
                <div className="flex justify-center items-center ">
                  <img src={logo} className="xl:ps-20 dark:invert" />
                  <Switcher/>
                </div>
                
                <div className="ps-3 ">
                  
                  <Navbar.Toggle />
                </div>
              </div>
            </Navbar.Brand>
            <Navbar.Collapse>
              <Navbar.Link to="/" as={NavLink} className="text-black dark:text-white">
                <span className="hover:text-[#0AAD0A] text-base ">Home</span>
              </Navbar.Link>

              <Navbar.Link to="/products" as={NavLink} className="text-black dark:text-white">
                {" "}
                <span className="hover:text-[#0AAD0A] text-base ">
                  Products
                </span>{" "}
              </Navbar.Link>
              <Navbar.Link to="/categories" as={NavLink} className="text-black dark:text-white">
                {" "}
                <span className="hover:text-[#0AAD0A] text-base ">
                  Categories
                </span>{" "}
              </Navbar.Link>
              <Navbar.Link to="/brands" as={NavLink} className="text-black dark:text-white">
                {" "}
                <span className=" hover:text-[#0AAD0A] text-base">
                  Brands
                </span>{" "}
              </Navbar.Link>
            </Navbar.Collapse>
          </div>
          <div className="pe-20 space-x-0 lg:block">
            <Navbar.Collapse>
              {LoginData ? (
                <>
                  <Navbar.Link as={NavLink} to="/cart" className="text-black dark:text-white">
                    <span className="relative hover:text-[#0AAD0A] text-base md:border-e md:p-3 md:mx-0 md:border-e-[#DEE2E6]  md:px-4 ">
                      Cart <i className="fa-solid fa-cart-shopping "></i>{" "}
                      {noItems > 0 && (
                        <span className="absolute md:top-[5px] md:right-[5px] top-[-10px] right-[-10px] bg-[#0AAD0A] text-white w-[20px] h-[20px] rounded-full flex justify-center items-center">
                          {noItems}
                        </span>
                      )}
                    </span>
                  </Navbar.Link>
                  <Navbar.Link as={NavLink} to="/wishlist" className="text-black dark:text-white">
                    <span className="relative hover:text-[#0AAD0A] text-base md:border-e md:p-3 md:mx-0 md:border-e-[#DEE2E6]  md:px-4">
                      Wishlist <i className="fa-solid fa-heart"></i>{" "}
                      {favCount > 0 ? (
                        <span className="absolute md:top-[5px] md:right-[5px] top-[-10px] right-[-10px] bg-[#0AAD0A] text-white w-[20px] h-[20px] rounded-full flex justify-center items-center">
                          {favCount}
                        </span>
                      ) : null}
                    </span>
                  </Navbar.Link>
                  <div className="w-auto">
                <MegaMenu.Dropdown id="menuu" toggle={<><div className=" h-[30px] w-[30px] flex justify-center items-center rounded-full  font-bold border-[3px] border-[#0AAD0A] hover:text-[#0AAD0A] "><span className="dark:text-white">{decodedToken?.name[0]?.toUpperCase()}</span></div></>}>
                    <ul className="grid dark:bg-[#111827]">
                      <div className="space-y-4 p-4 text-black text-base dark:text-white ">
                      <li>
                          <Navbar.Link
                            as={NavLink}
                            to="/profile"
                            className=""
                          >
                            <span className="relative hover:text-[#0AAD0A] dark:hover:text-[#0AAD0A] text-black md:p-3 md:mx-0  dark:text-white  md:px-4">
                              Profile <i class="fa-solid fa-user"></i>
                            </span>
                          </Navbar.Link>
                        </li>
                        <li>
                          <Navbar.Link
                            as={NavLink}
                            to="/allorders"
                            className=""
                          >
                            <span className="relative hover:text-[#0AAD0A] dark:hover:text-[#0AAD0A] text-black md:p-3 md:mx-0 dark:text-white  md:px-4">
                              Orders <i class="fa-solid fa-truck-fast"></i>
                            </span>
                          </Navbar.Link>
                        </li>
                        
                        <li>
                          <p
                            className="hover:text-[#0AAD0A] text-base py-3 ms-4 cursor-pointer md:py-0"
                            onClick={signOut}
                          >
                            LogOut{" "}
                            <i class="fa-solid fa-right-from-bracket"></i>
                          </p>
                        </li>
                      </div>
                    </ul>
                  </MegaMenu.Dropdown>
                  
                </div>
                </>
              ) : (
                <>
                  <Navbar.Link as={NavLink} to="/login" className="text-black dark:text-white">
                    <span className="hover:text-[#0AAD0A] text-base md:border-e md:p-3 md:mx-0 md:border-e-[#DEE2E6]  md:px-4 ">
                      Login
                    </span>
                  </Navbar.Link>
                  <Navbar.Link as={NavLink} to="/register" className="text-black dark:text-white">
                    <span className="hover:text-[#0AAD0A] text-base md:border-e md:p-3 md:mx-0 md:border-e-[#DEE2E6]  md:px-4">
                      register
                    </span>
                  </Navbar.Link>
                </>
              )}
            </Navbar.Collapse>
          </div>
        </div>
      </Navbar>
      
    </>
  );
}
