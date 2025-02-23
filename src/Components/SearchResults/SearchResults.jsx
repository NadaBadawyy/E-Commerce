import React, { useContext, useEffect, useState } from 'react'
import style from './SearchResults.module.css'
import { Link, useLocation, useParams } from 'react-router-dom'
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';
import { toast } from 'react-toastify';
import SearchInput from '../SearchInput/SearchInput';
import { Helmet } from 'react-helmet';
export default function SearchResults() {
  let {search}= useParams();
    const [allProducts, setallProducts] = useState(null);
    const [filteredProducts, setfilteredProducts] = useState(null)
  const [loading, setloading] = useState(false);
    const [currId, setcurrId] = useState(0);
    const [val, setval] = useState("");
    let { addProduct, noItems, setnoItems } = useContext(CartContext);
    let { addToWishlist, getWishList, removeWishlist, favCount, setfavCount } =
      useContext(WishlistContext);
      let path=useLocation();
    const [favItems, setfavItems] = useState(() =>
      JSON.parse(localStorage.getItem("favItems"))
    );
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
    
  const fetchAllProducts = async () => {
    let pro = [];
    let page = 1;
    let totalp = 1;
    while (page <= totalp) {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?page=${page}`
      );
      pro = [...pro, ...res.data.data];
      totalp = res.data.metadata.numberOfPages;
      page++;
    }

    return pro;
  };
  function getproducts(allProducts){
    let filtered = allProducts?.filter((p) => {
      if (p.title.toLowerCase().includes(search.toLowerCase())) {
        return p.title.toLowerCase().includes(search.toLowerCase())
      }
      if (p.category.name.toLowerCase().includes(search.toLowerCase())) {
        return p.category.name.toLowerCase().includes(search.toLowerCase())
      }
      if (p.brand.name.toLowerCase().includes(search.toLowerCase())) {
        return p.brand.name.toLowerCase().includes(search.toLowerCase())
      }
      else{
        return;
      }
    });
    console.log(filteredProducts);
    
    
   setfilteredProducts(filtered)
    
  }
   useEffect(() => {
    setfilteredProducts(null);
       fetchAllProducts()
        .then(async(products) => {
          console.log(products);
          
          setallProducts(products);
          getproducts(products)
        })
        .catch((res) => {
          console.log(res);
        });
    }, [path.pathname]);
  return (
    <>
    <Helmet>
        <title>{search}</title>
      </Helmet>
    {filteredProducts?<><div className="mt-16 md:mt-24 lg:mt-16">
        <SearchInput/>

        <>
        {filteredProducts?<>
          <h2 className="text-center capitalize text-xl mt-10 dark:text-white">
          Results for: <span className='font-bold'>"{search}"</span>
                </h2>
    
                <div className="row py-2">
                  {filteredProducts
                    ?.map((p) => {
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
                                  add to cart{" "}
                                  <i className="fa-solid fa-cart-plus"></i>
                                </p>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
        </>:<><div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div></>}
                
                
              </>
          
        </div></>:<><div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div></>}
    
      
    </>
  )
}
