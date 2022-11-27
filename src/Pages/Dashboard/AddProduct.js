import { data } from "autoprefixer";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleAddProduct = (event) => {
    event.preventDefault();
    const form = event.target;
    const isVarified = false;
    const orgPrice = form.orgPrice.value;
    const resalePrice = form.resalePrice.value;
    const yearsOfUse = form.yearsOfUse.value;
    const postDate = new Date().toUTCString();
    const img = form.img.value;
    const productName = form.productName.value;
    const sellerName = user?.displayName;
    const categoryName = form.categoryName.value;
    const sellerLocation = form.sellerLocation.value;
    const sellerEmail = user?.email;
    const sellerPhone = form.sellerPhone.value;
    const disc = form.disc.value;
    const booking = {
      isVarified,
      orgPrice,
      resalePrice,
      yearsOfUse,
      postDate,
      img,
      productName,
      sellerName,
      categoryName,
      sellerLocation,
      sellerEmail,
      sellerPhone,
      disc,
      isAvailable:true,
    };
    console.log(booking);
    fetch("http://localhost:5000/product", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success("Product Added Successfuly");
          navigate("/dashboard/myproducts/");
          form.reset();
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-900 dark:text-gray-100">
        <form
          onSubmit={handleAddProduct}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <input
            required
            type="text"
            name="productName"
            id="productName"
            placeholder="Product Name"
            className="border w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
          />

          <input
          required
            type="text"
            name="img"
            id="img"
            placeholder="Product Image"
            className="border w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
          />

          <input
          required
            type="text"
            name="orgPrice"
            id="orgPrice"
            placeholder="Orginal Price"
            className="border w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
          />
          <input
          required
            type="text"
            name="resalePrice"
            id="resalePrice"
            placeholder="Resale Price"
            className="border w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
          />

          <input
          required
            type="text"
            name="yearsOfUse"
            id="yearsOfUse"
            placeholder="Years Of Use"
            className="border w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
          />

          <div className="space-y-1 text-sm">
            <label className="block dark:text-gray-400">Condition?</label>
            <select
              name="role"
              className="border w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
            >
              <option value="Excellent" defaultValue>
                Excellent
              </option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
          </div>

          <div className="space-y-1 text-sm">
            <label className="block dark:text-gray-400">
              Select Product Category
            </label>
            <select
              name="categoryName"
              className="border w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
            >
              <option value="YAMAHA" defaultValue>
                YAMAHA
              </option>
              <option value="HERO">HERO</option>
              <option value="BAJAJ">BAJAJ</option>
            </select>
          </div>

          <input
          required
            type="sellerLocation"
            name="sellerLocation"
            id="sellerLocation"
            placeholder="Sellers Location"
            className="border w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
          />

          <input
          required
            type="Sellers Number"
            name="sellerPhone"
            id="sellerPhone"
            placeholder="sellerPhone"
            className="border w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
          />

          <textarea
          required
            name="disc"
            className="border w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
            placeholder="About Your Product"
          ></textarea>

          <div>
            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
