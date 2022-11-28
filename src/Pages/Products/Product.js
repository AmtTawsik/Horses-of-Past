import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import blueTick from "../../assects/blueTick.png";
import { AuthContext } from "../../contexts/AuthContext";
import Moddal from "../Home/Moddal";

const Product = ({ product,setSelectProduct,selectProduct }) => {
  const { user } = useContext(AuthContext);
  const [seller,setSeller] = useState({});
  
  
  const {
    img,
    _id,
    isVarified,
    productName,
    sellerLocation,
    resalePrice,
    orgPrice,
    yearsOfUse,
    postDate,
    sellerName,
    sellerEmail,
    disc
  } = product;


  useEffect(()=>{
    fetch(`https://horses-of-past-server.vercel.app/users/${sellerEmail}`)
    .then(res=>res.json())
    .then(data => setSeller(data))
  },[sellerEmail])

  const handleReport = (id) => {
    fetch(`https://horses-of-past-server.vercel.app/report/${id}`, {
          method: "PUT",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              toast.success("Reported Successfully");
            }
          });
  };

  if(!product.isAvailable){
    return;
  }
  return (
    <div>
      <div className="card w-100 bg-base-100 shadow-xl">
        <figure>
          <img
            style={{ height: "320px" }}
            className="w-full"
            src={img}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {productName}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <div>
            <p>Discription:{disc}</p>
            <p>Location: {sellerLocation}</p>
            <p>Resale Price: ${resalePrice}</p>
            <p>Orginal Price: ${orgPrice}</p>
            <p>Years Of Use: {yearsOfUse} Years</p>
            <p>Post Time: {postDate}</p>
            <p className="flex items-center">
              {/* Saler Name:{" "} */}
              {seller.isVarified && (
                <span className="mt-1">
                  <img style={{ width: "18px" }} src={blueTick} alt="" />
                </span>
              )}
              {sellerName}
            </p>
          </div>
          {/* className="badge badge-outline" */}
          <div className="card-actions justify-end">
            <label onClick={()=>handleReport(_id)} className="btn btn-xs btn-error">Report to Admin</label>
            <label className="btn btn-xs btn-info" onClick={()=>setSelectProduct(product)} htmlFor="my-modal">
              Book Now
            </label>
          </div>
        </div>
      </div>
      {/* {
        selectProduct && <Moddal selectProduct={selectProduct} setSelectProduct={setSelectProduct}></Moddal>
      } */}
    </div>
  );
};

export default Product;
