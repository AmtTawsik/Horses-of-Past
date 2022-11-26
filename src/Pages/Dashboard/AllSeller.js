import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { async } from "@firebase/util";
import axios from "axios";
import toast from "react-hot-toast";

const AllSeller = () => {
  const {
    data: allSeller = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allSeller"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/users?role=seller`);
      const data = res.json();
      return data;
    },
  });

  const handleVarify = (email) => {
    fetch(`http://localhost:5000/users/${email}`, {
          method: "PUT",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              toast.success("Updated Succesfully");
              refetch();
            }
          });
  };
  const handleDelete = (email) => {
    fetch(`http://localhost:5000/users/${email}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if(data.deletedCount > 0){
              toast.success('Deleted Successfully')
              refetch();
            }
          });
  };

  return (
    <div>
      <h2 className="text-4xl text-center font-bold mb-5">All Seller</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th className="text-3xl">Name</th>
              <th className="text-3xl">Email</th>
              <th className="text-3xl">Varify</th>
              <th className="text-3xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {allSeller.map((seller, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>
                  <span className="text-3xl">{seller.name}</span>
                </td>
                <td>
                  <span className="text-3xl">{seller.email}</span>
                </td>
                <td>
                  <button
                    onClick={() => handleVarify(seller.email)}
                    className="btn btn-secondary"
                  >
                    {seller.isVarified ? "Varified" : "Not Varified"}
                  </button>
                </td>
                <td>
                  <button onClick={()=>handleDelete(seller.email)} className="btn btn-md  btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center my-10">
        <Link to="/" className="btn btn-primary">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default AllSeller;
