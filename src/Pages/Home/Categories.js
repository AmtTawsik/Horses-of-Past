import React from "react";

const Categories = () => {
  return (
    <>
    <h2 className="text-center font-bold text-4xl mt-5">All Categories</h2>
      <div className="grid md:grid-cols-3 my-7 w-10/12 mx-auto">
        <div className="card w-96 bg-base-100 shadow-xl image-full">
          <figure>
            <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Palcher</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">See All products</button>
            </div>
          </div>
        </div>

        <div className="card w-96 bg-base-100 shadow-xl image-full">
          <figure>
            <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Palcher</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">See All products</button>
            </div>
          </div>
        </div>

        <div className="card w-96 bg-base-100 shadow-xl image-full">
          <figure>
            <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Palcher</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">See All products</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
