import React, { useEffect, useState } from 'react';
import PageHeading from '../../../components/pageHeding/PageHeading';
import { useNavigate, useLocation } from 'react-router-dom';
import Pagination from '../../../components/pagination/PaginationTable';
import TableShimmer from '../../../components/loading/shimmer/TableShimmer';
import { useGetVendorRevenueDetail } from '../../../api/useDataController';
import { convertUTCToLocal } from '../../../utils/dateFormate';

const PayoutDetail = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [totalPages,setTotalPages]=useState(0);
    const selectedTab = state?.selectedTab || 'Pending';
    const id = state?.id || null;
   const[data,setData]=useState([])
    
    const [page, setPage] = useState(1);
    const { data: getData, isLoading: loading, error } = useGetVendorRevenueDetail(page, id);
    console.log(error);
    
    console.log(getData);
    useEffect(() => {
        if (getData) {
            
setTotalPages(data?.totalPages);
            setData(getData?.revenue);
        }
    }, [getData]);
 

    const columns =
      selectedTab === "Pending"
        ? [
            "Product",
            "Purchased Date",
            "Actual Amount",
            "GST",
            "Coupon Discount",
            "Commission",
            "Earned Amount",
            "Payment Status",
          ]
        : [
            "Product",
            "Purchased Date",
            "Actual Amount",
            "GST",
            "Coupon Discount",
            "Commission",
            "Earned Amount"
          ];

  

    return (
      <div className="font-urbanist">
        <div className="flex gap-4 items-center mb-6">
          <svg
            className="cursor-pointer"
            onClick={() => navigate("/revenue", { state: { selectedTab } })}
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
          <PageHeading title="Details" />
        </div>

        <div className="mt-6 p-5 rounded-lg border border-naveBorder bg-containerWhite flex flex-col gap-4 w-full overflow-y-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-[#F8FAFC] h-10 font-semibold text-[14px] leading-[16.8px]">
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className={`px-2 pl-4 font-thin ${
                      index === 0
                        ? "rounded-l-lg"
                        : index === columns.length - 1
                        ? "rounded-r-lg"
                        : ""
                    }`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            {loading ? (
              <TableShimmer columnCount={8} rowCount={6} />
            ) : (
              <tbody className="text-[14px] leading-[16.8px] font-medium">
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className="h-[84px] border-b border-b-inputBorder"
                  >
                    <td className="px-2 pl-4">{item?.productName}</td>
                    <td className="px-2 pl-4">
                      {item?.createdAt && convertUTCToLocal(item?.createdAt)}
                    </td>
                    <td className="px-2 pl-4">
                      {item.offerPrice && item.offerPrice.toFixed(2)}
                    </td>
                    <td className="px-2 pl-4">{item?.tax}</td>
                    <td className="px-2 pl-4">
                      {item?.couponDiscount && item?.couponDiscount.toFixed()}
                    </td>
                    <td className="px-2 pl-4">
                      {item?.adminCommissionAmount &&
                        item?.adminCommissionAmount.toFixed(2)}
                    </td>
                    <td className="px-2 pl-4">
                      {item?.vendorRevenue && item?.vendorRevenue.toFixed(2)}
                    </td>
                    {selectedTab === "Pending" && (
                      <td
                        className={`px-2 pl-4 ${
                          item?.status === "pending"
                            ? "text-[#F0890C]"
                            : "text-[#03AA00]"
                        }`}
                      >
                        {item?.status}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            )}
          </table>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    );
};

export default PayoutDetail;
