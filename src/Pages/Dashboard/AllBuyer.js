import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loading from "../Shared/Loading";

const AllBuyer = () => {
  const {
    data: allBuyer = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allBuyer"],
    queryFn: async () => {
      const res = await fetch(`https://horses-of-past-server.vercel.app/users?role=buyer`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  const handleDelete = (email) => {
    fetch(`https://horses-of-past-server.vercel.app/users/${email}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Deleted Successfully");
          refetch();
        }
      });
  };

  if (isLoading) {
    <Loading></Loading>;
  }

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
            {allBuyer.map((buyer, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>
                  <span className="text-3xl">{buyer.name}</span>
                </td>
                <td>
                  <span className="text-3xl">{buyer.email}</span>
                </td>

                <td>
                  <button
                    onClick={() => handleDelete(buyer.email)}
                    className="btn btn-md  btn-error"
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

export default AllBuyer;
