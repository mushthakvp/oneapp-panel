import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHeading from '../../../components/pageHeding/PageHeading';
import TableShimmer from '../../../components/loading/shimmer/TableShimmer';
import ReviewPagination from '../../../components/pagination/ReviewPagination';
import PageNation from '../../../components/pagenation/PageNation';
import Nodata from '../../../components/nodata/Nodata';
import { useGetVendorCouponDetails } from '../../../api/useDataController';
import EmptyScreen from '../products/EmptyProductsScreen';


const CouponDetail = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const id = state?.couponId;

    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    const { data, isLoading, error } = useGetVendorCouponDetails(page, id);
    console.log(data?.orderHistory);

    useEffect(() => {
        setTotalPage(data?.totalPage);
    }, [data])


    return (
        <div className='font-urbanist'>
            <div className="flex gap-4 items-center mb-6">
                <svg
                    className='cursor-pointer'
                    onClick={() => navigate('/coupons')}
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M30 18H6M6 18L15 9M6 18L15 27"
                        stroke="black"
                        strokeWidth="1.98214"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <PageHeading title="Coupon Usage Details" />
            </div>


            <div className="mt-[24px] p-5 sm:p-[26px] rounded-lg border border-naveBorder bg-containerWhite flex flex-col gap-[16px] w-full font-urbanist overflow-y-auto">
                <h1 className="ext-[18px] font-[600] leading-[21.6px]">
                    Coupon Overview
                </h1>
                <table className="w-full min-w-[700px] text-left font-urbanist">
                    <thead className="bg-[#F8FAFC] h-10 text-left font-[600] text-[14px] leading-[16.8px] opacity-60">
                        <th className="px-2 pl-4 rounded-l-lg">Customer</th>
                        <th className="px-1 pl-4">Product</th>
                        <th className="px-1 pl-4">Product Price</th>
                        <th className="px-1 ">Coupon Discount</th>
                        <th className="px-1 pl-4">Discount Price</th>
                        <th className="px-1 pl-4 ">Applied Date</th>
                    </thead>
                    {isLoading ? (
                        <TableShimmer columnCount={6} rowCount={6} />
                    ) : (
                        <tbody className="text-left font-[500] text-[14px] leading-[16.8px]">
                            {data?.orderHistory?.length > 0 ? (
                                data?.orderHistory?.map((item, index) => (
                                    <tr className="h-[84px] border-b border-b-inputBorder cursor-pointer" onClick={() => navigate('/coupon-detail')}>
                                        <td className="px-2 pl-4 capitalize">{item?.userId?.name}</td>
                                        <td className="px-2 pl-4 capitalize">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={item?.images?.length > 0 && item?.images[0]}
                                                    className="h-[48px] w-[48px] rounded-md"
                                                    alt=""
                                                />
                                                {item?.productName}
                                            </div>
                                        </td>
                                        <td className="px-2 pl-4">{item?.price}</td>
                                        <td className="px-2 pl-4 text-red-500">{item?.couponDiscount}</td>
                                        <td className="px-2 pl-4">{item?.discount}</td>
                                        <td className="px-2 pl-4">
                                            {item?.createdAt && item?.createdAt.split("T")[0]}
                                        </td>
                                    </tr>
                                  ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="h-[84px] text-center font-[500] text-gray-500">
                                            {/* No coupon uses available */}
                                            <EmptyScreen first='No coupon uses' second='Please check back later' />
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    )}

                </table>
                {/* {data?.length === 0 && !isLoading && <Nodata />} */}
                {totalPage > 1 && (
                    <PageNation setPage={setPage} totalpage={totalPage} />
                )}
            </div>

        </div>
    );
}

export default CouponDetail