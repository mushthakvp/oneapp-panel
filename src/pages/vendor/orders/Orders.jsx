import React, { useState } from 'react';
import PageHeading from '../../../components/pageHeding/PageHeading';
import Cards from './subComponents/Cards';
import OrdersTable from './subComponents/Table';


const Orders = () => {

    const [selectedOption, setSelectedOption] = useState("This Week");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const options = ["This Week", "This Month", "This Year"];
    const filterEnum = {
        "This Week": "thisWeek",
        "This Month": "thisMonth",
        "This Year": "thisYear"
      };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
    };

    return (
        <div className="font-urbanist">

            <div className="flex justify-between items-center">
                <PageHeading title="Orders" />

                <div className="relative w-32">
                    <button
                        onClick={handleDropdownToggle}
                        className="bg-white px-4 py-2 rounded flex justify-between items-center w-full"
                    >
                        <span className="truncate text-[14px]">{selectedOption}</span>
                        <svg
                            className="ml-1 flex-shrink-0"
                            width="8"
                            height="5"
                            viewBox="0 0 8 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7.43103 1.0572e-05H0.574685C0.461199 -0.00071129 0.350086 0.0355488 0.255515 0.104167C0.160943 0.172786 0.0871966 0.270654 0.0436777 0.385295C0.000158905 0.499936 -0.0111606 0.626156 0.0111623 0.74786C0.0334852 0.869565 0.0884392 0.981242 0.169018 1.06865L3.59719 4.81827C3.70424 4.93467 3.84906 5 4 5C4.15095 5 4.29576 4.93467 4.40281 4.81827L7.83099 1.06865C7.91122 0.981617 7.96605 0.870514 7.98856 0.749393C8.01106 0.628272 8.00022 0.502573 7.95741 0.388189C7.9146 0.273805 7.84174 0.175874 7.74805 0.106779C7.65435 0.0376843 7.54403 0.000528789 7.43103 1.0572e-05Z"
                                fill="black"
                            />
                        </svg>
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute mt-1 bg-white rounded shadow-lg w-full">
                            {options.map((option) => (
                                <div
                                    key={option}
                                    onClick={() => handleOptionSelect(option)}
                                    className={`px-4 py-2 hover:bg-gray-300 text-[14px] ${selectedOption === option ? "bg-gray-200" : ""}`}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>

            <Cards filter={filterEnum[selectedOption]} />

            <OrdersTable />

        </div>
    )
}

export default Orders