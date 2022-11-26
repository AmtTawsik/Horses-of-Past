import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const [myProducts, setMyProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${user?.email}`)
      .then((res) => {
        setMyProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user?.email,myProducts]);

  const handleAdvertize = (_id) => {     
    fetch(`http://localhost:5000/products/${_id}`, {
          method: "PUT",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              toast.success("Updated Succesfully");
            }
          });
  };

  return (
    <div>
  <h2 className="text-4xl text-center font-bold mb-5">My Products</h2>
  <div className="overflow-x-auto">
    <table className="table w-full">
      <thead>
        <tr>
          <th></th>
          <th className='text-3xl'>Image</th>
          <th className='text-3xl'>Name</th>
          <th className='text-3xl'>Price</th>
          <th className='text-3xl'>Status</th>
          <th className='text-3xl'></th>
        </tr>
      </thead>
      <tbody>
        {myProducts.map((myProduct, idx) => (
          <tr key={idx}>
            <td></td>
            <td><img className='rounded-xl' style={{width:'100px'}} src={myProduct.img} alt="" /></td>
            <td><span className='text-3xl'>{myProduct.productName}</span></td>
            <td><span className='text-3xl'>${myProduct.resalePrice}</span></td>
            <td><div className="text-3xl text-secondary">Available</div></td>
            <td><button onClick={()=>handleAdvertize(myProduct._id)} className="btn btn-md  btn-info">{myProduct.isAdvertized? 'Advertized' : 'Make Advertize'}</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div className='text-center my-10'><Link to='/' className='btn btn-primary'>Go Back Home</Link></div>
</div>
);
};

export default MyProducts;
