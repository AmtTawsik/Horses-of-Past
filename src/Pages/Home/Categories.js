import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("https://horses-of-past-server.vercel.app/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);
  return (
    <>
      <h2 className="text-center font-bold text-4xl mt-5">All Categories</h2>
      <div className="grid md:grid-cols-3 gap-4 my-7 w-5/6 mx-auto">
        {categories.map((category) => (
          <div
            key={category._id}
            className="card card-compact w-100 bg-base-100 shadow-2xl"
          >
            <figure>
              <img
                className="w-full"
                style={{ height: "220px" }}
                src={category.picture}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{category.brandName}</h2>
              <p>Number One Product In This World!</p>
              <div className="card-actions justify-end">
                <Link
                  to={`/categories/${category.brandName}`}
                  className="btn btn-primary"
                >
                  See All Products
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Categories;
