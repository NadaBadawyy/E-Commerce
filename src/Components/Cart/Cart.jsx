import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
export default function Cart() {
  const [cartDetails, setcartDetails] = useState(null);
  const [loading, setloading] = useState(false);
  const [delloading, setdelloading] = useState(false);
  const [currId, setcurrId] = useState(0);
  let { GetLoggedUserCarts, updateCartQuantity, deleteCartItem, setnoItems } =
    useContext(CartContext);
  async function displayCart() {
    let res = await GetLoggedUserCarts();

    setcartDetails(res.data.data);
  }
  async function updateQuantity(id, count) {
    setcurrId(id);
    setloading(true);
    let res = await updateCartQuantity(id, count);
    console.log(res);
    if (res.data.status == "success") {
      setcartDetails(res.data.data);
      setloading(false);
      toast.success("product updated successfully",{position:'bottom-left'}

      );
    } else {
      setloading(false);
    }
  }
  async function deleteItem(id) {
    setcurrId(id);
    setdelloading(true);
    let res = await deleteCartItem(id);
    if (res.data.status == "success") {
      setcartDetails(res.data.data);
      setdelloading(false);
      setnoItems(res.data.numOfCartItems);

      toast.success("product deleted successfully",{position:'bottom-left'});
    } else {
      setdelloading(false);
    }
  }
  useEffect(() => {
    displayCart();
  }, []);
  const [mdSreen, setmdScreen] = useState(window.innerWidth <= 778);
  useEffect(() => {
    window.addEventListener("load", () => {
      if (window.innerWidth <= 778) {
        setmdScreen(true);
      } else {
        setmdScreen(false);
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 778) {
        setmdScreen(true);
      } else {
        setmdScreen(false);
      }
    });
  }, []);
  return (
    <>
      {cartDetails == null ? (
        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      ) : (
        <>
          {cartDetails?.products.length > 0 ? (
            <>
              {mdSreen ? (
                <>
                  <div className="p-5 my-10 font-mono">
                    <h2 className="my-10 text-3xl font-mono text-left dark:text-white">
                      My Cart
                    </h2>
                    {cartDetails?.products.map((p, i) => {
                      return (
                        <div
                          key={i}
                          className="flex justify-center items-center md:flex-row flex-col md:justify-between  p-3  border-y-2 border-gray-200"
                        >
                          <div className="flex items-center gap-x-7  ">
                            <div className="item w-1/3 md:w-1/4 m-auto md:m-0">
                              <img
                                src={p.product.imageCover}
                                className="w-full"
                                alt=""
                              />
                            </div>
                            <div className="p-3 text-left">
                              <h5 className="text-xl mb-2 dark:text-white">
                                {p.product.title
                                  .split(" ")
                                  .slice(0, 2)
                                  .join(" ")}
                              </h5>
                              <p className="text-lg text-[#0AAD0A] ">
                                {p.price * p.count} EGP
                              </p>
                              <div className="flex items-center justify-start my-5 dark:text-white">
                                <button
                                  className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(p.product.id, p.count - 1)
                                  }
                                >
                                  <span className="sr-only">
                                    Quantity button
                                  </span>
                                  <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 2"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M1 1h16"
                                    />
                                  </svg>
                                </button>
                                <div>
                                  {loading && currId == p.product.id ? (
                                    <i className="fas fa-spinner fa-spin"></i>
                                  ) : (
                                    <span>{p.count}</span>
                                  )}
                                </div>
                                <button
                                  className="inline-flex items-center justify-center  h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(p.product.id, p.count + 1)
                                  }
                                >
                                  <span className="sr-only">
                                    Quantity button
                                  </span>
                                  <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 18"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 1v16M1 9h16"
                                    />
                                  </svg>
                                </button>
                              </div>
                              <button
                                className="btn w-full hover:bg-red-600"
                                onClick={() => deleteItem(p.product.id)}
                              >
                                {delloading && currId == p.id ? (
                                  <i className="fas fa-spinner fa-spin "></i>
                                ) : (
                                  <p>
                                    Remove <i class="fa-solid fa-trash-can"> </i>
                                  </p>
                                )}
                              </button>
                            </div>
                          </div>
                          <div className=""></div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <h2 className="  mt-24 py-3 my-3 capitalize text-3xl text-[#0AAD0A] font-bold">
                    total price: {cartDetails?.totalCartPrice}
                  </h2>
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                    <table className="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400 py-10">
                      <thead className="text-lg text-center text-gray-700 uppercase bg-gray-50 dark:bg-[#203046] dark:text-white ">
                        <tr className="">
                          <th scope="col" className="px-16 py-3">
                            <span className="sr-only">Image</span>
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Product
                          </th>
                          <th scope="col" className="px-6 py-3 ">
                            Qty
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Price
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {cartDetails?.products.map((p) => {
                          return (
                            <tr
                              key={p.product.id}
                              className="text-center bg-white border-b dark:bg-gray-800 dark:border-[#030119] border-gray-200 "
                            >
                              <td className="p-5">
                                <img
                                  src={p.product.imageCover}
                                  className="md:w-32 max-w-full max-h-full"
                                  alt="Apple Watch"
                                />
                              </td>
                              <td className=" py-4  font-semibold text-gray-900 dark:text-white">
                                {p.product.title
                                  .split(" ")
                                  .slice(0, 2)
                                  .join(" ")}
                              </td>
                              <td className="px-6 py-4 ">
                                <div className="flex items-center justify-center dark:text-white">
                                  <button
                                    className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                    type="button"
                                    onClick={() =>
                                      updateQuantity(p.product.id, p.count - 1)
                                    }
                                  >
                                    <span className="sr-only">
                                      Quantity button
                                    </span>
                                    <svg
                                      className="w-3 h-3"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 18 2"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M1 1h16"
                                      />
                                    </svg>
                                  </button>
                                  <div>
                                    {loading && currId == p.product.id ? (
                                      <i className="fas fa-spinner fa-spin"></i>
                                    ) : (
                                      <span>{p.count}</span>
                                    )}
                                  </div>
                                  <button
                                    className="inline-flex items-center justify-center  h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                    type="button"
                                    onClick={() =>
                                      updateQuantity(p.product.id, p.count + 1)
                                    }
                                  >
                                    <span className="sr-only">
                                      Quantity button
                                    </span>
                                    <svg
                                      className="w-3 h-3"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 18 18"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 1v16M1 9h16"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </td>
                              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                {p.price * p.count}
                              </td>
                              <td className="px-6 py-4">
                                <p
                                  onClick={() => deleteItem(p.product.id)}
                                  className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                                >
                                  {delloading && currId == p.product.id ? (
                                    <i className="fas fa-spinner fa-spin"></i>
                                  ) : (
                                    <p>
                                      Remove{" "}
                                      <i class="fa-solid fa-trash-can"></i>
                                    </p>
                                  )}
                                </p>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <Link to={"/checkout"}>
                    <button className="btn my-5">Checkout</button>
                  </Link>
                </>
              )}
            </>
          ) : (
            <>
              <h2 className=" mt-24 mb-96 capitalize text-3xl text-red-600 font-bold">
                no product added yet
              </h2>
            </>
          )}
        </>
      )}
    </>
  );
}
