import React from "react";
import { Link } from "react-router-dom";
import dBg from '../../assects/dBg.webp'

const DashboardWellcome = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${dBg})` }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="">
          <h1 className="mb-5 text-3xl md:text-5xl lg:text-8xl font-bold">Wellcome to Dashboard</h1>
          <Link to='/' className="btn btn-primary">Back to Home Page</Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardWellcome;
