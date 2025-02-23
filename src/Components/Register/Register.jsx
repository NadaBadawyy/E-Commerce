import React, { useContext, useState } from "react";
import style from "./Register.module.css";
import { useFormik, validateYupSchema } from "formik";
import axios from "axios";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
export default function Register() {
  let { LoginData, setLoginData } = useContext(UserContext);
  let navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [ApiError, setApiError] = useState("");
  function handleRegister(values) {
    setloading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((res) => {
        setloading(false);
        localStorage.setItem("Token", res.data.token);
        setLoginData(res.data.token);
        toast.success('You Regitered Successfully',{ position: "bottom-left" })
        navigate("/");
      })
      .catch((res) => {
        setloading(false);
        toast.error(res.response.data.message,{ position: "bottom-left" })
        setApiError(res.response.data.message);
      });
  }
  let validation = yup.object().shape({
    name: yup
      .string()
      .min(3, "min length is 3 characters")
      .max(20, "max length is 20")
      .required("name is required"),
    email: yup.string().email("not valid email").required("email is required "),
    password: yup
      .string()
      .min(6, "min length is 6 characters")
      .required("password is required"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "enter a matched password")
      .required("repassword is required"),
    phone: yup
      .string()
      .matches(/^01[1205][0-9]{8}$/, "phone not valid ")
      .required("phone is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: handleRegister,
    validationSchema: validation,
  });
  return (
    <>
    <Helmet>
        <title>Register</title>
      </Helmet>
    <div className="flex justify-center items-center">
      <div className="w-full">

      <h2 className="text-3xl text-center font-bold font-mono mt-10 md:mt-24 dark:text-white ">Regiter Now</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-xl mx-auto mb-5 py-5"
      >
        {ApiError && (
          <div className="p-5 bg-red-500 text-white rounded-2xl mb-5 font-mono font-bold">
            {ApiError}
          </div>
        )}
        <div className="relative z-0 w-full my-7 group">
          <input
            type="text"
            name="name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full   dark:text-white text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#0AAD0A] peer text-sm"
            placeholder=" "
          />
          <label
            for="name"
            className="peer-focus:font-medium  dark:text-white absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0AAD0A] peer-focus:peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Name
          </label>
          {formik.errors.name && formik.touched.name && (
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
                <span class="font-medium">{formik.errors.name}</span>
              </div>
            </div>
          )}
        </div>
        <div className="relative z-0 w-full my-7 group">
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full dark:text-white text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#0AAD0A] peer"
            placeholder=" "
          />
          <label
            for="floating_email"
            className="peer-focus:font-medium dark:text-white absolute left-0 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0AAD0A] peer-focus:peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Email
          </label>
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
        <div className="relative z-0 w-full my-7 group">
          <input
            type="password"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full dark:text-white text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#0AAD0A] peer"
            placeholder=" "
          />
          <label
            for="floating_email"
            className="peer-focus:font-medium absolute dark:text-white left-0 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0AAD0A] peer-focus:peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Password
          </label>
          {formik.errors.password && formik.touched.password && (
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
                <span class="font-medium">{formik.errors.password}</span>
              </div>
            </div>
          )}
        </div>
        <div className="relative z-0 w-full my-7 group">
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full dark:text-white text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#0AAD0A] peer"
            placeholder=" "
          />
          <label
            for="floating_email"
            className="peer-focus:font-medium dark:text-white absolute left-0 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0AAD0A] peer-focus:peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your rePassword
          </label>
          {formik.errors.rePassword && formik.touched.rePassword && (
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
                <span class="font-medium">{formik.errors.rePassword}</span>
              </div>
            </div>
          )}
        </div>

        <div className="relative z-0 w-full my-7 group">
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full dark:text-white text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#0AAD0A] peer"
            placeholder=" "
          />
          <label
            for="floating_email"
            className="peer-focus:font-medium dark:text-white absolute left-0 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0AAD0A] peer-focus:peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Phone
          </label>
          {formik.errors.phone && formik.touched.phone && (
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
                <span class="font-medium">{formik.errors.phone}</span>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          class="text-white bg-[#0AAD0A]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center my-4 "
        >
          {loading ? <i className="fas fa-spinner fa-spin"></i> : "Submit"}
        </button>
      </form>
      </div>
    </div>
     
    </>
  );
}
