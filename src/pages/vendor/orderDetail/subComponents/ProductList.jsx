import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products, onUpdateStatus, isPending }) => {


    return (
        <div className="grid gap-5 sm:grid-cols-1 lg:grid-cols-2">
            {products?.map(product => (
                <ProductItem
                    key={product._id}
                    product={product}
                    onUpdateStatus={onUpdateStatus}
                    isPending={isPending}
                />
            ))}
        </div>
    );
}

export default ProductList;
