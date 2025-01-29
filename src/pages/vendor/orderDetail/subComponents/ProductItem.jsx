import React, { useEffect, useState } from 'react';
import OrderStatusModal from './OrderStatusModal';


const ProductItem = ({ product, onUpdateStatus, isPending }) => {

    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [orderStatus, setOrderStatus] = useState(product?.orderStatus);

    const handleMarkAsPacked = () => {
        onUpdateStatus(product._id);
    };

    useEffect(() => {
        setOrderStatus(product?.orderStatus);
    }, [product?.orderStatus]);


    return (
        <>
            <div className="bg-white p-6 rounded-md shadow-sm">
                <div className="flex items-center gap-4 mb-5">
                    <div className="rounded overflow-hidden w-16 h-16 bg-gray-100">
                        <img className='w-full h-full object-cover' src={product?.images[0]} alt={product.productName} />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-[22px] text-black">{product.productName}</h4>

                        <div className="flex items-center gap-2 justify-between">
                            <div className='flex items-center gap-1'>
                                {/* {product?.rating > 0 && ( */}
                                <div className="bg-[#F5F6F7] px-2 py-1 rounded-md flex items-center gap-1">
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
                                    </svg>
                                    <span className="text-[16px] text-[#8391A1]">{product.rating}</span>
                                </div>
                                {/* )} */}

                                <div>
                                    {orderStatus === 'Placed' && (
                                        <p
                                            className="font-semibold text-[14px] underline cursor-pointer ml-2"
                                            onClick={handleMarkAsPacked}
                                        >
                                            {isPending ? 'Updating...' : 'Mark as Packed'}
                                        </p>
                                    )}
                                </div>
                            </div>


                            {/* Status section aligned with rating */}
                            <div className="ml-4">
                                <p className="text-[14px] text-[#00000099]">Current Status: <span className="text-[#03AA00]">{orderStatus}</span></p>
                                <p
                                    className="font-semibold text-[14px] text-right underline cursor-pointer"
                                    onClick={() => setIsStatusOpen(true)}
                                >
                                    Show Status
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 py-4">
                    <div className="grid grid-cols-3 gap-4 text-[14px] text-black">
                        <span>Brand Name</span>
                        <span>Color</span>
                        <span>Size</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 items-center text-[12px] text-[#00000066]">
                        <span>{product.brandName}</span>
                        {/* <div className="w-6 h-6 bg-red-500 rounded-sm"></div> */}
                        <div
                            className="w-6 h-6 rounded-sm"
                            style={{ backgroundColor: product.colorCode }}
                        />
                        {/* <div className="rounded overflow-hidden w-6 h-6">
                            <img className='w-full h-full object-cover' src={product?.brandImage} alt={product.brandName} />
                        </div> */}
                        <span>{product.size}</span>
                    </div>
                </div>

                <div className="border-t border-gray-200 py-4">
                    <div className="grid grid-cols-3 gap-4 text-[14px] text-black">
                        <span>Coupon Discount</span>
                        <span>Price</span>
                        <span>Quantity</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 items-center text-[12px] text-[#00000066]">
                        <span>{product.couponDiscount}</span>
                        <span>{product.offerPrice.toFixed(2)}</span>
                        <span>{product.quantity}</span>
                    </div>
                </div>
            </div>

            <OrderStatusModal
                product={product}
                isOpen={isStatusOpen}
                onClose={() => setIsStatusOpen(false)}
            />
        </>
    );
}

export default ProductItem;
