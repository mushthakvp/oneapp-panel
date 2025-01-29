import React, { useState } from 'react'


function ProductsSearchSection({ setSearch, search, selected, setSelected, sections }) {

  const [isOpen, setIsOpen] = useState(false)
  const [selectedSection, setSelectedSection] = useState('');


  return (
    <div className="flex sm:flex-row flex-col items-center gap-[12px] font-urbanist">
      <div className="flex items-center px-5 w-full bg-[#F7F7F7] border border-inputBorder rounded-md">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.80296 17.2973C13.9398 17.2973 17.2934 13.9437 17.2934 9.80687C17.2934 5.67 13.9398 2.31641 9.80296 2.31641C5.66609 2.31641 2.3125 5.67 2.3125 9.80687C2.3125 13.9437 5.66609 17.2973 9.80296 17.2973Z"
            stroke="black"
            stroke-opacity="0.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15.0156 15.4062L17.9523 18.3353"
            stroke="black"
            stroke-opacity="0.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 w-full outline-none bg-transparent pl-3"
          placeholder="Search Product"
        />
      </div>

      {/* drpDown */}
      <div onClick={() => setIsOpen(!isOpen)} className="flex relative w-full sm:max-w-[270px] text-buttonColor items-center justify-between px-3 h-10 rounded-md bg-[#2f4eff0f1A] border border-buttonColor">
        {selectedSection ? selectedSection : "Select Section"}

        <svg
          className={`cursor-pointer transition-all duration-1000 ease-out ${isOpen ? "rotate-180" : ""}`}
          width="19"
          height="10"
          viewBox="0 0 19 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.33704 10C9.08926 10 8.85182 9.90026 8.67838 9.72326L0.685473 1.56782C0.328926 1.20407 0.334837 0.62015 0.698617 0.263634C1.06237 -0.0928509 1.64632 -0.0870024 2.0028 0.276777L9.33704 7.76016L16.6713 0.276777C17.0278 -0.0870339 17.6117 -0.0929767 17.9755 0.263634C18.3393 0.620181 18.3452 1.20407 17.9886 1.56782L9.99571 9.72326C9.82226 9.90026 9.58486 10 9.33704 10Z"
            fill="#2f4eff0f"
          />
        </svg>

        {isOpen && (
          <div className={`absolute w-full bg-[#f9e5e5fe] border border-buttonColor rounded-md z-50 left-0 transition-all duration-1000 ease-out ${isOpen ? "border border-buttonColor top-12" : "h-0 top-10"}`}>
            <div
              onClick={() => {
                setSelected('');
                setSelectedSection('');
                setIsOpen(false);
              }}
              className="cursor-pointer p-2"
            >
              All Section
            </div>
            {sections?.map((section) => (
              <div
                key={section._id}
                onClick={() => {
                  setSelected(section._id);
                  setSelectedSection(section.name);
                  setIsOpen(false);
                }}
                className="cursor-pointer p-2"
              >
                {section.name}
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}

export default ProductsSearchSection
