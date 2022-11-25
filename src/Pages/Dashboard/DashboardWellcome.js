import React from "react";
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
          <button className="btn btn-primary">Back to Home Page</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardWellcome;
