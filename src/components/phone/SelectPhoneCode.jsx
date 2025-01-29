import React, { useState, useMemo, useEffect } from "react";
import countriesData from "../../utils/httpcountry.json";

function SelectPhoneCode({ postData, setPostData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDialCode, setSelectedDialCode] = useState(postData?.dialCode ? postData?.dialCode : "+91");
  const [isOpen, setIsOpen] = useState(false);

  const filteredCountries = useMemo(() => {
    if (!searchTerm) {
      return Object.entries(countriesData);
    }
    return Object.entries(countriesData).filter(
      ([country, data]) =>
        country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.dialCode.includes(searchTerm)
    );
  }, [searchTerm]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (document.activeElement.type === 'number') {
        document.activeElement.blur();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);


  return (
    <div className="dial-code-selection w-full flex items-center gap-3 relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className=" flex items-center gap-3  text-xs relative  border border-inputBorder rounded-md p-2 min-w-14 h-10 sm:h-12 outline-none"
      >
        {selectedDialCode}{" "}
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.5679 0L10 0.441919L5 5.55556L0 0.441919L0.432099 0L4.47558 4.13538C4.61357 4.27651 4.80262 4.35606 5 4.35606C5.19738 4.35606 5.38643 4.27651 5.52442 4.13538L9.5679 0Z"
            fill="black"
            fillOpacity="0.6"
          />
        </svg>
      </div>
      <input
        value={postData?.phone}
        placeholder="Enter your phone number"
        onKeyDown={(e) =>
          ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
        }
        onChange={(e) => {
          setPostData((prevData) => ({
            ...prevData,
            phone: e.target.value,
          }));
        }}
        type="number"
        className="pl-2 sm:pl-[8px] md:pl-[18px]  border border-inputBorder rounded-md p-2  w-full h-10 text-sm sm:h-12 outline-none"
      />
      {isOpen && (
        <ul
          className="max-h-[200px] absolute left-0 overflow-y-auto p-3 ma border top-10 bg-white"
          style={{ scrollbarWidth: "none" }}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className=" top-0 max-w-[80px] left-0 h-7 sticky border outline-none p-2 text-xs"
          />

          {filteredCountries.map(([country, data]) => (
            <li
              className="cursor-pointer"
              onClick={() => {
                setSearchTerm("");
                setIsOpen(false);
                setPostData((prevData) => ({
                  ...prevData,
                  dialCode: data.dialCode,
                }));
                setSelectedDialCode(data.dialCode);
              }}
              key={country}
              value={data.dialCode}
            >
              {data.dialCode}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SelectPhoneCode;
