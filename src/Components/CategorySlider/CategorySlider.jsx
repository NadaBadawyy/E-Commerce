import React, { useEffect, useState } from 'react'
import style from './CategorySlider.module.css'
import axios from 'axios';
import Slider from "react-slick";

export default function CategorySlider() {
  const [categories, setcategories] = useState(null)
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:3000,
    arrows:false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
         
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]



  };
  function getAllCtegories(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`).then((res)=>{
      setcategories(res.data.data)    
    }).catch((res)=>{

    })
  }
  useEffect(()=>{
    getAllCtegories();
  },[])
  return (
    <>
    <Slider {...settings}>
    {categories? categories.map((cat,i)=>{
       return <div key={i} className="">
        <div className="m-auto ">
        <img src={cat.image}  className=' object-cover  m-auto h-[200px] w-[200px] rounded-lg' alt="" />
        <h4 className='text-center my-5'>{cat.name}</h4>
        </div>
          
        </div>
    }):<div class="spinner">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>}
    </Slider>
   
    
    </>
  )
}
