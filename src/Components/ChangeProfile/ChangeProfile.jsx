import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TokenContex } from "../../Context/TokenContext";
export default function ChangeProfile() {
  let navigate = useNavigate();
  let {setdecodedToken}=useContext(TokenContex)
  const [loading, setloading] = useState(null);
  let t = localStorage.getItem("Token");
  function updateProfile(values) {
    setloading(true);
    axios
      .put(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`, values, {
        headers: {
          token: t
        }
      }).then((res) => {
        setloading(false);
        setdecodedToken(values);
        
        toast.success('Your Data Updated Successfully',{ position: "bottom-left" })
        navigate('/')
      })
      .catch((res) => {
        
        setloading(false);
       
        
      toast.error(res.response.data.errors.msg,{ position: "bottom-left" })

        
      });
  }
  let validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "min length is 3 characters")
      .max(20, "max length is 20")
      .required("name is required"),
    email: yup.string().email("not valid email").required("email is required "),
    phone: yup
      .string()
      .matches(/^01[1205][0-9]{8}$/, "phone not valid ")
      .required("phone is required"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
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
              Update Profile
            </h2>
            <div class="mb-5">
              <label
                for="name"
                className="block mb-2 text-lg capitalize  font-medium text-gray-900 text-left text-[#0AAD0A] dark:text-white"
              >
                Your name:
              </label>
              <input
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="name"
                id="name"
                class="bg-white border focus:!border-[#0AAD0A] focus:border-2 text-gray-900 text-sm rounded-lg  block w-full"
                placeholder="enter you name.."
                required
              />
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
            <div class="mb-5">
              <label
                for="email"
                className="block mb-2 text-lg capitalize font-medium text-gray-900 text-left text-[#0AAD0A] dark:text-white"
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
            <div class="mb-5">
              <label
                for="phone"
                className="block mb-2 text-lg  font-medium text-gray-900 text-left text-[#0AAD0A] dark:text-white"
              >
                Your Phone:
              </label>
              <input
                type="tel"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="phone"
                id="phone"
                class="bg-white border focus:!border-[#0AAD0A] focus:border-2 text-gray-900 text-sm rounded-lg  block w-full"
                placeholder="enter you phone.."
                required
              />
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
