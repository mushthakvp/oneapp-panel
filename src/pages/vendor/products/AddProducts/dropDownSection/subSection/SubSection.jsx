import React, { useEffect, useState } from 'react'
import PlusMinusButton from '../../PlusMinusButton';
import { useGetSubCategories } from '../../../../../../api/useDataController';

function SubSection({ selected, setSelected }) {
  
    
    const [isOpen, setIsOpen] = React.useState(false);
    const [search, setSearch] = useState('')
    const [selectedSub,setSelectedSub]=useState('')
    const { isLoading, data, error } = useGetSubCategories(search,selected?.category);
 
    useEffect(() => {
        if (error) {
            console.log(error);
            
        }
    }, [error])
     useEffect(() => {
       if (selected && data?.subCategories) {// Log selected brand ID
   
         const selectedBrandName = data?.subCategories
           ?.filter((brand) => {
             return brand._id === selected?.subCategory; // Compare the _id with selected?.brand
           })
           .map((filteredBrand) => filteredBrand.name);

         if (selectedBrandName?.length > 0) {
          // Log the selected brand name
           setSelectedSub(selectedBrandName[0]); // Set the first matched brand name
         } else {
           setSelectedSub(""); // Reset if no brand is found
         }
       }
     }, [selected, data?.subCategories]);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
      }}
      className="flex justify-between items-center w-full h-12 gap-[8px] transition-all duration-700 ease-out"
    >
      <div className="w-full relative border border-inputBorder rounded-md h-12 flex items-center justify-between px-3">
        {selectedSub && selectedSub}
        {!selectedSub && <span className="opacity-60">Select SubCategory</span>}
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
          onClick={(e) => e.stopPropagation()}
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
            {data?.subCategories?.length > 0 &&
              data?.subCategories?.map((data) => {
                return (
                  <li
                    onClick={() => {
                      setSelectedSub(data?.name);
                      setSelected({ ...selected, subCategory: data?._id });
                      setIsOpen(false);
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {data?.name}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SubSection
