import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export let WishlistContext=createContext();


export default function WishlistContextProvider({children}){
    const [favCount, setfavCount] = useState(0)
      let {LoginData,setLoginData}=useContext(UserContext);
    let headers={headers:{token:localStorage.getItem('Token')}};

async function addToWishlist(pid){
    let res=await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId:pid},headers)
    return res;
}
async function getWishList(){
    let res= await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,headers);
    setfavCount(res.data.count)
    return res;
}
async function removeWishlist(id){
    let res=await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,headers);
    return res;
}
useEffect(()=>{
    if(LoginData){
        getWishList();
    }
   
},[LoginData])
    

    return <WishlistContext.Provider value={{addToWishlist,getWishList,removeWishlist,favCount,setfavCount}}>
        {children}
    </WishlistContext.Provider>
}