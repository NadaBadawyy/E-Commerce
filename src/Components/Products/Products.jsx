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
  let { productIfo, currentPage, onPageChange,npages,setCurrentPage } = useProducts();
  let { data, error, isError, isLoading } = productIfo;
  const [allProducts, setallProducts] = useState(null);
  const [filteredProducts, setfilteredProducts] = useState(null)
  const [loading, setloading] = useState(false);
  const [currId, setcurrId] = useState(0);
  const [val, setval] = useState("");
  let { addProduct, noItems, setnoItems } = useContext(CartContext);
  let { addToWishlist, getWishList, removeWishlist, favCount, setfavCount } =
    useContext(WishlistContext);
  const [favItems, setfavItems] = useState(() =>
    JSON.parse(localStorage.getItem("favItems"))
  );
  const fetchAllProducts = async () => {
    let allProducts = [];
    let page = 1;
  
    while (page <= npages) {
      const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${currentPage}`);
      allProducts = [...allProducts, ...res.data.data];
      page++;
    }
  
    return allProducts;
  };

  async function addtoCart(id) {
    setcurrId(id);
    setloading(true);
    let res = await addProduct(id);
    if (res.data.status == "success") {
      setloading(false);
      noItems == res.data.numOfCartItems
        ? toast.success("the item is already added to your cart!", {
            position: "bottom-left",
          })
        : toast.success(res.data.message + "!", { position: "bottom-left" });
      setnoItems(res.data.numOfCartItems);
    } else {
      setloading(false);
      toast.error(res.data.message + "!", { position: "bottom-left" });
    }
  }
  async function addFav(id) {
    let res = await addToWishlist(id);
    if (res.data.status == "success") {
      setfavItems(res.data.data);
      setfavCount(res.data.data.length);

      localStorage.setItem("favItems", JSON.stringify(res.data.data));
      toast.success(res.data.message + "!", { position: "bottom-left" });
    } else {
      toast.error(res.data.message + "!", { position: "bottom-left" });
    }
  }
  async function getFavItems() {
    let res = await getWishList();
    if (res.data.status == "success") {
      let fav = res.data.data.map((i) => i.id);
      setfavItems(fav);
      setfavCount(res.data.count);

      localStorage.setItem("favItems", JSON.stringify(fav));
    }
  }
  async function deleteFav(id) {
    let res = await removeWishlist(id);
    if (res.data.status == "success") {
      setfavItems(res.data.data);
      setfavCount(res.data.data.length);

      localStorage.setItem("favItems", JSON.stringify(res.data.data));

      toast.success("product is removed successfully from Wishlist" + "!", {
        position: "bottom-left",
      });
    }
  }

  useEffect(() => {
    getFavItems();
  }, [favCount]);
useEffect(()=>{
  fetchAllProducts().then((products)=>{
    setallProducts(products);
    setfilteredProducts(products);
  })
},[])
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
      <div className="mt-16">
        <div className="p-2 px-5 dark:bg-[#1F2937] bg-gray-200 rounded-full flex justify-between items-center">
          <input
            type="text"
            onInput={(e) => {
              setval(e.target.value);
              
            }}
            className="bg-transparent  focus:!border-transparent p-2  border-0 text-black dark:text-white text-sm  w-full"
            placeholder="search on desired product.."
          />
          <i className="fa-solid fa-magnifying-glass text-xl dark:text-white"></i>
        </div>
        {(data
            ?.filter(
              (p) =>
                p.title.toLowerCase().includes(val) ||
                p.category.name.toLowerCase().includes(val) ||
                p.brand.name.toLowerCase().includes(val) ||
                p.description.toLowerCase().includes(val) ||
                p.slug.toLowerCase().includes(val) 
            ).length>0)?<><h2 className="text-center md:text-left text-2xl md:text-3xl mt-10 dark:text-white">
            Frequently Bought Products
          </h2>
  
          <div className="row py-2">
            {data
              ?.filter(
                (p) =>
                  p.title.toLowerCase().includes(val) ||
                  p.category.name.toLowerCase().includes(val) ||
                  p.brand.name.toLowerCase().includes(val) ||
                  p.description.toLowerCase().includes(val) ||
                  p.slug.toLowerCase().includes(val) 
              )
              .map((p) => {
                return (
                  <div
                    className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 text-left"
                    key={p.id}
                  >
                    <div className="hover:border-2 hover:shadow-md border-[#0AAD0A] dark:border-[#0AAD0A] rounded-lg group p-5 dark:bg-[#030119] dark:hover:shadow-lg">
                      <Link
                        to={`/productdetails/${p.id}/${p.category.name}`}
                        onClick={(e) => {
                          if (e.target.closest(".fav-icon")) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <div className="product">
                          <div className="relative">
                            <div
                              onClick={(e) => {
                                e.preventDefault();
                                {
                                  favItems?.includes(p.id)
                                    ? deleteFav(p.id)
                                    : addFav(p.id);
                                }
                              }}
                              className="fav-icon absolute top-0 right-0 hover:text-[#0AAD0A] dark:hover:text-[#0AAD0A] flex justify-center items-center bg-white dark:bg-gray-700 p-2 rounded-full"
                            >
                              {favItems?.includes(p.id) ? (
                                <i className="fa-solid fa-heart text-xl text-[#0AAD0A] dark:text-[#0AAD0A]"></i>
                              ) : (
                                <i className="fa-regular fa-heart text-xl dark:text-white"></i>
                              )}
                            </div>
                            <img
                              src={p.imageCover}
                              className="w-full rounded-lg"
                              alt=""
                            />
                          </div>
  
                          <h3 className="text-[#0AAD0A] dark:text-[#0AAD0A] text-2xl">
                            {p.category.name}
                          </h3>
                          <h3 className="text-xl dark:text-white">
                            {p.title.split(" ").slice(0, 2).join(" ")}
                          </h3>
                          <div className="flex justify-between py-2">
                            <p className="text-slate-600 dark:text-gray-400 text-base  dark:text-white">
                              {p.price} EGP
                            </p>
                            <p className="text-slate-600 dark:text-gray-400 text-base  dark:text-white">
                              <i className="fas fa-star text-yellow-300"></i>{" "}
                              {p.ratingsAverage}
                            </p>
                          </div>
                        </div>
                      </Link>
                      <button
                        className="btn opacity-0 group-hover:opacity-100 dark:bg-[#0AAD0A] dark:text-white"
                        onClick={() => addtoCart(p.id)}
                      >
                        {loading && currId == p.id ? (
                          <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          <p>
                            add to cart <i className="fa-solid fa-cart-plus"></i>
                          </p>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="flex items-center justify-center" id="pg">
            <Pagination
              currentPage={currentPage}
              totalPages={npages}
              onPageChange={onPageChange}
              previousLabel="<<"
              nextLabel=">>"
            />
          </div></>:<><p className="text-center text-3xl capitalize m-auto my-10 dark:text-white">
                  no stock available
                  <i className="fa-regular fa-face-frown"></i>
                </p></>}
        
      </div>
    </>
  );
}
