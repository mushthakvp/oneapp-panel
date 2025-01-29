import React from 'react';

const SpecificationsShimmer = () => {
    return (
        <div className="bg-containerWhite p-[18px] font-urbanist border border-inputBorder rounded-md animate-pulse">
            <div className="h-5 w-1/2 bg-gray-200 rounded mb-4"></div>
            {Array?.from({ length: 5 }).map((_, index) => (
                <div key={index}>
                    <div className="grid grid-cols-2 gap-x-[110px] mb-3">
                        <div>
                            <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                        </div>
                        <div>
                            <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                    <div className="h-px w-full bg-gray-200 mb-3"></div>
                </div>
            ))}

            <div className="grid grid-cols-2 gap-x-[110px] mb-7">
                <div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                </div>
                <div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default SpecificationsShimmer;