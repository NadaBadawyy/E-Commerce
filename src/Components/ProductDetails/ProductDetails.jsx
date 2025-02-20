import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';
import { toast } from "react-toastify";



export default function ProductDetails() {
  var settings = {
    dots:true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:2000,
    arrows:false,

  };
  
  const [product, setproduct] = useState(null)
  const [products, setproducts] = useState(null)
  const [images, setimages] = useState([])
  const [loading, setloading] = useState(false)
  const [currId, setcurrId] = useState(0)

let {addProduct,noItems,setnoItems}=useContext(CartContext);
  let { addToWishlist,getWishList,removeWishlist,favCount,setfavCount } = useContext(WishlistContext);
  const [favItems, setfavItems] = useState(()=>JSON.parse(localStorage.getItem('favItems')));

  async function addtoCart(id) {
    setcurrId(id);
    setloading(true);
    let res = await addProduct(id);
    if (res.data.status == "success") {
      setloading(false);
      (noItems==res.data.numOfCartItems)?toast.success('the item is already added to your cart' + "!",{position:'bottom-left'}):toast.success(res.data.message + "!",{position:'bottom-left'});
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
  let {id,category}=useParams();
  function getProduct() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then((res)=>{
      setimages(res.data.data.images)
      
      setproduct(res.data.data);
    }).catch((res)=>{
      
    })
  }
  function getAllProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((res)=>{
     let filteredproducts=res.data.data.filter((p)=>p.category.name==category)      
      setproducts(filteredproducts);
    }).catch((res)=>{
      
    })
  }
  useEffect(()=>{
    getProduct()
    getAllProducts()
  },[id])
  useEffect(() => {
  getFavItems();
  }, [favCount])
  
  return (
    <>
    {(product||products)?<>{product&&
    <div className="md:container">
      <div className="row flex-col md:flex-row items-center justify-between bg-white rounded-lg shadow-2xl md:p-10 mt-10 mb-5 font-mono ">
    <div className="w-3/5 md:w-1/4 md:pe-5 gap-10 md:border-e-2 border-gray-400 ">
    <Slider {...settings} className='my-5 w-full '>
      {images.map((img)=> <img src={img} className='md:w-full my-5 rounded-xl' alt="" /> )}
    </Slider>
    </div>
    <div className= "w-4/5 md:w-2/3 text-left">
        <p className=' my-3 text-2xl  '>{product?.title}</p>
        <p className='my-3 text-xl text-gray-500'>{product?.description}</p>
        <div className="flex justify-between lg:w-1/2 py-2">
            <p className="text-slate-600 text-base">{product.price} EGP</p>
            <p className="text-slate-600 text-base"> <i className="fas fa-star text-yellow-300"></i> {product.ratingsAverage} </p>
          </div>
        <button className="btn my-10 lg:w-1/2 w-full " onClick={()=>addtoCart(product.id)}>{(loading)?<i className="fas fa-spinner fa-spin "></i>: <p>add to cart <i class="fa-solid fa-cart-plus"></i></p> } </button>
        </div>
    
  </div>
    </div>
   }
<h2 className='text-center md:text-left  text-3xl mt-16 capitalize'>related products</h2>

  <div className="row  py-2  ">
  {products?.map((p) => {
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
      
    </div></>:<div class="spinner">
  <div class="bounce1"></div>
  <div class="bounce2"></div>
  <div class="bounce3"></div>
</div>}
        
    </>
  )
}
