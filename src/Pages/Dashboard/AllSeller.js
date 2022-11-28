import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loading from "../Shared/Loading";

const AllSeller = () => {
  const {
    data: allSeller = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allSeller"],
    queryFn: async () => {
      const res = await fetch(`https://horses-of-past-server.vercel.app/users?role=seller`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  const handleVarify = (email) => {
    fetch(`https://horses-of-past-server.vercel.app/users/${email}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          toast.success("Updated Succesfully");
        }
      });
  };
  const handleDelete = (email) => {
    fetch(`https://horses-of-past-server.vercel.app/users/${email}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success("Deleted Successfully");
        }
      });
  };

  if (isLoading) {
    <Loading></Loading>;
  }

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
              <th className="text-3xl">Status</th>
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
                    className="btn btn-xs btn-secondary"
                  >
                    {seller.isVarified
                      ? "Varified"
                      : "unverified, Click to verify"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(seller.email)}
                    className="btn btn-sm  btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSeller;
