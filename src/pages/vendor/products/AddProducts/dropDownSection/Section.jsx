import React, { useEffect } from 'react'
import { useGetSections } from '../../../../../api/useDataController';

function Section({selected, setSelected}) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [search,setSearch] = React.useState("");
    const [selectedSection, setSelectedSection] = React.useState('');
    const { data, isLoading, error } = useGetSections(search);
  useEffect(() => {
    if (selected && data?.sections) {
      const selectedBrandName = data?.sections
        ?.filter((brand) => {
         
          return brand._id === selected?.section; // Compare the _id with selected?.brand
        })
        .map((filteredBrand) => filteredBrand.name); // After filtering, map to get only the name
        if (selectedBrandName?.length > 0) {
        setSelectedSection(selectedBrandName[0]); // Set the first matched brand name
      } else {
        setSelectedSection(""); // Reset if no brand is found
      }
    }
  }, [selected, data?.sections]);
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="flex justify-between  items-center h-12 gap-[8px] transition-all duration-700 ease-out"
    >
      <div className="w-full relative border border-inputBorder rounded-md h-12 flex items-center justify-between px-3">
        {selectedSection}
        {!selectedSection && <span className="opacity-60">Select section</span>}
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
        <div onClick={(e) => e.stopPropagation()}
          className={`w-full z-50 bg-containerWhite absolute left-0 rounded-md duration-700 ease-out overflow-y-auto ${
            isOpen ? "h-48 border border-inputBorder top-12" : "h-0 top-10"
          }  `}
        >
          <div className="p-2 relative w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full  h-8 border border-inputBorder rounded-md px-2 outline-none"
              name=""
              id=""
            />
            <ul>
              {data?.sections?.length > 0 &&
                data?.sections?.map((data) => {
                  return (
                    <li
                      onClick={() => {
                        setSelectedSection(data?.name);
                        setSelected({
                          ...selected,
                          section: data?._id,
                        });
                        setIsOpen(false);
                        setSearch("");
                      }}
                      className="p-2"
                    >
                      {data?.name}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section
