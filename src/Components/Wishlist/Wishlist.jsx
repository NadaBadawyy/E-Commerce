import React, { useContext, useEffect, useState } from "react";
import style from "./Wishlist.module.css";
import { WishlistContext } from "../../Context/WishlistContext";
import img from "../../assets/slider-image-3.jpeg";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
export default function Wishlist() {
  const [favItems, setfavItems] = useState(null);
  const [loading, setloading] = useState(null);
  const [favloading, setfavloading] = useState(null);
  const [currId, setcurrId] = useState(0);
  const { noItems, addProduct, setnoItems } = useContext(CartContext);
  let { getWishList, removeWishlist, setfavCount, favCount } =
    useContext(WishlistContext);
  async function getFav() {
    let res = await getWishList();
    setfavItems(res.data.data);
  }
  async function addtoCart(id) {
    setcurrId(id);
    setloading(true);
    let res = await addProduct(id);
    if (res.data.status == "success") {
      setloading(false);
      noItems == res.data.numOfCartItems
        ? toast.success("the item is already added to your cart" + "!",{position:'bottom-left'})
        : toast.success(res.data.message + "!",{position:'bottom-left'});
      setnoItems(res.data.numOfCartItems);
    } else {
      setloading(false);
      toast.error(res.data.message + "!",{position:'bottom-left'});
    }
  }
  async function deleteFav(id) {
    setcurrId(id);
    setfavloading(true);
    let res = await removeWishlist(id);
    if (res.data.status == "success") {
      setfavloading(false);
      let fav = favItems.filter((p) => p.id != id);
      setfavItems(fav);
      setfavCount(res.data.data.length);
      localStorage.setItem("favItems", JSON.stringify(res.data.data));
      toast.success("product is removed successfully from Wishlist" + "!",{position:'bottom-left'});
    } else {
      setfavloading(false);
      toast.error("can not delete this item" + "!",{position:'bottom-left'});
    }
  }
  useEffect(() => {
    getFav();
  }, []);
  return (
    <>
    <Helmet>
        <title>WishList</title>
      </Helmet>
      {(favItems )? (
        favItems.length > 0 ? (
          <div className="p-5 my-10 font-mono">
            <h2 className="my-10 text-3xl font-mono text-left dark:text-white">My Wishlist</h2>
            {favItems?.map((p, i) => {
              return (
                <div
                  key={i}
                  className="flex justify-center items-center md:flex-row flex-col md:justify-between  p-3  border-y-2 border-gray-200"
                >
                  <div className="flex items-center gap-x-7  ">
                    <div className="item w-1/3 md:w-1/4 m-auto md:m-0">
                      <img src={p.imageCover} className="w-full" alt="" />
                    </div>
                    <div className="p-3 text-left">
                      <h5 className="text-xl mb-2 dark:text-white">{p.category.name}</h5>
                      <p className="text-lg text-[#0AAD0A] ">{p.price} EGP</p>
                    </div>
                  </div>
                  <div className="">
                    <button
                      className="btn mb-3 hover:bg-[#1e6c1e]"
                      onClick={() => addtoCart(p.id)}
                    >
                      {loading && currId == p.id ? (
                        <i className="fas fa-spinner fa-spin "></i>
                      ) : (
                        
                        <p  >
                          add to cart <i className="fa-solid fa-cart-plus "></i>
                        </p>
                      )}
                    </button>
                    <button
                      className="btn hover:bg-red-600"
                      onClick={() => deleteFav(p.id)}
                    >
                      {favloading && currId == p.id ? (
                        <i className="fas fa-spinner fa-spin "></i>
                      ) : (
                        <p>
                          Remove <i class="fa-solid fa-heart-crack"></i>
                        </p>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center md:h-fit h-screen">
            <p className="text-center text-3xl capitalize m-auto  md:my-28">
            no favorite items added yet
            <i className="fa-regular fa-face-frown"></i>
          </p>
          </div>
          
        )
      ) : (
        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      )}
      
    </>
  );
}
