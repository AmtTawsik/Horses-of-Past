import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import blueTick from "../../assects/blueTick.png";
import { AuthContext } from "../../contexts/AuthContext";

const Product = ({ product }) => {
  const { user } = useContext(AuthContext);
  const [seller,setSeller] = useState({});
  
  const {
    img,
    _id,
    productName,
    isVarified,
    sellerLocation,
    resalePrice,
    orgPrice,
    yearsOfUse,
    postDate,
    sellerName,
    sellerEmail,
  } = product;

  useEffect(()=>{
    fetch(`http://localhost:5000/users/${sellerEmail}`)
    .then(res=>res.json())
    .then(data => setSeller(data))
  },[sellerEmail])

  const handleConfirmOrder = (event) => {
    event.preventDefault();
    const form = event.target;
    const buyersName = form.name.value;
    const buyersEmail = form.email.value;
    const productName = form.productName.value;
    const resalePrice = form.price.value;
    const number = form.number.value;
    const location = form.location.value;
    const booking = {
      buyersName,
      buyersEmail,
      productName,
      resalePrice,
      number,
      location,
      img,
    };
    console.log(booking);
    fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.acknowledged){
          toast.success('Product added Successfuly!')
          form.reset();
        }
      })
      .catch((err) => console.error(err));
  };
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
            <p>Location: {sellerLocation}</p>
            <p>Resale Price: ${resalePrice}</p>
            <p>Orginal Price: ${orgPrice}</p>
            <p>Years Of Use: {yearsOfUse} Years</p>
            <p>Post Time: {postDate}</p>
            <p className="flex items-center">
              Saler Name:{" "}
              {seller.isVarified && (
                <span className="mt-1">
                  <img style={{ width: "18px" }} src={blueTick} alt="" />
                </span>
              )}
              {sellerName}
            </p>
          </div>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">Report to Admin</div>
            <label htmlFor="my-modal" className="badge badge-outline">
              Book Now
            </label>
          </div>
        </div>
      </div>

      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Book This Product Now!</h3>
          <form onSubmit={handleConfirmOrder}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-primary undefined"
              >
                Full Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  readOnly
                  defaultValue={user?.displayName}
                  type="text"
                  name="name"
                  className="input input-bordered input-primary w-full"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  readOnly
                  defaultValue={user?.email}
                  type="text"
                  name="email"
                  className="input input-bordered input-primary w-full "
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-primary undefined"
              >
                Product Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  readOnly
                  defaultValue={productName}
                  type="text"
                  name="productName"
                  className="input input-bordered input-primary w-full "
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="Price"
                className="block text-sm font-medium text-primary undefined"
              >
                Price
              </label>
              <div className="flex flex-col items-start">
                <input
                  readOnly
                  defaultValue={`$${resalePrice}`}
                  type="Price"
                  name="price"
                  className="input input-bordered input-primary w-full "
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="number"
                className="block text-sm font-medium text-primary undefined"
              >
                Phone Number
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="number"
                  className="input input-bordered input-primary w-full "
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-primary undefined"
              >
                Meating Location
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="location"
                  className="input input-bordered input-primary w-full "
                  required
                />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <label htmlFor="my-modal" className="btn">
                Cancel
              </label>
              <button type="submit" className="modal-action">
                <label htmlFor="my-modal" className="btn">
                  Confirm Submit
                </label>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Product;
