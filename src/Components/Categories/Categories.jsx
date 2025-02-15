import React, { useEffect } from "react";
import style from "./Categories.module.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Categories() {
  const [categories, setcategories] = useState(null);
  async function getCategories() {
    let res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    console.log(res.data.data);
    setcategories(res.data.data);
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      {categories ? (
        <div className="row my-10 ">
          {categories?.map((cat) => {
            return (
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5  ">
                <Link to={`/categories/${cat._id}/${cat.name}`}>
                  <div className="p-3 ">
                    <div className="border-2 rounded-lg">
                    <img
                      src={cat.image}
                      className="w-full h-[300px] object-cover rounded-se-lg  rounded-ss-lg"
                      alt=""
                    />
                    <p className="text-lg w-full p-2 bg-gray-200 rounded-es-lg  rounded-ee-lg border ">
                      {cat.name}
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
