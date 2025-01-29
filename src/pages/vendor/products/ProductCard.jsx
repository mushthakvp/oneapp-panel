import React from 'react';
import { useNavigate } from 'react-router-dom';


function ProductCard({ product, currency }) {

  const navigate = useNavigate();


  return (
    <div className="flex flex-col gap-[8px] font-urbanist">
      <div className="relative">
        <img src={product?.images[0]} alt="Product Image" className="rounded-md h-[268px] w-full cursor-pointer" onClick={() => navigate("/product-detail", {state: { id: product._id }})} />

        {product?.rating > 0 && (
           <div
           className="p-1 min-w-[61px] text-xs absolute   min-h-[27px] flex items-center justify-center gap-3 bottom-3 right-3 rounded-md"
           style={{ background: "linear-gradient(to right, #FFFFFF 20%, #c9c5c5f5 100%)" }}
         >
           <svg
             width="14"
             height="13"
             viewBox="0 0 14 13"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
           >
             <path
               d="M7 0L9.32866 3.79487L13.6574 4.83688L10.7679 8.22425L11.1145 12.6631L7 10.9618L2.8855 12.6631L3.23214 8.22425L0.342604 4.83688L4.67133 3.79487L7 0Z"
               fill="#FFC833"
             />
           </svg>{" "}
           {product?.rating}
         </div>
        )}

      </div>
      <div className="bg-[#F7F7F7] p-2 px-4 flex flex-col gap-[4px] text-[#303030] rounded-md">
        <h1 className="text-[16px] font-[500] capitalize">{product?.name}</h1>
        <p className="line-clamp-1 text-[12px] font-[400] capitalize">{product?.description}</p>
        <p className="font-[700] text-[16px] flex items-center">
          {currency} {product?.offerPrice}
          <span className="line-through text-[10px] font-[400] text-[#8391A1] ml-3">
            {currency} {product?.price}
          </span>
        </p>
      </div>
    </div>
  );
}

export default ProductCard
