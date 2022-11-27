import { async } from "@firebase/util";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Loading from "../Shared/Loading";

const DashboardHeader = () => {
  const {user,logOut,loading} = useContext(AuthContext);
  
    // const {
    //   data: currentUser = {},
    //   refetch,
    //   isLoading,
    // } = useQuery({
    //   queryKey: ["currentUser"],
    //   queryFn: async () => {
    //     const res = await fetch(`http://localhost:5000/users/${user?.email}`);
    //     const data = await res.json();
    //     return data;
    //   },
    // });

    useEffect(()=>{
      fetch(`http://localhost:5000/users/${user?.email}`)
      .then(res=>res.json())
      .then(data =>setCurrentUser(data))
    },[user?.email])
    const [currentUser,setCurrentUser] = useState({});
    const role = currentUser.role;
    const handleLogout = () =>{
      logOut();
    }
    if(loading){
      return <Loading></Loading>
    }
  return (
    <div className="navbar bg-teal-200">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {
                role === 'buyer' && <div>
                <li>
                  <Link to={`/dashboard/myorders/${user?.email}`}>My Orders</Link>
                </li>
              </div>
            }

            {
                role === 'seller' && <div>
                <li>
                  <Link to='/dashboard/addproduct'>Add Product</Link>
                </li>
                <li>
                  <Link to={`/dashboard/myproducts`}>My Products</Link>
                </li>
                <li>
                  <Link>My Buyers</Link>
                </li>
              </div>
            }

            {
                role === 'admin' && <div>
                <li>
                  <Link to='/dashboard/allbuyer'>All Buyers</Link>
                </li>
                <li>
                  <Link to='/dashboard/allseller'>All Sellers</Link>
                </li>
                <li>
                  <Link to='/dashboard/reporteditems'>Reported Items</Link>
                </li>
              </div>
            }
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to='/' className="btn btn-ghost normal-case text-xl">Home</Link>
        <Link to='/dashboard' className="btn btn-ghost normal-case text-xl">Dashboard</Link>
        <Link to='/login' className="btn btn-ghost normal-case text-xl" onClick={handleLogout}>Log Out</Link>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
