import axios from "axios";
import { createContext, useState } from "react";

export let OrderContext=createContext();
export default function OrderContextProvider(props){
    const [loading, setloading] = useState(false)
    let headers={
        headers:{
            token:localStorage.getItem("Token")
        }
        
    }
    function checkout(cartId, url, data){
        setloading(true);
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{
            shippingAddress:data
            
        },headers).then((res)=>{
            setloading(false);
            console.log(res);
            
            return res
        }).catch((res)=>{
            setloading(false)
            console.log(res);
            return res;
            
        })
    }
    return <OrderContext.Provider value={{checkout,loading}}>
        {props.children}
    </OrderContext.Provider>
}