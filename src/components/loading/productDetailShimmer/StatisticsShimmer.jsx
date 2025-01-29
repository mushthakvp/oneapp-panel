import React from 'react';

const StatisticsShimmer = () => {
  return (
    <div className="bg-containerWhite p-6 font-urbanist w-full border border-inputBorder rounded-md mt-[19px] animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-[20px] md:gap-[35px] mt-8">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-md shadow-md flex flex-col"
          >
            <div className="h-8 w-8 bg-gray-200 rounded-full mb-2"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsShimmer;