import React, { useState } from 'react'

function DashboardTopFilter({ setFilter }) {
    const [selected, setSelected] = useState("This Month");
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-containerWhite cursor-pointer relative rounded-md p-2 w-[118px] flex items-center justify-between font-urbanist text-[14px] font[100]" onClick={() => setIsOpen(!isOpen)}>
      {selected}
      <div className="p-3">
        <svg
          width="8"
          height="6"
          viewBox="0 0 8 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.43103 0.500011H0.574685C0.461199 0.499289 0.350086 0.535549 0.255515 0.604167C0.160943 0.672786 0.0871966 0.770654 0.0436777 0.885295C0.000158905 0.999936 -0.0111606 1.12616 0.0111623 1.24786C0.0334852 1.36957 0.0884392 1.48124 0.169018 1.56865L3.59719 5.31827C3.70424 5.43467 3.84906 5.5 4 5.5C4.15095 5.5 4.29576 5.43467 4.40281 5.31827L7.83099 1.56865C7.91122 1.48162 7.96605 1.37051 7.98856 1.24939C8.01106 1.12827 8.00022 1.00257 7.95741 0.888189C7.9146 0.773805 7.84174 0.675874 7.74805 0.606779C7.65435 0.537684 7.54403 0.500529 7.43103 0.500011Z"
            fill="black"
          />
        </svg>
      </div>
      <div
        className={`absolute top-14 w-full left-0 bg-containerWhite rounded-md ${
          isOpen ? "h-auto" : "h-0"
        } overflow-hidden`}
      >
        <p
          onClick={() => {
            setIsOpen(false);
            setSelected("This Week");
            setFilter("thisWeek");
          }}
          className="p-2 text-center w-full border-b"
        >
          This Week
        </p>
        <p
          onClick={() => {
            setSelected("This Month");
            setFilter("thisMonth");
            setIsOpen(false);
          }}
          className="p-2 text-center w-full border-b"
        >
          This Month
        </p>
        <p
          onClick={() => {
            setSelected("This year");
            setFilter("thisYear");
            setIsOpen(false);
          }}
          className="p-2 text-center w-full border-b"
        >
          This year
        </p>
        <p
          onClick={() => {
            setSelected("Previous Year");
            setFilter("previousYear");
            setIsOpen(false);
          }}
          className="p-2 text-center w-full border-b"
        >
          Previous Year
        </p>
      </div>
    </div>
  );
}

export default DashboardTopFilter
