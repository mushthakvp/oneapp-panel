import React from 'react';

const ReviewPagination = ({ page, totalPages, rowsPerPage, totalReviews, onPageChange, showing }) => {

    const handlePrevious = () => {
        if (page > 1) onPageChange(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) onPageChange(page + 1);
    };

    // const endReview = Math.min((page + 1) * rowsPerPage, totalReviews)?.toString().padStart(2, '0');
    const endReview = Math.min(page * rowsPerPage, totalReviews)?.toString().padStart(2, '0');

    const totalFormattedReviews = totalReviews?.toString().padStart(2, '0');

    return (
        <div className="flex justify-between items-center px-4">
            <p className="text-sm text-gray-500">
                Showing {endReview} of {totalFormattedReviews} {showing? showing : 'Reviews'}
            </p>

            <div className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                    onClick={handlePrevious}
                    disabled={page === 1}
                    className={`px-3 py-1 rounded-full ${page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-buttonColor hover:underline'}`}
                >
                    Prev
                </button>

                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => onPageChange(index + 1)}
                        className={`px-3 py-1 rounded-full ${page === index + 1 ? 'bg-buttonColor text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        {index + 1}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    onClick={handleNext}
                    disabled={page === totalPages}
                    className={`px-3 py-1 rounded-full ${page === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-buttonColor hover:underline'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ReviewPagination;
