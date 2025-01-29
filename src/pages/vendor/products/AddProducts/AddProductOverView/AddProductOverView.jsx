import React, { useState } from "react";
import ImageSlider from "./ImageSlider";

function AddProductOverView({ variants, specification,product,brandName }) {

const sizes = variants
  ?.flatMap((variant) => variant?.sizes || [])
  .filter((size) => size);


  return (
    <div className="bg-containerWhite break-words p-4 sm:p-[30px] w-full max-w-[353px] border border-inputBorder rounded-md font-jakarta lg:block hidden">
      <h1 className="text-[20px] font-[500] mb-[32px]">Basic Information</h1>

      {/* Image Slider */}
      <ImageSlider variants={variants} />
      <h1 className="text-[16px] font-[500] font-jakarta mt-[20px] text-[#303030]">
        {product?.name}
      </h1>
      <p className="text-[16px] font-[500] opacity-80 mt-2">{brandName}</p>
      <h1 className="font-[700] text-[16px] mt-[20px]">Selected Color</h1>
      <div className="w-full overflow-x-auto p-2 flex gap-2">
              {variants?.map((variant, index) => {
       return  variant?.colorCode ? (
           <div
             style={{ backgroundColor: variant?.colorCode }}
             className={`h-5 w-5 rounded-md`}
           />
         ) : null
         ;
        })}

        {/* <div className="h-5 w-5 bg-green-600 rounded-md" />
        <div className="h-5 w-5 bg-yellow-600 rounded-md" /> */}
      </div>
      <h1 className="font-[700] text-[16px] mt-[20px]">Select Size</h1>
      <div className="w-full overflow-x-auto p-2 flex gap-2 text-xs font-urbanist uppercase">
        {sizes && sizes.length > 0 ? (
          sizes.map((size, index) =>
            size?.size ? ( // Only render size if it's not empty or null
              <div
                key={index}
                className="p-2 bg-[#FAFAFA] border border-[#0000000F] rounded-md"
              >
                {size?.size}
              </div>
            ) : null
          )
        ) : (
          <div>No sizes available</div> // Show this message if the sizes array is empty
        )}
      </div>
      <h1 className="text-[16px] font-[700] tracking-[0.5px] mt-2">
        Description
      </h1>
      <p className="text-[12px] font-[500] text-[#8391A1] leading-[21.6px] tracking-[0.5px] mt-2">
        {product?.description}
      </p>
      <h1 className="text-[16px] font-[700] tracking-[0.5px] mt-4">
        PRODUCT Specification
      </h1>
      <div className="grid grid-cols-2 break-words">
        {specification?.map((item, index) => (
          <div
            key={index} // Always use a key in a list for better performance
            className={`flex ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            } border-b p-2 break-words w-full`}
          >
            <div className="break-words max-w-[293px]">
              <p className="text-[10px] font-[500] leading-[12.6px] opacity-60 mb-2">
                {item?.title}
              </p>
              <p className="text-[12px] font-[500]">{item?.solution}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddProductOverView;
