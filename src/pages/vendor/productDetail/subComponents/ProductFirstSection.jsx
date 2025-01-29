import React, { useState } from 'react';
import ImageSlider from "./ImageSlider";


function ProductFirstSection({ productData, variants, onVariantSelect }) {

    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    const handleVariantSelect = (variantId) => {
        setSelectedVariant(variantId);
        onVariantSelect(variantId);
    };


    return (
        <div className="bg-containerWhite p-5 font-urbanist w-full border border-inputBorder rounded-md flex flex-col md:flex-row">
            {/* Image Slider - Left Section */}
            <div className="w-full md:w-1/3">
                {productData?.images &&
                    <ImageSlider images={productData?.images} />
                }

                {/* Color Selector */}
                {variants?.length > 0 && (
                    <div className="mt-4">
                        <h2 className="text-sm mb-2">Select Color</h2>
                        <div className="flex gap-2">
                            {variants?.map((variant) => (
                                <div
                                    key={variant._id}
                                    onClick={() => handleVariantSelect(variant._id)}
                                    className={`w-[57.55px] h-[61.98px] rounded cursor-pointer ${selectedVariant === variant._id ? 'border-[2px] border-black' : ''}`}
                                    style={{
                                        backgroundImage: `url(${variant.images[0]})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Product Details - Right Section */}
            <div className="w-full md:w-2/3 pl-5">
                <div className="flex justify-between items-center mt-6 mb-2">
                    <h1 className="text-[22px] text-black capitalize">{productData?.name}</h1>
                    <div className="flex items-center">
                        <span className="h-1.5 w-1.5 bg-red-500 rounded-full mr-2"></span>
                        <span className="text-red-500 text-[14px] font-medium capitalize">{productData?.brand?.name}</span>
                    </div>
                </div>

                <p className="text-sm text-gray-600 mt-4 mb-4">
                    {productData?.description}
                </p>

                <hr className="border-t border-[#F1F1F1]" />

                <div className="grid grid-cols-3 gap-2 mt-4 mb-4">
                    <div className="opacity-60 text-[10px]">Section</div>
                    <div className="opacity-60 text-[10px]">Category</div>
                    <div className="opacity-60 text-[10px]">Subcategory</div>
                    <div className="text-black text-[12px]">{productData?.section?.name || '-'}</div>
                    <div className="text-black text-[12px]">{productData?.category?.name || '-'}</div>
                    <div className="text-black text-[12px]">{productData?.subcategory?.name || '-'}</div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-6 mb-7">
                    <div className="opacity-60 col-span-2 text-[10px]">Countries</div>
                    <div className="opacity-60 text-[10px]">State</div>
                    <div className="text-black col-span-2 text-[12px] capitalize">{productData?.countries?.join(', ')}</div>
                    <div className="text-black text-[12px] capitalize">{productData?.states?.join(', ')}</div>
                </div>

                <hr className="border-t border-[#F1F1F1]" />

                {/* Price and Size Options */}
                <div className="flex items-center mt-4">
                    <div className='mt-4 w-[50%]'>
                        <span className="text-[30px] font-semibold text-black">INR {selectedSize?.offerPrice || productData?.offerPrice}</span>
                        <span className="text-[14px] text-gray-500 line-through ml-2">INR {selectedSize?.price || productData?.price}</span>
                    </div>
                    <div className="ml-16 w-[50%]">
                        <h3 className="text-[10px] opacity-60 mb-1">Size:</h3>
                        <div className="flex gap-2">
                            {productData?.sizes.map((item) => (
                                <div
                                    key={item._id}
                                    onClick={() => setSelectedSize(item)}
                                    className="px-2 py-1 rounded-md bg-[#F5F5F5] text-[10px] cursor-pointer capitalize"
                                >
                                    {item.size}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductFirstSection;
