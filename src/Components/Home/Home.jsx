import React from 'react'
import style from './Home.module.css'
import Products from '../Products/Products'
import Cart from '../Cart/Cart'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'

export default function Home() {
  return (
    <div>
      <MainSlider/>
      <h3 className='text-center md:text-left my-5 text-3xl'>Shop Popular Categories</h3>
      <CategorySlider/>
      <Products/>

     
    </div>
  )
}
