import React from 'react'

function RadioButton({ label, value, setEstimated, estimated }) {
    
  return (
    <div className="flex items-center gap-2">
      {/* thi s radioButton */}
      <div
              onClick={() => {
                 
                  
          label === "Yes"
            ? setEstimated({ ...estimated, isReturn: true })
            : setEstimated({ ...estimated, isReturn: false });
        }}
        className="h-[30px] w-[30px] rounded-full border border-buttonColor p-0.5 cursor-pointer"
      >
        {estimated?.isReturn && label === "Yes" && (
          <div className="w-full h-full rounded-full bg-buttonColor p-1.5">
            <div className="w-full h-full rounded-full bg-white"></div>
          </div>
        )}
        {!estimated?.isReturn && label === "No" && (
          <div className="w-full h-full rounded-full bg-buttonColor p-1.5">
            <div className="w-full h-full rounded-full bg-white"></div>
          </div>
        )}
      </div>
      {/* thi s radioButton */}
      <p>{label}</p>
    </div>
  );
}

export default RadioButton
