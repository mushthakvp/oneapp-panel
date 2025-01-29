import { useMutationState } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useGetAdminCloudType } from '../../../api/useDataControllerAdmin';

function CloudType({selected,setSelected}) {
  const [isOpen, setIsOpen] = useState(false)
  const { data, isLoading } = useGetAdminCloudType();
  console.log(data);
  
    const type = ["All", "Starter", "Basic", "Advanced"];
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="w-full text-buttonColor relative border border-buttonColor bg-nonActiveColor rounded-md p-2 px-3 flex items-center justify-between"
    >
      {selected ? selected : "Cloud Type"}
      <svg
        className={`transition-all ease-out duration-1000 ${
          isOpen ? "rotate-180" : ""
        }`}
        width="19"
        height="10"
        viewBox="0 0 19 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.33704 10C9.08926 10 8.85182 9.90026 8.67838 9.72326L0.685473 1.56782C0.328926 1.20407 0.334837 0.62015 0.698617 0.263634C1.06237 -0.0928509 1.64632 -0.0870024 2.0028 0.276777L9.33704 7.76016L16.6713 0.276777C17.0278 -0.0870339 17.6117 -0.0929767 17.9755 0.263634C18.3393 0.620181 18.3452 1.20407 17.9886 1.56782L9.99571 9.72326C9.82226 9.90026 9.58486 10 9.33704 10Z"
          fill="#2F4EFF"
        />
      </svg>
      {/* dropDiv */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute ${
          !isOpen ? "h-0" : "h-[200px]"
        } z-30 top-12 rounded-lg left-0 duration-1000 transition-all ease-in-out w-full bg-buttonColor text-white overflow-y-auto`}
      >
        {type?.map((item) => {
          return (
            <p
              onClick={() => {
                setSelected(item);
                setIsOpen(false);
              }}
              className="p-2 px-4 md:px-8 border-b cursor-pointer"
            >
              {item}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default CloudType
