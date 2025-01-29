import React from 'react';

const Specifications = ({ productData }) => {
    const specifications = productData?.specifications || [];

    return (
        <div className="bg-containerWhite p-[18px] font-urbanist border border-inputBorder rounded-md">
            <h1 className="text-[16px] font-semibold mb-[10px]">Product Specification</h1>
            <div>
                {specifications.map((spec, index) => (
                    index % 2 === 0 && (
                        <React.Fragment key={spec._id}>
                            <div className="grid grid-cols-2 gap-x-[110px] mb-3">
                                <div>
                                    <p className="text-[10px] font-medium text-[#999999]">{spec.title}</p>
                                    <p className="text-[12px] font-normal text-black">{spec.solution}</p>
                                </div>
                                {specifications[index + 1] && (
                                    <div>
                                        <p className="text-[10px] font-medium text-[#999999]">{specifications[index + 1].title}</p>
                                        <p className="text-[12px] font-normal text-black">{specifications[index + 1].solution}</p>
                                    </div>
                                )}
                            </div>
                            {index < specifications.length - 2 && (
                                <hr className="w-full border-t border-[#E0E0E0] mb-3" />
                            )}
                        </React.Fragment>
                    )
                ))}
            </div>
        </div>
    );
};

export default Specifications;
