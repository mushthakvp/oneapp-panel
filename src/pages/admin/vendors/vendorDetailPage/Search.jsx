import React from 'react'

function Search({ search, setSearch }) {
  return (
    <div className="flex items-center w-full border border-[#E5E5E5] bg-[#F7F7F7] rounded-md overflow-hidden px-4 h-10  max-w-[564px]">
      <svg
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.80296 17.6973C13.9398 17.6973 17.2934 14.3437 17.2934 10.2069C17.2934 6.06999 13.9398 2.7164 9.80296 2.7164C5.66609 2.7164 2.3125 6.06999 2.3125 10.2069C2.3125 14.3437 5.66609 17.6973 9.80296 17.6973Z"
          stroke="black"
          stroke-opacity="0.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.0156 15.8062L17.9523 18.7353"
          stroke="black"
          stroke-opacity="0.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <input
        type="text"
        className="w-full h-full outline-none px-4 bg-transparent"
        placeholder="Search Products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default Search
