import React from 'react'
import PageHeading from '../../../../components/pageHeding/PageHeading'
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';

function AddProducts() {
    const navigate = useNavigate();
    
  return (
    <div className="font-urbanist">
      <div className="flex gap-4 items-center ">
        <svg
          className="cursor-pointer"
          onClick={() => navigate("/products")}
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30 18H6M6 18L15 9M6 18L15 27"
            stroke="black"
            stroke-width="1.98214"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <PageHeading title="Add Products" />
      </div>
      <div className="w-full flex items-start mt-[25px]">
        <ProductForm />
      </div>
    
    </div>
  );
}

export default AddProducts
