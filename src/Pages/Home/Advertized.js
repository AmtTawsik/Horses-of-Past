import { useQuery } from "@tanstack/react-query";
import React from "react";
import Product from "../Products/Product";
import Loading from "../Shared/Loading";
import Add from "./Add";
import Moddal from "./Moddal";

const Advertized = () => {
  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`https://horses-of-past-server.vercel.app/advertize`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = res.json();
      return data;
    },
  });

  if (isLoading) {
    <Loading></Loading>;
    refetch()
  }
  console.log(products);
  return (
    <>
      {products.length > 0 && (
        <div>
          <h1 className="text-center text-5xl font-bold text-secondary mt-5">
            All Advertized Product
          </h1>
          <div className="grid md:grid-cols-3 gap-4 my-7 w-10/12 mx-auto">
            {products.map((product, idx) => (
              <Add key={idx} product={product}></Add>
            ))}
          </div>
        </div>
      )}
      {/* <Moddal></Moddal> */}
    </>
  );
};

export default Advertized;
