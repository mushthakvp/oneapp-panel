import React, { useEffect, useState } from 'react'
import { useSearchProducts } from '../../../../api/useDataControllerAdmin';

function ProductSearch({selected,setSelected}) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [search, setSearch] = useState("");
    const [selectedProduct, setSelectedProduct] = useState('Select Product');
    const { data, error, isLoading } = useSearchProducts(search);
    console.log(error);
    
    
      useEffect(() => {
        if (selected && data?.products) {
          const selectedBrandName = data?.products
            ?.filter((brand) => {
            
              return brand._id === selected?.product; // Compare the _id with selected?.brand
            })
            .map((filteredBrand) => filteredBrand.name);
  
            if (selectedBrandName?.length > 0) {
              
              
            setSelectedProduct(selectedBrandName[0]); // Set the first matched brand name
          } else {
            setSelectedProduct(""); // Reset if no brand is found
          }
        }
      }, [selected, data?.products]);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="flex relative items-center justify-between h-10 w-full border border-inputBorder rounded-md px-2"
    >
      <div className="flex items-center gap-3">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.82272 14.5678C11.5459 14.5678 14.5641 11.5496 14.5641 7.82638C14.5641 4.1032 11.5459 1.08496 7.82272 1.08496C4.09953 1.08496 1.0813 4.1032 1.0813 7.82638C1.0813 11.5496 4.09953 14.5678 7.82272 14.5678Z"
            stroke="black"
            stroke-opacity="0.6"
            stroke-width="0.9"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.5142 12.8657L15.1572 15.5019"
            stroke="black"
            stroke-opacity="0.6"
            stroke-width="0.9"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {selectedProduct}{" "}
      </div>
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
          isOpen ? "h-[150px] border border-inputBorder  " : "h-0"
        } overflow-y-auto transition-all duration-300 font-urbanist font-[300] text-[12px] text-[#000000b7]`}
      >
        <div className="relative">
          <div className="sticky top-0 p-2 bg-white h-10">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="border border-inputBorder p-2 w-full outline-none h-10 rounded-md mb-4"
              placeholder="Search"
            />
          </div>
                  {data?.products?.length > 0 && data?.products?.map((data, index) => {
                      
                      
            return (
              <p
                onClick={() => {
                        setSelected({ ...selected, product: data?._id });
                        setSelectedProduct(data?.name);
                  setIsOpen(false);
                }}
                className="p-3 border-b border-inputBorder cursor-pointer"
              >
                {data?.name}
              </p>
            );
        }) }
        </div>
      </div>
    </div>
  );
}

export default ProductSearch
