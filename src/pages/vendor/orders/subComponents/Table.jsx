import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../../components/pagination/PaginationTable';
import { useGetVendorOrders } from '../../../../api/useDataController';
import TableShimmer from '../../../../components/loading/shimmer/TableShimmer';
import EmptyScreen from '../../products/EmptyProductsScreen';


function Products() {

    const navigate = useNavigate();
    const [selectedStatus, setSelectedStatus] = useState('Pending');
    const [selectedOption, setSelectedOption] = useState("This Week");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPage] = useState(1)
const [search,setSearch] =useState('')
    const options = ["This Week", "This Month", "This Year"];

    const filterEnum = {
        "This Week": "thisWeek",
        "This Month": "thisMonth",
        "This Year": "thisYear"
    };

    const statuses = ['Pending', 'Exchanged', 'Cancelled', 'Returned', 'Delivered'];

    const {
        data,
        isLoading,
        error,
    } = useGetVendorOrders(selectedStatus, filterEnum[selectedOption], page, 10,search);

    useEffect(() => {
        setPage(1);
    }, [selectedStatus, selectedOption]);

    useEffect(() => { setTotalPage(data?.totalPage); }, [data])

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
    };

    const handleRowClick = (orderId) => {
        navigate('/order-detail', { state: { orderId: orderId } });
    };

    return (
      <>
        <div className="relative w-32 flex justify-self-end mt-[14px]">
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
            <div className="absolute right-0 top-full mt-1 bg-white rounded shadow-lg w-full">
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className={`px-4 py-2 hover:bg-gray-300 text-[14px] ${
                    selectedOption === option ? "bg-gray-200" : ""
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-[14px] sm:p-[8px] gap-[16px] rounded-lg border border-naveBorder bg-containerWhite flex flex-col w-full font-urbanist overflow-y-auto">
          <div className="flex justify-between w-full bg-white text-gray-600">
            {statuses.map((status) => (
              <span
                key={status}
                className={`cursor-pointer text-center text-[14px] px-4 py-4 rounded-md w-full ${
                  selectedStatus === status ? "bg-buttonColor text-white" : ""
                }`}
                onClick={() => setSelectedStatus(status)}
              >
                {status}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-[24px] p-5 sm:p-[26px] rounded-lg border border-naveBorder bg-containerWhite flex flex-col gap-[16px] w-full font-urbanist overflow-y-auto">
          <div className="flex items-center w-full gap-5">
            <div className="w-full h-10 border border-inputBorder max-w-[80%] rounded-md px-4 flex items-center gap-3">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.82345 15.5668C12.5466 15.5668 15.5649 12.5486 15.5649 8.8254C15.5649 5.10222 12.5466 2.08398 8.82345 2.08398C5.10027 2.08398 2.08203 5.10222 2.08203 8.8254C2.08203 12.5486 5.10027 15.5668 8.82345 15.5668Z"
                  stroke="#ACACAC"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.5156 13.8652L16.1586 16.5014"
                  stroke="#ACACAC"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <input
                type="text"
                className="w-full max-w-[90%] h-full outline-none border-none bg-transparent"
                name=""
                id=""
                placeholder="Search Order ID"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 bg-buttonColor text-white px-4 py-2 rounded-lg  self-end">
              {/* SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v12m0 0l-3-3m3 3l3-3M16.5 19.5H7.5M21 14.5v4a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 18.5v-4"
                />
              </svg>
              Download Reports
            </button>
          </div>

          <table className="w-full min-w-[700px] text-left font-urbanist">
            <thead className="bg-[#F8FAFC] h-10 text-left font-[600] text-[14px] leading-[16.8px]">
              <th className="px-2 pl-4 font-thin rounded-l-lg">Order Id</th>
              <th className="px-2 pl-4 font-thin">
                Product{" "}
                <span className="text-xs font-light">(Number Of Product)</span>
              </th>
              <th className="px-1 pl-4 font-thin">Order Date</th>
              <th className="px-1 pl-4 font-thin">Total Price</th>
              <th className="px-1 pl-4 font-thin">Total Discount</th>
              <th className="px-1 pl-4 font-thin rounded-r-lg">Sub Total</th>
            </thead>
            {isLoading ? (
              <TableShimmer columnCount={6} rowCount={3} />
            ) : (
              <tbody className="text-left font-[500] text-[14px] leading-[16.8px]">
                {data?.orders?.length > 0 ? (
                  data.orders.map((order) => (
                    <tr
                      key={order.orderId}
                      className="h-[84px] border-b border-b-inputBorder cursor-pointer"
                      onClick={() => handleRowClick(order.orderId)}
                    >
                      <td className="px-2 pl-4 font-thin">
                        #{order.orderId?.slice(-5)}
                      </td>
                      <td className="px-2 pl-4 font-thin">
                        {order.productCount}
                      </td>
                      <td className="px-2 pl-4 font-thin">
                        {order?.date && order?.date.split("T")[0]}
                      </td>
                      <td className="px-2 pl-4 font-thin">
                        {order.price?.totalPrice?.toFixed(2)}
                      </td>
                      <td className="px-2 pl-4 font-thin">
                        {order.price?.totalDiscount?.toFixed(2)}
                      </td>
                      <td className="px-2 pl-4 font-thin">
                        {order.price?.subtotal?.toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="h-[84px] text-center font-[500] text-gray-500"
                    >
                      {/* No orders available */}
                      <EmptyScreen
                        first="No orders"
                        second="Please check back later"
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>

          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(page) => setPage(page)}
            />
          )}
        </div>
      </>
    );
}

export default Products


