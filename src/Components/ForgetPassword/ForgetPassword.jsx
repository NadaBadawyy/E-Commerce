import React, { useState } from "react";
import style from "./ForgetPassword.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function ForgetPassword() {
  let navigate=useNavigate();
  const [loading, setloading] = useState(null)
  function sendEmail(values) {
    setloading(true)
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      )
      .then((res) => {
        setloading(false);
        toast.success(`${res.data.message}`, { position: "bottom-left" });
        navigate('/forget-password/reset-code')
      })
      .catch((res) => {setloading(false)});
  }
  let validationSchema = yup.object().shape({
    email: yup.string().email("not valid email").required("email is required "),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: sendEmail,
    validationSchema,
  });
  return (
    <>
    <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <div className="my-24">
        
        <form onSubmit={formik.handleSubmit} class=" max-w-xl m-auto">
          <div className="p-16 bg-[#F8F9FA] dark:bg-[#1F2937] rounded-2xl shadow-2xl">
          <h2 className="text-center text-[#0AAD0A] font-mono font-bold text-2xl my-3">Account Recovery</h2>
            <div class="mb-5">
              <label
                for="email"
                className="block mb-2 text-lg  font-medium text-gray-900 text-left text-[#0AAD0A] dark:text-white"
              >
                Your email:
              </label>
              <input
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
                id="email"
                class="bg-white border focus:!border-[#0AAD0A] focus:border-2 text-gray-900 text-sm rounded-lg  block w-full"
                placeholder="enter you email.."
                required
              />
               {formik.errors.email && formik.touched.email && (
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
              {loading ? <i className="fas fa-spinner fa-spin"></i> : <><span>Send Email <i class="fa-solid fa-paper-plane"></i></span></>}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
