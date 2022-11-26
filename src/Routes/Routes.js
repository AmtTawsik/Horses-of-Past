import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Main from "../layouts/Main";
import AddProduct from "../Pages/Dashboard/AddProduct";
import AllBuyer from "../Pages/Dashboard/AllBuyer";
import AllSeller from "../Pages/Dashboard/AllSeller";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MyOrders from "../Pages/Dashboard/MyOrders";
import MyProducts from "../Pages/Dashboard/MyProducts";
import Payment from "../Pages/Dashboard/Payment/Payment";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Login/SignUp";
import Products from "../Pages/Products/Products";
import ErrorPage from "../Pages/Shared/ErrorPage";

export const routes = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/home',
                element:<Home></Home>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/signup',
                element:<SignUp></SignUp>
            },
            {
                path:'/categories/:brandName',
                element:<Products></Products>,
                loader: ({params}) => fetch(`http://localhost:5000/categories/${params.brandName}`)
            },
        ]
    },
    {
        path:'/dashboard',
        element:<DashboardLayout></DashboardLayout>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:'/dashboard',
                element:<Dashboard></Dashboard>
            },
            {
                path:`/dashboard/myorders/:email`,
                element:<MyOrders></MyOrders>,
                loader:({params})=>fetch(`http://localhost:5000/booking/${params.email}`)
            },
            {
                path:`/dashboard/myproducts/`,
                element:<MyProducts></MyProducts>
            },
            {
                path:`/dashboard/addproduct`,
                element:<AddProduct></AddProduct>
            },
            {
                path:`/dashboard/allbuyer`,
                element:<AllBuyer></AllBuyer>
            },
            {
                path:`/dashboard/allseller`,
                element:<AllSeller></AllSeller>
            },
            {
                path:'/dashboard/payment/:id',
                element:<Payment></Payment>,
                loader:({params})=>fetch(`http://localhost:5000/bookings/${params.id}`)
            }
        ]
    }
])