import {  useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { data } from 'react-router-dom'

export default function useProducts() {
      const [currentPage, setCurrentPage] = useState(1);
      const [npages, setnpages] = useState(null)
      const onPageChange = (page) => setCurrentPage(page);
    async function getProducts(){
        let res= await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${currentPage}`);
        setnpages(res.data.metadata.numberOfPages)
        console.log(res.data);
        
        return res
    }
    async function getSpecificProducts(cat){
        let x= await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        let res=x.data.data.filter((c)=>{return c.category.name==cat
        })
        return res
        
        
    }
    async function getSpecificBrandProducts(brand){
        let x= await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        let res=x.data.data.filter((b)=>{return b.brand.name==brand
        })
        return res;
    }
   
    let productIfo=useQuery({
        queryKey:[`products-${currentPage}`],
        queryFn:getProducts,
        staleTime:7000,
        select:(data)=>{

            return data.data.data
        }
    })
  return {productIfo,currentPage,onPageChange,getSpecificProducts, getSpecificBrandProducts,npages,setCurrentPage}
}
