import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Moddal from "../Home/Moddal";
import Loading from "../Shared/Loading";
import Product from "./Product";

const Products = () => {
  // const {setLoading,loading}=useContext(AuthContext);
  // setLoading(true)
  const products = useLoaderData();
  console.log(products)
  const [selectProduct,setSelectProduct] = useState(null)
  // setLoading(false)
  // if(loading){
  //   <Loading></Loading>
  // }
  return (
    <div>
      <h2 className="text-center font-bold text-4xl">
        All Producst for This Category
      </h2>
      <div className="grid md:grid-cols-3 gap-4 my-7 w-11/12 mx-auto">
        {products.map((product) => <Product setSelectProduct={setSelectProduct} selectProduct={selectProduct} key={product._id} product={product}></Product>)}
      </div>
      {
        selectProduct && <Moddal selectProduct={selectProduct} setSelectProduct={setSelectProduct}></Moddal>
      }
    </div>
  );
};

export default Products;
