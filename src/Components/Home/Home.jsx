import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import Products from "../Products/Products";
import Cart from "../Cart/Cart";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchInput from "../SearchInput/SearchInput";
import { Helmet } from "react-helmet";
export default function Home() {
  return (
    <div>
      <Helmet>
        <title>FreshCart</title>
      </Helmet>
      <SearchInput />
      <MainSlider />
      <h3 className="text-center md:text-left my-5 md:text-3xl text-2xl dark:text-white">
        Shop Popular Categories
      </h3>
      <CategorySlider />
      <h2 className="text-center md:text-left text-2xl md:text-3xl mt-10 dark:text-white">
        Frequently Bought Products
      </h2>
      <Products />
    </div>
  );
}
