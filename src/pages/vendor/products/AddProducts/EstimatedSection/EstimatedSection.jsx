import React from 'react'
import RadioButton from '../../../../../components/radioButton/RadioButton';

function EstimatedSection({ estimated, setEstimated }) {
  return (
    <div className="bg-containerWhite flex flex-col gap-6 p-4 sm:p-[30px] font-urbanist w-full border border-inputBorder rounded-md ">
      <h1 className="text-[20px] font-[500] mb-[32px]">
        Delivery day & GST & Return
      </h1>
      <div className="w-full ">
        <p className="mb-[8px]">Estimate Delivery Time (Days)</p>
        <input
          type="text"
          placeholder="Days"
          value={estimated?.estimatedDeliveryTime}
          onChange={(e) => {
             const value = e.target.value;
                    // Only update the state if the value is a valid number (this should work automatically with type="number")
            if (!isNaN(value)) {
              setEstimated({
                ...estimated,
                estimatedDeliveryTime: e.target.value,
              });
            }
          }}
          className="w-full h-12 border border-inputBorder rounded-md px-3 bg-transparent outline-none"
        />
      </div>
      <div className="w-full ">
        <p className="mb-[8px]">Add GST ( Percentage)</p>
        <input
          type="text"
          placeholder="--%"
          value={estimated?.tax}
          onChange={(e) => {
             const value = e.target.value;
                    // Only update the state if the value is a valid number (this should work automatically with type="number")
            if (!isNaN(value)) {
              setEstimated({
                ...estimated,
                tax: e.target.value,
              });
            }
          }}
          className="w-full h-12 border border-inputBorder rounded-md px-3 bg-transparent outline-none"
        />
      </div>
      <div className="w-full ">
        <p className="mb-[8px]">Return</p>
        <div className="flex items-center gap-4">
          <RadioButton
            estimated={estimated}
            setEstimated={setEstimated}
            label="Yes"
          />
          <RadioButton
            estimated={estimated}
            setEstimated={setEstimated}
            label="No"
          />
        </div>
      </div>
      {estimated?.isReturn && (
        <div className="w-full ">
          <p className="mb-[8px]">Add Return Days</p>
          <input
            type="text"
            placeholder="Ex: 2 Days"
            value={estimated?.returnDuration}
            onChange={(e) => {
               const value = e.target.value;
                    // Only update the state if the value is a valid number (this should work automatically with type="number")
              if (!isNaN(value)) {
                setEstimated({
                  ...estimated,
                  returnDuration: e.target.value,
                });
              }
            }}
            className="w-full h-12 border border-inputBorder rounded-md px-3 bg-transparent outline-none"
          />
        </div>
      )}
    </div>
  );
}

export default EstimatedSection
