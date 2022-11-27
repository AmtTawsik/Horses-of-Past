import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";

const Moddal = ({ setSelectProduct, selectProduct }) => {
  const { user } = useContext(AuthContext);
  const { img, _id, productName, resalePrice } = selectProduct;
  console.log(productName);

  const handleConfirmOrder = (event) => {
    event.preventDefault();
    const form = event.target;
    // form.reset();
    const buyersName = form.name.value;
    const buyersEmail = user.email;
    const number = form.number.value;
    const location = form.location.value;
    const booking = {
      buyersName,
      buyersEmail,
      productName,
      productId: _id,
      resalePrice,
      number:number,
      location:location,
      img,
    };
    console.log('booking....',booking);
    fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Product added Successfuly!");
          
          setSelectProduct(null);
          form.reset();
        }
        else{
          toast.error('Already Booked')
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Book This Product Now!</h3>

          <div className="mb-1">
              <label htmlFor="" className="block text-sm font-medium text-primary undefined">Product Name</label>
              <div className="flex flex-col items-start border border-primary py-2 rounded-lg">
                <h2 className="px-3 py-1">
                  <span className="">{productName}</span>
                </h2>
              </div>
            </div>

            <div className="mb-1">
              <label htmlFor="" className="block text-sm font-medium text-primary undefined">Product Price</label>
              <div className="flex flex-col items-start border border-primary py-2 rounded-lg">
                <h2 className="px-3 py-1">
                  <span className="">${resalePrice}</span>
                </h2>
              </div>
            </div>

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

            <div>
              <label
                className="block text-sm font-medium text-primary undefined"
              >
                Phone Number
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="number"
                  className="input input-bordered input-primary w-full"
                  required
                />
              </div>
            </div>

            <div className="flex items-end justify-between">
              <label onClick={()=>setSelectProduct(null)} htmlFor="my-modal" className="btn">
                Cancel
              </label>
              <button type="submit" className="modal-action">
                <label htmlFor="my-modal" className="btn">
                  Confirm Submit
                </label>
              </button>
              {/* <label htmlFor="booking-modal"><input className='btn btn-accent w-full' type="submit" value="Submit" /></label> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Moddal;
