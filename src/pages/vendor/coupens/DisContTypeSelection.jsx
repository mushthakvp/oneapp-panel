import React, { useEffect, useState } from 'react'

function DisContTypeSelection({ selected, setSelected }) {
    const [isOpen,setOpen]=useState(false)
  const [placeholder, setPlaceholder] = useState("--");
    useEffect(() => {
        if (selected?.discountType === "percentage") {
      
      setPlaceholder( "--%");
    } else {
      setPlaceholder("-- Amount");
    }
},[selected])
  return (
    <div className="relative border capitalize border-inputBorder p-2 w-full outline-none h-10 rounded-md mb-4 flex items-center gap-2">
      <input
        onClick={(e) => {
          e.stopPropagation();
          if (selected?.discountType) return;
          setOpen(true);
        }}
        type="text"
              placeholder={placeholder}
              value={selected?.discount}
              onChange={(e) => {
                setSelected((prev) => ({
                  ...prev,
                  discount: e.target.value,
                }));
              }}
        className="outline-none text-sm w-full"
      />
      <div
        onClick={(e) => {
          e.stopPropagation();
         
          setOpen(!isOpen);
        }}
        className="p-3"
      >
        <svg
          width="14"
          height="9"
          viewBox="0 0 14 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.968 0H1.52078C0.254499 0 -0.455358 1.24429 0.327002 2.09251L5.55061 7.75616C6.15761 8.41461 7.32947 8.41461 7.93816 7.75616L13.1618 2.09086C13.9441 1.24429 13.2343 0 11.968 0Z"
            fill="black"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute w-full z-50 top-12 left-0 bg-white border border-inputBorder p-2 rounded-md">
          <p
            onClick={() => {
              setSelected({ ...selected, discountType: "percentage" });
              setOpen(false);
            }}
            className="p-2 cursor-pointer"
          >
            Percentage
          </p>
          <p
            onClick={() => {
              setSelected({ ...selected, discountType: "amount" });
              setOpen(false);
            }}
            className="p-2 cursor-pointer"
          >
            Amount
          </p>
        </div>
      )}
    </div>
  );
}

export default DisContTypeSelection
