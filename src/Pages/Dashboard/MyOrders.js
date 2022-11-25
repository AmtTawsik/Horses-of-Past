import React, { useContext } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const MyOrders = () => {
    const orders = useLoaderData();
    console.log(orders)
    return (
        <div>
      <h2 className="text-4xl text-center font-bold mb-5">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th className='text-3xl'>Image</th>
              <th className='text-3xl'>Name</th>
              <th className='text-3xl'>Price</th>
              <th className='text-3xl'>Payment</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={idx}>
                <td></td>
                <td><img className='rounded-xl' style={{width:'100px'}} src={order.img} alt="" /></td>
                <td><span className='text-3xl'>{order.productName}</span></td>
                <td><span className='text-3xl'>${order.resalePrice}</span></td>
                <td><button className="btn btn-md  btn-primary">Make Payment</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='text-center my-10'><Link to='/' className='btn btn-primary'>Go Back Home</Link></div>
    </div>
    );
};

export default MyOrders;