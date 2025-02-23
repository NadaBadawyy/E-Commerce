import React, { useEffect, useState } from "react";
import style from "./AllOrders.module.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function AllOrders() {
  const token = localStorage.getItem('Token');
const decoded = jwtDecode(token);

 
  const [orders, setorders] = useState(null);
  async function getAllOrders() {
    let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${decoded.id}`);
    
    setorders(res.data);
  }
  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <>
    <Helmet>
        <title>Orders</title>
      </Helmet>
      <div className="my-24">
        {orders ? (
          orders.length > 0 ? (
            <>
              <div className="text-center my-5 flex justify-around items-center">
                <p className="border-s-2 text-lg ps-5 p-3 text-center dark:text-white">#</p>
                <p className="border-s-2 text-lg ps-5 p-3 text-center dark:text-white">
                  Order Price
                </p>
                <p className="border-s-2 text-lg ps-5 p-3 text-center dark:text-white">
                  Status
                </p>
              </div>

              {orders?.map((o,i) => {
                return (
                  <div key={i} className="text-center my-5 flex justify-around items-center border-b-2 p-3">
                    <p className="text-lg text-center text-[#0AAD0A] ">
                      #{o.id}
                    </p>
                    <p className="text-lg text-center dark:text-white">{o.totalOrderPrice}</p>
                    <p className="text-xs md:ps-24 text-center">

                      <Link to={`/allorders/${o._id}`}>

                      <button className="bg-[#0AAD0A] text-white rounded-xl p-3 text-xl">View</button>
                      </Link>
                      
                    </p>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <p className="text-center text-3xl capitalize m-auto my-10">
                no orders available
                <i className="fa-regular fa-face-frown"></i>
              </p>
            </>
          )
        ) : (
          <>
            <div class="spinner">
              <div class="bounce1"></div>
              <div class="bounce2"></div>
              <div class="bounce3"></div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
