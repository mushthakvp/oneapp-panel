import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

    const handlePrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div className="w-full flex justify-between items-center my-2">
            {/* Previous Button */}
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`px-1 py-1 ${
                    currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-black'
                }`}
            >
                Previous
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => onPageChange(i + 1)}
                        className={`px-2 py-1 rounded-md text-[14px] ${
                            currentPage === i + 1
                                ? 'bg-buttonColor text-white'
                                : 'text-[#00000066]'
                        }`}
                    >
                        {String(i + 1).padStart(2, '0')}
                    </button>
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-1 py-1 ${
                    currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-black'
                }`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
