import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../../components/pagination/PaginationTable';
import TableShimmer from '../../../../components/loading/shimmer/TableShimmer';
import { convertUTCToLocal, formatDate } from '../../../../utils/dateFormate';
import EmptyScreen from '../../products/EmptyProductsScreen';

const Table = ({ selectedTab, page, setPage, data, loading }) => {

  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const isPending = selectedTab === "Pending";

  const columns = isPending
    ? ["Order ID", "Pending Amount", "Order Date", ""]
    : ["Payment ID", "Payment Amount", "Payment Date", ""];

  
  useEffect(() => {
    if (data) {
      setTotalPages(data?.totalPages);
    }

  }, [data])
  useEffect(() => {
    setPage(1);
  }, [selectedTab]);

  return (
    <div className="mt-[24px] p-5 sm:p-[26px] rounded-lg border border-naveBorder bg-containerWhite flex flex-col gap-[16px] w-full font-urbanist overflow-y-auto">
      <table className="w-full min-w-[700px] text-left font-urbanist">
        <thead className="bg-[#F8FAFC] h-10 text-left font-[600] text-[14px] leading-[16.8px]">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className={`px-2 pl-4 font-thin ${index === 0
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
          <TableShimmer columnCount={4} rowCount={6} />
        ) : (
          <tbody className="text-left font-[500] text-[14px] leading-[16.8px]">
            {data?.length > 0 ? (
              data?.map((item) => {

                return (
                  <tr className="h-[84px] border-b border-b-inputBorder">
                    <td className="px-2 pl-4 font-thin">
                      {!isPending
                        ? item?.paymentId?.slice(-5)
                        : item?.orderId && item?.orderId?.slice(-5)}
                    </td>
                    <td className="px-2 pl-4 font-thin">
                      {isPending
                        ? item?.pendingAmount?.toFixed()
                        : item?.completedAmount?.toFixed()}
                    </td>
                    <td className="px-2 pl-4 font-thin">
                     
                      {isPending
                        ? convertUTCToLocal(item?.orderDate)
                        : convertUTCToLocal(item?.adminPaidDate)}
                    </td>
                    <td
                      className="px-2 pl-4 text-red-500 cursor-pointer font-thin tracking-wide"
                      onClick={() =>
                        navigate("/payout-detail", {
                          state: {
                            selectedTab,
                            id: item?.orderId,
                          },
                        })
                      }
                    >
                      See Details
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="h-[84px] text-center font-[500] text-gray-500">
                  <EmptyScreen first='No payouts' second='Please check back later' />
                </td>
              </tr>
            )}
          </tbody>
        )}
      </table>

      {totalPages > 1 &&
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(page) => setPage(page)}
        />
      }
    </div>
  );
};

export default Table;
