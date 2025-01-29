import React, { useState } from 'react'
import stateAndDistricts from "../../../../../utils/state_and_district.json";
import { Sledding } from '@mui/icons-material';

function StateSelection({ selected, setSelected }) {
  
    
    const [searchTerm, setSearchTerm] = useState("");
    const[isOpen, setIsOpen] = useState(false);
     const filteredStates = stateAndDistricts.filter(({ state }) => {
       return searchTerm
         ? state.toLowerCase().includes(searchTerm.toLowerCase())
         : true;
     });
 const handleRemove = (itemToRemove) => {
   const newSelected = selected.filter((item) => item !== itemToRemove);
   setSelected(newSelected);
 };
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="flex justify-between items-center w-full min-h-10 gap-[8px] transition-all duration-700 ease-out "
    >
      <div className="w-full relative border border-inputBorder rounded-md min-h-10 flex items-center justify-between px-3">
        <div
       
          className={`flex items-center gap-2 w-full overflow-x-auto min-h-10  max-w-[90%] flex-wrap  ${
            selected?.length !== 0 ? "p-2" : "p-0"
          }`}
        >
          {selected.length > 0 &&
            selected?.map((data) => {
              return (
                <span className=" p-1 px-4 rounded-md relative text-xs ">
                  {data}
                  {/* <div
                    onClick={() => handleRemove(data)}
                    className="h-4 w-4 cursor-pointer text-white flex items-center justify-center txt-xs rounded-full bg-[#DB3022] absolute -top-2 right-0"
                  >
                    x
                  </div> */}
                </span>
              );
            })}
          {selected.length === 0 && (
            <span className="opacity-60">Select State</span>
          )}
        </div>

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
          onClick={(e)=>e.stopPropagation()}
          className={`w-full z-50 bg-containerWhite absolute left-0 rounded-md duration-700 ease-out overflow-y-auto  ${
            isOpen ? "h-48 border border-inputBorder top-12" : "h-0 top-10"
          }  `}
        >
          <div className="relative  w-full">
            <div className="p-2 sticky top-0 left-0 w-full bg-containerWhite">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full  h-8 border border-inputBorder rounded-md px-2 outline-none"
                name=""
                id=""
              />
            </div>
            <ul>
              {/* <li
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                }}
                className="p-2 cursor-pointer"
              >
                All
              </li> */}
              {filteredStates.map(({ state }, index) => (
                <li
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelected([state]);
                    
                    setIsOpen(false);
                  }}
                  className="p-2 cursor-pointer"
                >
                  {state}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StateSelection
