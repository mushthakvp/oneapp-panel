import React from 'react';

const OrderDetailShimmer = () => {
    return (
        <>

            <div className="h-8 w-1/3 bg-gray-200 rounded mb-4"></div>
            <div className="grid grid-cols-2 gap-x-[100px]">
                <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 font-urbanist rounded-md mt-[31px] bg-containerWhite">
                {[1, 2, 3].map((_, index) => (
                    <div
                        key={index}
                        className="p-[18px] animate-pulse w-full md:w-1/3"
                    >
                        <div className="h-6 w-1/2 bg-gray-200 rounded mb-4"></div>
                        <div className="h-3 w-3/4 bg-gray-200 rounded mb-4"></div>
                        <div className="h-3 w-3/4 bg-gray-200 rounded mb-4"></div>
                        <div className="h-3 w-3/4 bg-gray-200 rounded mb-4"></div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col md:flex-row gap-4 font-urbanist mt-[31px]">
                {[1, 2].map((_, index) => (
                    <div
                        key={index}
                        className="bg-containerWhite p-[18px] rounded-md animate-pulse w-full md:w-1/2"
                    >
                        <div className="h-16 w-full bg-gray-200 rounded mb-4"></div>
                        <div className="h-px w-full bg-gray-200 mb-3"></div>
                        <div className="h-5 w-full bg-gray-200 rounded mb-4"></div>
                        <div className="grid grid-cols-3 gap-x-[100px]">
                            <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>
                        </div>
                        <div className="h-px w-full bg-gray-200 mb-3"></div>
                        <div className="h-5 w-full bg-gray-200 rounded mb-4"></div>
                        <div className="grid grid-cols-3 gap-x-[100px]">
                            <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default OrderDetailShimmer;