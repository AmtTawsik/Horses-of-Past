import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Product from '../Products/Product';

const Advertized = () => {
    const {
        data: products = [],
        refetch,
        isLoading,
      } = useQuery({
        queryKey: ["allAddProduct"],
        queryFn: async () => {
          const res = await fetch(`http://localhost:5000/advertize`);
          const data = res.json();
          return data;
        },
      });

      console.log(products)
    return (
        <>
        {
            products.length &&
            <div>
                <h1 className='text-center text-5xl font-bold text-secondary mt-5'>All Advertized Product</h1>
                <div className="grid md:grid-cols-3 gap-4 my-7 w-10/12 mx-auto">
                    {
                        products.map(product => <Product product={product}></Product>)
                    }
                </div>
            </div>
        }
        </>
    );
};

export default Advertized;