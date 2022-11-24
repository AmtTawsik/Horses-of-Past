import React from 'react';
import blueTick from '../../assects/blueTick.png'

const Product = ({product}) => {
    return (
        <div>
            <div key={product._id} className="card w-100 bg-base-100 shadow-xl">
            <figure>
              <img className="w-full" src={product.img} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {product.productName}
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <div>
              <p>Location: {product.sellerLocation}</p>
              <p>Resale Price: ${product.resalePrice}</p>
              <p>Orginal Price: ${product.orgPrice}</p>
              <p>Years Of Use: {product.yearsOfUse} Years</p>
              <p>Post Time: {product.postDate}</p>
              <p className="flex items-center">Saler Name: {product.isVarified && <span className="mt-1"><img style={{width:'15px'}} src={blueTick} alt="" /></span>}{product.sellerName}</p>
              </div>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">Report to Admin</div>
                <div className="badge badge-outline">Book Now</div>
              </div>
            </div>
          </div>
        </div>
    );
};

export default Product;