import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const AllBuyer = () => {
  const {
    data: allbuyer = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allbuyer"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/users?role=buyer`);
      const data = res.json();
      return data;
    },
  });
  console.log(allbuyer);
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
      <h2 className="text-4xl text-center font-bold mb-5">All Buyer</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th className="text-3xl">Name</th>
              <th className="text-3xl">Email</th>
              <th className="text-3xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {allbuyer.map((buyer, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>
                  <span className="text-3xl">{buyer.name}</span>
                </td>
                <td>
                  <span className="text-3xl">{buyer.email}</span>
                </td>
                <td>
                  <button onClick={()=>handleDelete(buyer.email)} className="btn btn-md  btn-error">Delete</button>
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

export default AllBuyer;
