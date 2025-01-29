import React from 'react';

const ReviewsShimmer = () => {
  return (
    <div className="p-5 sm:p-[26px] rounded-lg border border-naveBorder bg-containerWhite flex flex-col gap-[16px] w-full font-urbanist overflow-y-auto animate-pulse">
      <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
      <div className="min-w-[700px]">
        <div className="h-10 bg-gray-200 rounded-t-lg"></div>
        <div className="h-[84px] bg-white border-b border-b-inputBorder flex items-center px-4">
          <div className="h-10 w-10 bg-gray-200 rounded-full mr-2"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        </div>
        <div className="h-[84px] bg-white border-b border-b-inputBorder flex items-center px-4">
          <div className="h-10 w-10 bg-gray-200 rounded-full mr-2"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsShimmer;