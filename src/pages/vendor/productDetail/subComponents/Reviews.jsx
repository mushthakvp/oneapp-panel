import React, { useState } from 'react';
import third from "../../../../assets/products/third.png";
import ReviewPagination from '../../../../components/pagination/ReviewPagination';
import EmptyScreen from '../../products/EmptyProductsScreen';


const Reviews = ({ reviewsData, page, setPage, total, product }) => {

    // const reviews = [1, 2, 3, 4, 5, 6, 7, 8]
    // const [page, setPage] = useState(1);
    const rowsPerPage = 5;
    const pageCount = Math.ceil(reviewsData?.total / rowsPerPage);

    return (
        <div className="p-5 sm:p-[26px] rounded-lg border border-naveBorder bg-containerWhite flex flex-col gap-[16px] w-full font-urbanist overflow-y-auto">
            <h1 className="text-[17px] font-[600] text-[#202224] flex items-center gap-1">
                All Reviews ( {product} -
                <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.7333 5.15195C12.6935 5.0326 12.6239 4.93314 12.5245 4.85357C12.425 4.774 12.3156 4.72925 12.1962 4.7193H12.1813L8.55596 4.42092L6.98945 0.944747C6.93972 0.83534 6.86263 0.745825 6.7582 0.676202C6.65376 0.60658 6.5369 0.571768 6.4076 0.571768C6.2783 0.571768 6.16143 0.60658 6.057 0.676202C5.95256 0.745825 5.87548 0.83534 5.82575 0.944747L4.25924 4.42092L0.633877 4.7193C0.464792 4.72925 0.32306 4.79638 0.20868 4.92071C0.0942996 5.04503 0.0371094 5.18677 0.0371094 5.3459C0.0371094 5.43542 0.0545151 5.51996 0.0893265 5.59953C0.124138 5.6791 0.171382 5.74872 0.231059 5.8084L2.91651 8.41925L1.96168 12.522C1.96168 12.5519 1.9592 12.5767 1.95422 12.5966C1.94925 12.6165 1.94676 12.6414 1.94676 12.6712C1.94676 12.8502 2.00893 13.0019 2.13325 13.1263C2.25758 13.2506 2.40926 13.3127 2.58829 13.3127C2.65791 13.3127 2.72256 13.3028 2.78224 13.2829C2.84191 13.263 2.89662 13.2332 2.94635 13.1934L6.4076 10.8958L9.86885 13.1934C9.91858 13.2332 9.97328 13.263 10.033 13.2829C10.0926 13.3028 10.1573 13.3127 10.2269 13.3127C10.4059 13.3127 10.5576 13.2506 10.6819 13.1263C10.8063 13.0019 10.8684 12.8502 10.8684 12.6712C10.8684 12.6414 10.8659 12.6115 10.861 12.5817C10.856 12.5519 10.8485 12.522 10.8386 12.4922L9.6749 8.41925L12.5692 5.82332C12.6587 5.74375 12.7209 5.6418 12.7557 5.51747C12.7905 5.39315 12.7831 5.27131 12.7333 5.15195Z" fill="#FFB608" />
                </svg>
                {reviewsData?.rating}, {reviewsData?.total} Reviews)
            </h1>
            <table className="w-full min-w-[700px] text-left font-urbanist">
                <thead className="bg-[#F8FAFC] h-10 text-left font-[600] text-[#202224] text-[12px] leading-[16.8px]">
                    <tr>
                        <th className="px-2 pl-4 rounded-l-lg w-[200px]">Customer</th>
                        <th className="px-1 pl-4 w-[100px]">Rating</th>
                        <th className="px-1 pl-4">Review</th>
                    </tr>
                </thead>
                <tbody className="text-left font-[500] text-[14px] leading-[16.8px]">
                    {reviewsData?.reviews?.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="px-2 py-12 pl-4 text-center text-gray-500">
                                {/* No reviews available for this product. */}
                                <EmptyScreen first='No reviews' second='No reviews available for this product' />
                            </td>
                        </tr>
                    ) : (
                        reviewsData?.reviews?.map((review, index) => (
                            <tr key={index} className="h-[84px] border-b border-b-inputBorder text-[#202224] opacity-80">
                                <td className="px-2 pl-4">
                                    <div className="flex items-center gap-2">
                                        <img src={review.userId?.profileImage} className="h-[48px] w-[48px] rounded-full" alt={review.userId?.name} />
                                        {review.userId?.name}
                                    </div>
                                </td>
                                <td className="px-2 pl-4">
                                    <div className="flex items-center gap-1">
                                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.1361 2.71455C7.11442 2.6495 7.07647 2.59529 7.02225 2.55192C6.96804 2.50855 6.90841 2.48416 6.84335 2.47874H6.83522L4.85916 2.31611L4.0053 0.421501C3.9782 0.361871 3.93618 0.313083 3.87926 0.275136C3.82234 0.23719 3.75864 0.218217 3.68816 0.218217C3.61768 0.218217 3.55398 0.23719 3.49706 0.275136C3.44013 0.313083 3.39812 0.361871 3.37101 0.421501L2.51716 2.31611L0.541098 2.47874C0.448936 2.48416 0.371682 2.52075 0.309338 2.58851C0.246993 2.65628 0.21582 2.73352 0.21582 2.82026C0.21582 2.86905 0.225308 2.91512 0.244282 2.95849C0.263257 3.00186 0.289008 3.03981 0.321536 3.07233L1.78528 4.49532L1.26484 6.73145C1.26484 6.74771 1.26349 6.76127 1.26077 6.77211C1.25806 6.78295 1.25671 6.7965 1.25671 6.81277C1.25671 6.91034 1.29059 6.99301 1.35836 7.06077C1.42612 7.12853 1.5088 7.16241 1.60638 7.16241C1.64433 7.16241 1.67957 7.15699 1.7121 7.14615C1.74462 7.13531 1.77444 7.11905 1.80155 7.09736L3.68816 5.84513L5.57477 7.09736C5.60188 7.11905 5.63169 7.13531 5.66422 7.14615C5.69675 7.15699 5.73199 7.16241 5.76994 7.16241C5.86752 7.16241 5.95019 7.12853 6.01796 7.06077C6.08573 6.99301 6.11961 6.91034 6.11961 6.81277C6.11961 6.7965 6.11825 6.78024 6.11554 6.76398C6.11283 6.74771 6.10877 6.73145 6.10334 6.71519L5.46905 4.49532L7.04665 3.08046C7.09544 3.03709 7.12932 2.98153 7.1483 2.91377C7.16727 2.84601 7.16321 2.7796 7.1361 2.71455Z" fill="#FFB608" />
                                        </svg>
                                        {review.rating}
                                    </div>
                                </td>
                                <td className="px-2 pl-4 max-w-[400px]">{/* Add max-width to allow wrapping */}
                                    {review.review}
                                </td>
                            </tr>
                        )))}
                </tbody>
            </table>

            {reviewsData?.total > 5 &&
                <ReviewPagination
                    page={page}
                    totalPages={pageCount}
                    rowsPerPage={rowsPerPage}
                    totalReviews={total}
                    onPageChange={(page) => setPage(page)}
                />
            }

        </div>
    )
}

export default Reviews;
