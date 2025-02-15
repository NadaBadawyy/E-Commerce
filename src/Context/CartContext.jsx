import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export let CartContext = createContext();
export default function CartContextProvider(props) {
  const [CartId, setCartId] = useState(0);
  const [noItems, setnoItems] = useState(0)
        let {LoginData,setLoginData}=useContext(UserContext);
  
  let headers = { headers: { token: localStorage.getItem("Token") } };
  function addProduct(pid) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: pid,
        },
        headers
      )
      .then((res) => res)
      .catch((res) => res);
  }
  function GetLoggedUserCarts() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, headers)
      .then((res) => { 
        setnoItems(res.data.numOfCartItems)
   
        
        setCartId(res.data.cartId)
        return res
      })
      .catch((res) => res);
  }
  function updateCartQuantity(pid, newcount ) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${pid}`,
        { count: newcount },
        headers
      )
      .then((res) => res)
      .catch((res) => res);
  }
  function deleteCartItem(pid) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${pid}`, headers)
      .then((res) => res)
      .catch((res) => res);
  }
  useEffect(()=>{
    if(LoginData){
      GetLoggedUserCarts()
    }
    
  },[noItems,LoginData])
  return (
    <CartContext.Provider
      value={{
        addProduct,
        GetLoggedUserCarts,
        updateCartQuantity,
        deleteCartItem,
        CartId,noItems,setnoItems
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
