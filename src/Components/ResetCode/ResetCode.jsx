import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function ResetCode() {
  let navigate=useNavigate();
  const [loading, setloading] = useState(null)
  function getresetCode(values) {
    setloading(true);
    
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      )
      .then((res) => {
        setloading(false);
        console.log(res);
        
        toast.success(`Correct Reset Code`, { position: "bottom-left" });
        navigate('/forget-password/reset-password')
      })
      .catch((res) => {setloading(false);
        toast.error(`Not valid resetcode`, { position: "bottom-left" });

      });
  }
  let validationSchema = yup.object().shape({
    resetCode: yup.string().required("resetcode is required "),
  });
  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: getresetCode,
    validationSchema,
  });
  return (
    <>
      <div className="my-24"> 
        <form onSubmit={formik.handleSubmit} class=" max-w-xl m-auto">
          <div className="p-16 bg-[#F8F9FA] rounded-2xl shadow-2xl">
          <h2 className="text-center text-[#0AAD0A] font-mono font-bold text-2xl my-3">Account Recovery</h2>
            <div class="mb-5">
              <label
                for="resetCode"
                className="block mb-2 text-lg  font-medium text-left text-[#0AAD0A]"
              >
                Your Code:
              </label>
              <input
                type="text"
                value={formik.values.resetCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="resetCode"
                id="resetCode"
                class="bg-white border focus:!border-[#0AAD0A] focus:border-2 text-gray-900 text-sm rounded-lg  block w-full"
                placeholder="enter you code.."
                
              />
               {formik.errors.resetCode && formik.touched.resetCode && (
            <div
              class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <svg
                class="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span class="sr-only">Info</span>
              <div>
                <span class="font-medium">{formik.errors.email}</span>
              </div>
            </div>
          )}
            </div>
           

            <button
              type="submit"
              class="text-white bg-[#0AAD0A]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full  px-5 py-2.5 text-center "
            >
              {loading ? <i className="fas fa-spinner fa-spin"></i> : <><span>Send Code<i class="fa-solid fa-paper-plane"></i></span></>}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
