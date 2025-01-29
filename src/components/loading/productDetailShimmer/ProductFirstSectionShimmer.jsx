import React from 'react';

const ProductFirstSectionShimmer = () => {
  return (
    <div className="bg-containerWhite p-5 font-urbanist w-full h-[470px] border border-inputBorder rounded-md flex flex-col md:flex-row">
      {/* Image Slider Shimmer */}
      <div className="w-full md:w-1/3 animate-pulse">
        <div className="h-[300px] bg-gray-200 rounded mb-16"></div>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              className={`w-[57.55px] h-[61.98px] rounded bg-gray-200`}
            ></div>
          ))}
        </div>
      </div>

      {/* Product Details Shimmer */}
      <div className="w-full md:w-2/3 md:ml-5 animate-pulse">
        <div className="h-26 w-3/4 bg-gray-200 rounded mb-4"></div>
        <div className="h-16 w-full bg-gray-200 rounded mb-4"></div>
        <div className="h-40 w-full bg-gray-200 rounded mb-4"></div>
        <div className="h-11 w-full bg-gray-200 rounded mb-4"></div>
        <div className="h-24 w-1/2 bg-gray-200 rounded mb-4"></div>
      </div>
    </div>
  );
};

export default ProductFirstSectionShimmer;