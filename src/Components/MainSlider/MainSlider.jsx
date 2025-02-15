import React from 'react'
import style from './MainSlider.module.css'
import Slider from "react-slick";
import img1 from "../../assets/s1.png"
import img2 from "../../assets/s2.png"
import img3 from "../../assets/s3.png"
import img4 from "../../assets/s4.png"


export default function MainSlider() {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:3000,
    arrows:false,
    
    responsive: [
      
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
     
    ]


  };
  return (
    <>
    <div className="md:mt-20 lg:my-10 my-10">
      <div className="w-full  ">
      <Slider {...settings}>
      <img src={img1} alt="" className='w-full object-cover min-h-[150px]  rounded-md' />
      <img src={img2} alt="" className='w-full object-cover  min-h-[150px] rounded-md' />
      <img src={img3} alt="" className='w-full object-cover  min-h-[150px] rounded-md' />
      <img src={img4} alt="" className='w-full object-cover min-h-[150px]  rounded-md' />
    </Slider>
      </div>
      

    </div>
    </>
  )
}
