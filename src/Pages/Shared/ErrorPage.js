import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import space from "../../assects/space.jpg";
import space1 from '../../assects/space-1.jpg'

const ErrorPage = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${space1})` }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="font-extrabold text-9xl text-red-500">404</h1>
          <h3 className="mb-5 text-4xl font-bold text-white">
            <span className="text-lime-400">Opps!</span> Looks Like You Are Lost
            In Space
          </h3>

          <Link to="/home">
            <button className="btn btn-primary">
              Go Back To Home <FaHome></FaHome>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
