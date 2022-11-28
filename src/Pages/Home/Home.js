import React from "react";
import AboutUs from "./AboutUs";
import Advertized from "./Advertized";
import Banner from "./Banner";
import Categories from "./Categories";
import FaQ from "./FaQ";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Categories></Categories>
      <AboutUs></AboutUs>
      <Advertized></Advertized>
      <FaQ></FaQ>
    </div>
  );
};

export default Home;
