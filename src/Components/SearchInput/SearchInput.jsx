import React, { useEffect, useState } from 'react'
import style from './SearchInput.module.css'
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { useRef } from 'react';



export default function SearchInput() {
  const searchRef = useRef(null);
  const inputRef=useRef(null)
  const [allProducts, setallProducts] = useState(null);
  const [val, setval] = useState("");
  const [filteredProducts, setfilteredProducts] = useState(null);
  let path= useLocation();
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
  let handleSearch = (e) => {
    if (e.target.value != "") {
      let s = e.target.value.toLowerCase();
      setval(s);
      let filtered = allProducts?.flatMap((p) => {
        let matches = [];
        if (p.title.toLowerCase().includes(val)) {
          matches.push(p.title);
        }
        if (p.category.name.toLowerCase().includes(val)) {
          matches.push(p.category.name);
        }
        if (p.brand.name.toLowerCase().includes(val)) {
          matches.push(p.brand.name);
        }
        return matches;
      });
      let uniqueArr = [...new Set(filtered)];
     
      setfilteredProducts(uniqueArr);
    }
    else{
      setval('')
      setfilteredProducts([])
    }
  };
  useEffect(() => {
    setval('')
    fetchAllProducts()
      .then((products) => {
        setallProducts(products);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [path.pathname]);
  let handleFocus=()=>{
    return handleSearch({target:{value:val}});
  }
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setfilteredProducts([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <>
      <div ref={searchRef} className="relative   p-2 px-5 dark:bg-[#1F2937] mt-16 md:mt-24 lg:mt-16  bg-gray-200 rounded-full flex justify-between items-center w-3/4 m-auto">
        {allProducts ? (
          <i className="fa-solid fa-magnifying-glass text-xl dark:text-white"></i>
        ) : (
          <i className="fas fa-spinner fa-spin dark:text-white  text-xl"></i>
        )}

        <input
        ref={inputRef}
          value={val}
          onFocus={handleFocus}
          type="text"
          onInput={handleSearch}
          className="bg-transparent  focus:!border-transparent p-2  border-0 text-black dark:text-white text-sm  w-full"
          placeholder="search for a product, category ,or brand.."
          
          disabled={!allProducts}
        />
        {(filteredProducts?.length > 0&&val!='') && (
          <div
            className={`w-full mt-2 absolute     bottom-0  left-0 right-0 top-full  dark:text-white z-20  rounded-lg`}
          >
            <div className="custom-scroll bg-gray-200 dark:bg-[#1F2937]  max-h-[30rem] py-5 overflow-y-scroll ">
              <p className=' w-full text-left text-[#0AAD0A] px-2 font-bold'>Matching Keywords</p>
              {filteredProducts?.map((p) => {
                return (
                  <>
                  <Link to={`/products/${p}`} >
                  <div className="p-2 w-full text-left  hover:bg-gray-300 dark:hover:bg-[#263a56]  hover:border-s-4 hover:border-s-[#0AAD0A]">
                      <p>{p}</p>
                    </div>
                  </Link>
                   
                  </>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
