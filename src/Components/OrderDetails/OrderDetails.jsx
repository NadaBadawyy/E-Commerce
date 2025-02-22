import React, { useEffect, useState } from "react";
import style from "./OrderDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function OrderDetails() {
  const [Details, setDetails] = useState(null);
  const [items, setitems] = useState(null);
  const { id } = useParams();
  async function getOrder() {
    let res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders?_id=${id}`
    );
    console.log(res.data.data[0]);

    setDetails(res.data.data[0]);
    setitems(res.data.data[0].cartItems);
  }
  useEffect(() => {
    getOrder();
  }, []);
  return (
    <>
      {Details ? (
        <>
          {Details.length > 0 ? (
            <>
              <div className="p-5">
                <div className="p-5 rounded-2xl shadow-2xl bg-[#F8F9FA] dark:bg-[#1F2937] dark:text-white m-auto mt-24">
                  <div className="flex flex-col md:flex-row justify-around  flex-wrap gap-y-7 mx-auto sm:items-center text-left">
                    <div className="">
                      <p className="text-xl font-bold">
                        Order Info <i class="fa-solid fa-truck-fast"></i>
                      </p>
                      <h3>
                        Order ID:{" "}
                        <span className="text-[#0AAD0A]  mb-3">
                          #{Details?.id}
                        </span>
                      </h3>
                      <h3>
                        Total Payment Price:{" "}
                        <span className="text-[#0AAD0A] mb-3">
                          {Details?.totalOrderPrice} EGP
                        </span>
                      </h3>
                      <h3>
                        Payment Method:{" "}
                        <span className="bg-[#0AAD0A] text-white p-1 rounded-lg mb-3">
                          {Details?.paymentMethodType}
                        </span>
                      </h3>
                    </div>
                    <div className="">
                      <p className="text-xl font-bold">
                        Address Info{" "}
                        <i class="fa-solid fa-map-location-dot"></i>
                      </p>
                      <h3>
                        Address Details:{" "}
                        <span className="text-[#0AAD0A]  mb-3">
                          {Details?.shippingAddress.details}
                        </span>
                      </h3>
                      <h3>
                        City:{" "}
                        <span className="text-[#0AAD0A] mb-3">
                          {Details?.shippingAddress.city}
                        </span>
                      </h3>
                      <h3>
                        Phone:{" "}
                        <span className="text-[#0AAD0A] mb-3">
                          {Details?.shippingAddress.phone}
                        </span>
                      </h3>
                    </div>
                    <div className="">
                      <p className="text-xl font-bold">
                        Customer Info <i class="fa-solid fa-address-card"></i>
                      </p>
                      <h3>
                        Name:{" "}
                        <span className="text-[#0AAD0A]  mb-3">
                          {Details?.user.name}
                        </span>
                      </h3>
                      <h3>
                        Email:{" "}
                        <span className="text-[#0AAD0A] mb-3">
                          {Details?.user.email}
                        </span>
                      </h3>
                      <h3>
                        Email:{" "}
                        <span className="text-[#0AAD0A] mb-3">
                          {Details?.user.phone}
                        </span>
                      </h3>
                    </div>
                  </div>
                  <div className="my-16 ">
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-white  ">
                        <thead class=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white text-base ">
                          <tr>
                            <th scope="col" class="px-6 py-3">
                              Product
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Price
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Quantity
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {items?.map((i) => {
                            return (
                              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-base">
                                <th
                                  scope="row"
                                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  <img
                                    src={i.product.imageCover}
                                    className="w-[120px] rounded-xl"
                                    alt=""
                                  />
                                </th>
                                <td class=" py-4  ">{i.price} EGP</td>
                                <td class="px-6 py-4">{i.count}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-center text-3xl capitalize m-auto my-10 md:mt-24 dark:text-white">
                The Order has been Delivered <i class="fa-solid fa-face-smile-beam"> </i>
              </p>
            </>
          )}
        </>
      ) : (
        <>
          <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
          </div>
        </>
      )}
    </>
  );
}
