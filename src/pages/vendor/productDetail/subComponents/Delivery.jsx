import React from 'react';

const Delivery = ({productData}) => {


  return (
    <div className="bg-containerWhite p-[18px] font-urbanist border border-inputBorder rounded-md">
      <h1 className="text-[20px] font-[500] mb-[18px]">Delivery day & Return</h1>
      <div className="mb-3">
        <p className="text-[10px] font-medium text-[#999999]">Estimated Deiivery Time (Days)</p>
        <p className="text-[12px] font-normal text-black">{productData?.estimatedDeliveryTime} days</p>
      </div>

      <hr className="border-t border-[#F1F1F1] mb-3" />

      <div className="grid grid-cols-2 gap-x-[100px]">
        <div className="mb-3">
          <p className="text-[10px] font-medium text-[#999999]">Return</p>
          <p className="text-[12px] font-normal text-black">{productData?.isReturn ? 'yes' : 'No'}</p>
        </div>

        <div className="mb-3">
          <p className="text-[10px] font-medium text-[#999999]">Available Days</p>
          <p className="text-[12px] font-normal text-black">{productData?.returnDuration || 0} days</p>
        </div>
      </div>

      <hr className="border-t border-[#F1F1F1] mb-3" />

      <div className="mb-3">
        <p className="text-[10px] font-medium text-[#999999]">GST</p>
        <p className="text-[12px] font-normal text-black">{productData?.tax}%</p>
      </div>
    </div>
  )
}

export default Delivery