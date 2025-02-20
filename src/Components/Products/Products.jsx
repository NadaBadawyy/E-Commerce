import React, { useContext, useEffect } from "react";
import style from "./Products.module.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import errorimg from "../../assets/404.png";
import { CartContext } from "../../Context/CartContext";
import { Pagination } from "flowbite-react";
import { toast } from "react-toastify";
import { WishlistContext } from "../../Context/WishlistContext";
export default function Products() {
  let { productIfo, currentPage, onPageChange } = useProducts();
  let { data, error, isError, isLoading } = productIfo;
  const [loading, setloading] = useState(false);
  const [currId, setcurrId] = useState(0);
  let { addProduct, noItems, setnoItems } = useContext(CartContext);
  let { addToWishlist,getWishList,removeWishlist,favCount,setfavCount } = useContext(WishlistContext);
  const [favItems, setfavItems] = useState(()=>JSON.parse(localStorage.getItem('favItems')))
  async function addtoCart(id) {
    setcurrId(id);
    setloading(true);
    let res = await addProduct(id);
    if (res.data.status == "success") {
      setloading(false);
      (noItems==res.data.numOfCartItems)?toast.success('the item is already added to your cart!',{position:'bottom-left'} ):toast.success(res.data.message + "!",{position:'bottom-left'});
      setnoItems(res.data.numOfCartItems); 
      
    } else {
      setloading(false);
      toast.error(res.data.message + "!",{position:'bottom-left'});
    }
  }
  async function addFav(id) {
    let res = await addToWishlist(id);
    if (res.data.status == "success") {      
      setfavItems(res.data.data);
      setfavCount(res.data.data.length);

      localStorage.setItem('favItems',JSON.stringify(res.data.data));
      toast.success(res.data.message + "!",{position:'bottom-left'});
    } else {
      toast.error(res.data.message + "!",{position:'bottom-left'});
    }
  }
  async function getFavItems(){
    let res=await getWishList();
    if (res.data.status == "success"){
    let fav=res.data.data.map((i)=>i.id)
    setfavItems(fav);
    setfavCount(res.data.count);
    
    localStorage.setItem('favItems',JSON.stringify(fav));
    }
    
    
  }
  async function deleteFav(id){
    let res=await removeWishlist(id);
    if (res.data.status == "success"){
      setfavItems(res.data.data);
      setfavCount(res.data.data.length)
      
      
      localStorage.setItem('favItems',JSON.stringify(res.data.data));
     
      
      toast.success('product is removed successfully from Wishlist' + "!",{position:'bottom-left'})
    }
   
  }

  useEffect(()=>{    
    getFavItems();
    
    
  },[favCount])

  if (isError) {
    return (
      <>
        <h1>{error}</h1>
        <img src={errorimg} className="w-full " alt="" />
      </>
    );
  }
  if (isLoading) {
    return (
      <>
        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      </>
    );
  }
  return (
    <>
      <h2 className="text-center md:text-left  text-3xl mt-16 ">
        Frequently Bought Products
      </h2>
      <div className="row  py-2  ">
        {data?.map((p) => {
          return (
            <div
              className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 text-left "
              key={p.id}
            >
              <div className=" hover:border-2 hover:shadow-md border-[#0AAD0A] rounded-lg group p-5">
                <Link
                  to={`/productdetails/${p.id}/${p.category.name}`}
                  onClick={(e) => {
                    if (e.target.closest(".fav-icon")) {
                      e.preventDefault();
                    }
                  }}
                >
                  <div className=" product  ">
                    <div className="relative">
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          {favItems?.includes(p.id)?deleteFav(p.id):addFav(p.id)}
                        }}
                        className="fav-icon absolute top-0 right-0 hover:text-[#0AAD0A] flex justify-center items-center bg-white p-2 rounded-full"
                      >
                        {(favItems?.includes(p.id))?<i class={`fa-solid fa-heart text-xl text-[#0AAD0A]`} ></i>:<i class="fa-regular fa-heart text-xl"></i>}
                        
                       
                      </div>
                      <img
                        src={p.imageCover}
                        className="w-full rounded-lg "
                        alt=""
                      />
                    </div>

                    <h3 className="text-[#0AAD0A] text-2xl">
                      {p.category.name}
                    </h3>
                    <h3 className="text-xl">
                      {p.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="flex justify-between py-2">
                      <p className="text-slate-600 text-base">{p.price} EGP</p>
                      <p className="text-slate-600 text-base">
                        {" "}
                        <i className="fas fa-star text-yellow-300"></i>{" "}
                        {p.ratingsAverage}{" "}
                      </p>
                    </div>
                  </div>
                </Link>
                <button
                  className="btn opacity-0 group-hover:opacity-100 "
                  onClick={() => addtoCart(p.id)}
                >
                  {loading && currId == p.id ? (
                    <i className="fas fa-spinner fa-spin "></i>
                  ) : (
                    <p>
                      add to cart <i className="fa-solid fa-cart-plus "></i>
                    </p>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex  items-center justify-center " id="pg">
        <Pagination
          currentPage={currentPage}
          totalPages={2}
          onPageChange={onPageChange}
          previousLabel="<<"
          nextLabel=">>"
        />
      </div>
    </>
  );
}
