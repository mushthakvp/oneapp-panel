import React, { useEffect } from 'react'

function SelectFieldDrp({ selected, setSelected,postData,setPostData }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="flex relative items-center justify-between h-10 w-full border border-inputBorder rounded-md px-2"
    >
      {selected}{" "}
      <svg
        className={`${isOpen ? "rotate-180" : ""} transition-all duration-300`}
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
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full absolute left-0 z-50 bg-white top-10  rounded-md ${
          isOpen ? "h-[176px] border border-inputBorder px-5 " : "h-0"
        } overflow-hidden transition-all duration-300 font-urbanist font-[300] text-[12px] text-[#000000b7]`}
      >
        <p
          onClick={() => {
            setSelected("Section");
            setPostData({ ...postData, field: "section" });
            setIsOpen(false);
          }}
          className="py-3 border-b border-inputBorder cursor-pointer"
        >
          Section
        </p>
        <p
          onClick={() => {
            setSelected("Category");
            setPostData({ ...postData, field: "category" });
            setIsOpen(false);
          }}
          className="py-3 border-b border-inputBorder cursor-pointer"
        >
          Category
        </p>
        <p
          onClick={() => {
            setSelected("Subcategory");
            setIsOpen(false);
            setPostData({ ...postData, field: "subcategory" });
          }}
          className="py-3 border-b border-inputBorder cursor-pointer"
        >
          Subcategory
        </p>
        <p
          onClick={() => {
            setSelected("Product");
            setPostData({ ...postData, field: "product" });
            setIsOpen(false);
          }}
          className="py-3 border-b border-inputBorder cursor-pointer"
        >
          Product
        </p>
      </div>
    </div>
  );
}

export default SelectFieldDrp
