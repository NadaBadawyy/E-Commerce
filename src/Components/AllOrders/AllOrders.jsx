import React, { useEffect, useState } from 'react'
import style from './AllOrders.module.css'
import axios from 'axios';
export default function AllOrders() {
  const [orders, setorders] = useState(null)
  async function getAllOrders() {
    let res=await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`);
    console.log(res.data.data);
    
    setorders(res.data.data)
  }
  useEffect(()=>{
    getAllOrders();
  },[])
  return (
    <>
    
    <div className="my-24">
    {orders?<><div className="text-center my-5 flex justify-around items-center">
        <p className='border-s-2 text-lg ps-5 p-3 text-center'>#</p>
        <p className='border-s-2 text-lg ps-5 p-3 text-center'>Order Price</p>
        <p className='border-s-2 text-lg ps-5 p-3 text-center'>Status</p>
      </div>
     
      {orders?.map((o)=>{
        return <div className="text-center my-5 flex justify-around items-center border-b-2 p-3">
        <p className='text-lg text-center text-[#0AAD0A] border-s'>#{o.id}</p>
        <p className='text-lg text-center'>{o.totalOrderPrice}</p>
        <p className='text-xs md:ps-24 text-center'>
          <div className={ `rounded-lg p-1 bg-[#0AAD0A] mb-3 text-white`}>isPaid</div>
          <div className={ `rounded-lg p-1 bg-red-600 text-white`}><span>isDelivered</span></div>
          
        </p>
        
       
      </div>
      })}</>:<><div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div></>}
      
    </div>
      
    </>
  )
}
