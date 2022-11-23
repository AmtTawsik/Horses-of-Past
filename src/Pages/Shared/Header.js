import React, { useContext, useState } from "react";
import "../../App.css";
import { Link, NavLink } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";
import logo from '../../assects/logo.png'

const Header = () => {
  const [state, setState] = useState(false);

  const navigation = [
    { title: "Home", path: "/home" },
    { title: "Services", path: "/services" },
    { title: "Blogs", path: "/blog" },
  ];

  // use of useContext
  const { user, logOut } = useContext(AuthContext);
  // LogOut function
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  return (
    <nav className="bg-teal-200 w-full border-b md:border-0 md:static">
      <div className="items-center px-4  mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link to="/">
            <h1 className="font-extrabold text-4xl font-serif text-black flex items-center">
              <img style={{ width: "45px" }} src={logo} alt="" />
              <span>Horses of Past</span>
            </h1>
          </Link>
          <div className="md:hidden">
            {/* Burger Button */}
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-end items-center space-y-6 md:flex md:space-x-4 md:space-y-0 mr-0">
            {navigation.map((item, idx) => {
              return (
                <li key={idx}>
                  <NavLink
                    className="px-5 py-2 rounded-lg text-xl font-bold text-gray-800 hover:text-gray-50 hover:bg-purple-600"
                    to={item.path}
                  >
                    {item.title}
                  </NavLink>
                </li>
              );
            })}

            {user?.uid ? (
              <>
                <li>
                  <Link to="/myreviews">
                    <button className="px-5 py-2 rounded-lg text-xl font-bold text-gray-800 hover:text-gray-50 hover:bg-purple-600">
                      My reviews
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/addservice">
                    <button className="px-5 py-2 rounded-lg text-xl font-bold text-gray-800 hover:text-gray-50 hover:bg-fuchsia-600">
                      Add service
                    </button>
                  </Link>
                </li>
                <li>
                  <div
                    className="avatar tooltip md:tooltip-bottom tooltip-right tooltip-secondary"
                    data-tip={user?.displayName ? user.displayName : "User"}
                  >
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={user.photoURL} alt="" />
                    </div>
                  </div>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="px-5 py-2 rounded-lg text-xl font-bold text-gray-800 hover:text-gray-50 hover:bg-fuchsia-600"
                  >
                    <FaSignOutAlt></FaSignOutAlt>
                  </button>
                </li>
              </>
            ) : (
              <Link to="/login">
                <button className="px-5 py-2 rounded-lg text-xl font-bold text-gray-800 hover:text-gray-50 hover:bg-fuchsia-600">
                  Login
                </button>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
