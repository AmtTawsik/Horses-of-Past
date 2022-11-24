import React from "react";
import { useLoaderData } from "react-router-dom";
import Product from "./Product";

const Products = () => {
  const products = useLoaderData();
  console.log(products)
  
  return (
    <div>
      <h2 className="text-center font-bold text-4xl">
        All Producst for This Category
      </h2>
      <div className="grid md:grid-cols-3 gap-4 my-7 w-11/12 mx-auto">
        {products.map((product) => <Product key={product._id} product={product}></Product>)}
      </div>
    </div>
  );
};

export default Products;
