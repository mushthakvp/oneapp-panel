import React from 'react';

const DeliveryShimmer = () => {
    return (
        <div className="bg-containerWhite p-[18px] font-urbanist border border-inputBorder rounded-md animate-pulse">
            <div className="h-6 w-1/2 bg-gray-200 rounded mb-4"></div>
            {[1, 2].map((_, index) => (
                <div key={index}>
                    <div className="h-5 w-3/4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
                    <div className="h-px w-full bg-gray-200 mb-3"></div>
                    <div className="grid grid-cols-2 gap-x-[100px]">
                        <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
                    </div>
                    <div className="h-px w-full bg-gray-200 mb-3"></div>
                </div>
            ))}
        </div>
    );
};

export default DeliveryShimmer;