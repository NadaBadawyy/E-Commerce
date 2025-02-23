import React, { useEffect } from "react";
import style from "./Brands.module.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import SearchInput from "../SearchInput/SearchInput";
import { Helmet } from "react-helmet";
export default function Categories() {
  const [brands, setbrands] = useState(null);
  async function getBrands() {
    let res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands`
    );

    setbrands(res.data.data);
  }
  useEffect(() => {
    getBrands();
  }, []);
  return (
    <>
    <Helmet>
        <title>Brands</title>
      </Helmet>
    <SearchInput/>
      {brands ? (
        <div className="row my-10 ">
          {brands?.map((brand) => {
            return (
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5   ">
                <Link to={`/brands/${brand._id}/${brand.name}`}>
                  <div className="p-5">
                   <div className="border-2 rounded-lg">
                   <img
                      src={brand.image}
                      className="w-fullo bject-cover rounded-se-lg  rounded-ss-lg"
                      alt=""
                    />
                    <p className="text-lg w-full p-2 bg-gray-200 rounded-es-lg dark:bg-[#030119] dark:text-white  rounded-ee-lg border ">
                      {brand.name}
                    </p>
                   </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
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
