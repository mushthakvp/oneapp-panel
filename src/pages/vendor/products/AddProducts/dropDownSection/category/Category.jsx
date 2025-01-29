import React, { useEffect, useState } from 'react'
import PlusMinusButton from '../../PlusMinusButton';
import { useGetCategories } from '../../../../../../api/useDataController';

function Category({selected, setSelected}) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [search,setSearch]=useState('')
    const { data, isLoading, error } = useGetCategories(search)
    const [categoryName,setCategoryName]=useState('')
  useEffect(() => {
    if (selected && data?.categories) {

      const selectedBrandName = data?.categories
        ?.filter((brand) => {
          return brand._id === selected?.category; // Compare the _id with selected?.brand
        })
        .map((filteredBrand) => filteredBrand.name); 

      if (selectedBrandName?.length > 0) {
        setCategoryName(selectedBrandName[0]); // Set the first matched brand name
      } else {
        setCategoryName(""); // Reset if no brand is found
      }
    }
  }, [selected, data?.categories]);
    
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="flex justify-between items-center w-full h-12 gap-[8px] transition-all duration-700 ease-out"
    >
      <div className="w-full relative border border-inputBorder rounded-md h-12 flex items-center justify-between px-3">
        {categoryName && categoryName}
        {!categoryName && <span className="opacity-60">Select Category</span>}
        <svg
          className={`cursor-pointer ${
            isOpen ? "rotate-180 duration-700 ease-out" : ""
          }`}
          width="14"
          height="9"
          viewBox="0 0 14 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.4216 0H1.57842C0.264145 0 -0.472617 1.29145 0.339396 2.17182L5.76098 8.05013C6.39099 8.73353 7.60726 8.73353 8.23902 8.05013L13.6606 2.17011C14.4726 1.29145 13.7359 0 12.4216 0Z"
            fill="#1B3865"
          />
        </svg>
        {/* dropElement */}
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`w-full z-50 bg-containerWhite absolute left-0 rounded-md duration-700 ease-out overflow-y-auto  ${
            isOpen ? "h-48 border border-inputBorder top-12" : "h-0 top-10"
          }  `}
        >
          <div className="p-2 ">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full  h-8 border border-inputBorder rounded-md px-2 outline-none"
              name=""
              id=""
            />
          </div>
          <ul>
            {data?.categories?.length > 0 &&
              data?.categories?.map((data) => {
                return (
                  <li
                    key={data._id}
                    className="flex justify-between items-center w-full h-12 px-2 hover:bg-inputBorder rounded-md cursor-pointer"
                    onClick={() => {
                      setSelected({ ...selected, category: data?._id });

                      setCategoryName(data.name);

                      setIsOpen(false);
                    }}
                  >
                    <span>{data.name}</span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      {/* <PlusMinusButton
        icon={
          <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.7647 8.545H9.47059V1.23578C9.47059 1.10563 9.36518 1 9.23529 1H8.76471C8.63482 1 8.52941 1.10563 8.52941 1.23578V8.545H1.23529C1.10541 8.545 1 8.65063 1 8.78078V9.25234C1 9.38249 1.10541 9.48812 1.23529 9.48812H8.52941V16.7973C8.52941 16.927 8.63482 17.0331 8.76471 17.0331H9.23529C9.36518 17.0331 9.47059 16.927 9.47059 16.7973V9.48812H16.7647C16.8941 9.48812 17 9.38249 17 9.25234V8.78078C17 8.65063 16.8941 8.545 16.7647 8.545Z"
              fill="white"
              stroke="white"
              stroke-width="2"
            />
          </svg>
        }
      /> */}
    </div>
  );
}

export default Category
