import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
export default function ChangePassword() {
  let navigate = useNavigate();
  const [loading, setloading] = useState(null);
  let t = localStorage.getItem("Token");
  function updateProfile(values) {
    setloading(true);
    axios
      .put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`, values, {
        headers: {
          token: t,
        },
      })
      .then((res) => {
        setloading(false);
        console.log(res);
        
        toast.success("Your Password Updated Successfully", {
          position: "bottom-left",
        });
        navigate("/");
      })
      .catch((res) => {
        setloading(false);
        console.log(res);
        
        toast.error(res.response.data.errors.msg, { position: "bottom-left" });
      });
  }
  let validationSchema = yup.object().shape({
    currentPassword: yup
      .string()
      .min(6, "min length is 6 characters")
      .required("password is required"),
    password: yup
      .string()
      .min(6, "min length is 6 characters")
      .required("password is required"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "enter a matched password")
      .required("repassword is required"),
  });
  let formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    onSubmit: updateProfile,
    validationSchema,
  });
  return (
    <>
      <div className="my-24">
        <form onSubmit={formik.handleSubmit} class=" max-w-xl m-auto">
          <div className="p-16 bg-[#F8F9FA] dark:bg-[#1F2937] rounded-2xl shadow-2xl">
            <h2 className="text-center text-[#0AAD0A] font-mono font-bold text-2xl my-3">
              Update Password
            </h2>
            <div class="mb-5">
              <label
                for="name"
                className="block mb-2 text-lg capitalize  font-medium text-gray-900 text-left text-[#0AAD0A] dark:text-white"
              >
                Your currentPassword:
              </label>
              <input
                type="text"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="currentPassword"
                id="currentPassword"
                class="bg-white border focus:!border-[#0AAD0A] focus:border-2 text-gray-900 text-sm rounded-lg  block w-full"
                placeholder="enter you currentPassword.."
                required
              />
              {formik.errors.currentPassword && formik.touched.currentPassword && (
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
                    <span class="font-medium">{formik.errors.currentPassword}</span>
                  </div>
                </div>
              )}
            </div>
            <div class="mb-5">
              <label
                for="password"
                className="block mb-2 text-lg capitalize font-medium text-gray-900 text-left text-[#0AAD0A] dark:text-white"
              >
                Your password:
              </label>
              <input
                type="text"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="password"
                id="password"
                class="bg-white border focus:!border-[#0AAD0A] focus:border-2 text-gray-900 text-sm rounded-lg  block w-full"
                placeholder="enter you password.."
                required
              />
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
            <div class="mb-5">
              <label
                for="rePassword"
                className="block mb-2 text-lg  font-medium text-gray-900 text-left text-[#0AAD0A] dark:text-white"
              >
                Your rePassword:
              </label>
              <input
                type="text"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="rePassword"
                id="rePassword"
                class="bg-white border focus:!border-[#0AAD0A] focus:border-2 text-gray-900 text-sm rounded-lg  block w-full"
                placeholder="enter you rePassword.."
                required
              />
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
            <Link to={'/forget-password'}>
        <h5 className="text-xl my-3 text-[#0AAD0A] text-left underline ">Forget Password</h5>
        </Link>
            <button
              type="submit"
              class="text-white bg-[#0AAD0A]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full  px-5 py-2.5 text-center "
            >
              {loading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <>
                  <span>
                    Update <i class="fa-solid fa-pen-to-square"></i>
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
