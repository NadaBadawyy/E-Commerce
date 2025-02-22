import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import Products from "./Components/Products/Products";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFoundPage from "./Components/NotFoundPage/NotFoundPage";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import OrderContextProvider from "./Context/OrderContext";
import Checkout from "./Components/Checkout/Checkout";
import AllOrders from "./Components/AllOrders/AllOrders";
import Wishlist from "./Components/Wishlist/Wishlist";
import CategoryDetails from "./Components/CategoryDetails/CategoryDetails";
import WishlistContextProvider from "./Context/WishlistContext";
import BrandDetails from "./Components/BrandDetails/BrandDetails";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetCode from "./Components/ResetCode/ResetCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Profile from "./Components/Profile/Profile";
import ChangeProfile from "./Components/ChangeProfile/ChangeProfile";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import TokenContextProvider from "./Context/TokenContext";
import DarkSideProvider from "./Context/DarkSide";
import OrderDetails from "./Components/OrderDetails/OrderDetails";

function App() {
  const [count, setCount] = useState(0);

  let query = new QueryClient();
  let routes = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path:'/',
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          )
        },
        {
          path: "brands/:id/:brand",
          element: (
            <ProtectedRoute>
              <BrandDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories/:id/:cat",
          element: (
            <ProtectedRoute>
              <CategoryDetails />
            </ProtectedRoute>
          ),
        },
        {  
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile/change-profile",
          element: (
            <ProtectedRoute>
              <ChangeProfile />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile/change-password",
          element: (
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders/:id",
          element: (
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "forget-password/reset-code", element: <ResetCode /> },
        { path: "forget-password/reset-password", element: <ResetPassword /> },
        {
          path: "*",
          element: (
            <ProtectedRoute>
              <NotFoundPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "productdetails/:id/:category",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <UserContextProvider>
        <QueryClientProvider client={query}>
          <CartContextProvider>
            <OrderContextProvider>
              <WishlistContextProvider>
              <TokenContextProvider>
                <DarkSideProvider>
                <RouterProvider router={routes} />
                <ToastContainer/>

                </DarkSideProvider>
                
              </TokenContextProvider>
              </WishlistContextProvider>
              
              {/* <ReactQueryDevtools /> */}
              <Toaster />
            </OrderContextProvider>
          </CartContextProvider>
        </QueryClientProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
