import React, { useState } from 'react'

function ChartFilter({setFilter}) {
  const [selected, setSelected] = useState("Current Year");
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-[#2F4EFF1A] cursor-pointer border border-buttonColor relative rounded-md p-1  flex items-center justify-center gap-3 font-urbanist text-[14px] font[100]" onClick={() => setIsOpen(!isOpen)}>
      {selected}
      <div className="p-3">
        <svg
          width="14"
          height="9"
          viewBox="0 0 14 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 8.42588C6.80544 8.42588 6.61901 8.34756 6.48283 8.20859L0.206972 1.80511C-0.0729818 1.51951 -0.0683403 1.06102 0.217292 0.781096C0.502899 0.501192 0.961406 0.505784 1.24131 0.791416L7 6.6672L12.7587 0.791416C13.0386 0.50576 13.497 0.501093 13.7827 0.781096C14.0684 1.06105 14.073 1.51951 13.793 1.80511L7.51716 8.20859C7.38098 8.34756 7.19457 8.42588 7 8.42588Z"
            fill="#2F4EFF"
          />
        </svg>
      </div>
      <div
        className={`absolute z-50 top-12 w-full left-0  rounded-md transition-all duration-100 ease-out ${
          isOpen ? "h-auto bg-[#2F4EFF1A] border border-buttonColor" : "h-0"
        } overflow-hidden`}
      >
        <p
          onClick={() => {
            setFilter("currentYear");
            setSelected("Current Year");
            setIsOpen(false);
          }}
          className="p-2 cursor-pointer text-center w-full border-b border-buttonColor"
        >
          Current Year
        </p>
        <p
          onClick={() => {
            setFilter("lastYear");
            setSelected("Previous Year");
            setIsOpen(false);
          }}
          className="p-2 cursor-pointer text-center w-full "
        >
          Previous Year
        </p>
      </div>
    </div>
  );
}

export default ChartFilter
