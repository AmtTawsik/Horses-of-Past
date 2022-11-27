import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Main from "../layouts/Main";
import Blogs from "../Pages/Blogs/Blogs";
import AddProduct from "../Pages/Dashboard/AddProduct";
import AllBuyer from "../Pages/Dashboard/AllBuyer";
import AllSeller from "../Pages/Dashboard/AllSeller";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MyOrders from "../Pages/Dashboard/MyOrders";
import MyProducts from "../Pages/Dashboard/MyProducts";
import Payment from "../Pages/Dashboard/Payment/Payment";
import ReportedItems from "../Pages/Dashboard/ReportedItems";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Login/SignUp";
import Products from "../Pages/Products/Products";
import ErrorPage from "../Pages/Shared/ErrorPage";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

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
                path:'/blog',
                element:<Blogs></Blogs>
            },
            {
                path:'/categories/:brandName',
                element:<PrivateRoute><Products></Products></PrivateRoute>,
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
                element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            },
            {
                path:`/dashboard/myorders/:email`,
                element:<PrivateRoute><MyOrders></MyOrders></PrivateRoute>,
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
                element:<AdminRoute><AllBuyer></AllBuyer></AdminRoute>
            },
            {
                path:`/dashboard/allseller`,
                element:<AdminRoute><AllSeller></AllSeller></AdminRoute>
            },
            {
                path:`/dashboard/reporteditems`,
                element:<AdminRoute><ReportedItems></ReportedItems></AdminRoute>
            },
            {
                path:'/dashboard/payment/:id',
                element:<PrivateRoute><Payment></Payment></PrivateRoute>,
                loader:({params})=>fetch(`http://localhost:5000/bookings/${params.id}`)
            }
        ]
    }
])