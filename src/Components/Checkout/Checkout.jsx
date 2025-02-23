import React, { useContext, useState } from "react";
import style from "./Checkout.module.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { OrderContext } from "../../Context/OrderContext";
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
export default function Checkout() {
const [payment, setpayment] = useState(null)
  let navigate =useNavigate()
  let { CartId ,setnoItems} = useContext(CartContext);
  let { checkout,loading,cashCheckout } = useContext(OrderContext);
  async function checkoutfunc(cId, url) {
    
    if(payment=='cash'){
      let res=await cashCheckout(cId,formik.values)
      
      if(res?.data?.status=='success'){
        toast.success('You Paid by Cash Successfully',{position:'bottom-left'})
        setnoItems(0);
        navigate('/allorders')
      }
      else{
        toast.error('No Items in Your Cart',{position: 'bottom-left'})
        
      }
      
    }
     
    else{
      let {data}= await checkout(cId, url, formik.values);

    window.location.href=data.session.url
      
    }
  }
  let checkoutValidation = yup.object().shape({
    details: yup
      .string()
      .min(3, "details should be at least 3 characters")
      .required("details is required"),
    city: yup
      .string()
      .min(3, "city should be at least 3 characters")
      .required("city is required"),
    phone: yup.string().matches(/^01[1205][0-9]{8}/, "Phone not valid").required("city is required"),
  });
  let formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    validationSchema: checkoutValidation,
    onSubmit: () => checkoutfunc(CartId, "https://nadabadawy-ecommerce.vercel.app/%23")
    
  });
  
  const handlePayment=(e)=>{
    setpayment(e.target.value);
  }
  return (
    <>
    <Helmet>
        <title>Checkout</title>
      </Helmet>
      <form className="max-w-xl m-auto  p-10 md:p-0 mt-24 mb-5 py-5" onSubmit={formik.handleSubmit}>
      <div className="relative z-0 w-full my-10 group">
          <input
            type="details"
            name="details"
            id="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 pt-3 px-0 dark:text-white w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
            placeholder=" "
          />
          <label
            htmlFor="details"
            className=" peer-focus:font-medium absolute dark:text-white left-0 text-lg text-gray-500  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0AAD0A] peer-focus:peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
          >
            Enter Your details
          </label>
          {formik.errors.details && formik.touched.details && (
            <div
              className="flex items-center p-4 mb-4 text-lg text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">{formik.errors.details}</span>
              </div>
            </div>
          )}
        </div>
      <div className="relative z-0 w-full my-10 group">
          <input
            type="city"
            name="city"
            id="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 pt-3 pt-3 px-0 dark:text-white w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
            placeholder=" "
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute dark:text-white left-0 text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0AAD0A] peer-focus:peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
          >
            Enter Your city
          </label>
          {formik.errors.city && formik.touched.city && (
            <div
              className="flex items-center p-4 mb- text-lg text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">{formik.errors.city}</span>
              </div>
            </div>
          )}
        </div>
      <div className="relative z-0 w-full my-10 group">
          <input
            type="phone"
            name="phone"
            id="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 pt-3 px-0 dark:text-white w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute dark:text-white left-0 text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0AAD0A] peer-focus:peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your phone
          </label>
          {formik.errors.phone && formik.touched.phone && (
            <div
              className="flex items-center p-4 mb-4 text-lg text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">{formik.errors.phone}</span>
              </div>
            </div>
          )}
        </div>
        <div className="payment flex justify-around items-center">
          <div className="" onChange={(e)=>{}}>
          <input type="radio" id="cash" value={'cash'} name="input" className="mx-3  "  onChange={handlePayment}/>
          <label htmlFor="cash" className="input dark:text-white">Cash</label>
            
          </div>
          <div className="">
          <input type="radio" id="visa" value={'visa'} name="input" className="mx-3  " onChange={handlePayment} />
          <label htmlFor="visa" className="input dark:text-white">Card</label>
          </div>
          
         
        </div>
        <button
          type="submit"
          className="btn  px-5 py-2.5 text-center my-4 "
        >
        {loading ? <i className="fas fa-spinner fa-spin"></i> : "Checkout"}
        </button>
        
      </form>
    </>
  );
}
