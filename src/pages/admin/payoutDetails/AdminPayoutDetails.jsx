import React, { useEffect, useState } from 'react';
import PageHeading from '../../../components/pageHeding/PageHeading';
import { useNavigate, useLocation } from 'react-router-dom';
import Pagination from '../../../components/pagination/PaginationTable';
import TableShimmer from '../../../components/loading/shimmer/TableShimmer';
import Third from '../../../assets/products/third.png';
import { Modal, Box, Typography, Divider, Slide } from '@mui/material';
import { useGetAmountDetails, useGetPayoutDetails } from '../../../api/useDataControllerAdmin';
import { convertUTCToLocal } from '../../../utils/dateFormate';
import { toast } from 'react-toastify';


const PayoutDetail = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const selectedTab = state?.selectedTab || 'Pending';
    const vendorId = state?.id;
    const [page, setPage] = useState(1);
    const [isModalOpen, setModalOpen] = useState(false);
    
const[status,setStatus]=useState();
    const totalPages = 5
    useEffect(() => {
    if (selectedTab === "Payouts") {
      setStatus("payouts");
    } else if (selectedTab === "History") {
      setStatus("history");
    } 
},[selectedTab])
    const columns = selectedTab === 'Pending'
        ? ['Customer', 'Product', 'Purchased Date', 'Payment Method', 'PAyment ID', 'Coupon Applied', 'Coupon Code', 'Amount']
        : ['Customer', 'Product', 'Purchased Date', 'Payment Method', 'PAyment ID', 'Coupon Applied', 'Coupon Code', 'Amount'];

  

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);
    const { data, error, isLoading: loading } = useGetPayoutDetails(status, vendorId, page);
   let type = 'amount';
    const { data: payData, error: payError } = useGetAmountDetails(status, vendorId, type);
    type = "vendor";
     const { data: vendorData, error: vendorError,isLoading:vendorLoading } = useGetAmountDetails(
       status,
       vendorId,
       type
     );
    console.log(vendorData);
    console.log(vendorError);
    

    return (
      <div className="font-urbanist">
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center mb-6">
            <svg
              className="cursor-pointer"
              onClick={() =>
                navigate("/admin/payouts", { state: { selectedTab } })
              }
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
            <PageHeading title="Payout Details" />
          </div>

          <div className="flex gap-3 items-center">
            <button
              onClick={() => {
                if (vendorLoading) {
                  toast.info("Wait some time, data is loading...");
                }
                  navigate("/admin/vendor-detailPage", {
                    state: { vendor: vendorData },
                  });
              }}
              className="text-buttonColor border border-buttonColor px-4 py-2 rounded-md bg-[#2f4eff0f1A] text-[16px]"
            >
              See Vendor Details
            </button>

            <button
              onClick={handleOpenModal}
              className="bg-buttonColor border border-buttonColor px-4 py-2 text-white rounded-md text-[16px]"
            >
              Show Amount Details
            </button>
          </div>
        </div>

        <div className="mt-6 p-5 rounded-lg border border-naveBorder bg-containerWhite flex flex-col gap-4 w-full overflow-y-auto">
          <table className="w-full min-w-[900px] text-left">
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
                {data?.orders?.length > 0 &&
                  data?.orders?.map((item, index) => (
                    <tr
                      key={index}
                      className="h-[84px] border-b border-b-inputBorder"
                    >
                      <td className="px-2 pl-4">{item?.userId?.name}</td>
                      {/* <td className="px-2 pl-4">{item.product}</td> */}
                      <td className="px-2 pl-4 ">
                        <div className="flex items-center gap-2">
                          <img
                            src={item?.images?.length > 0 && item?.images[0]}
                            className="h-[48px] w-[48px]"
                            alt=""
                          />
                          {item?.productName}
                        </div>
                      </td>
                      <td className="px-2 pl-4">
                        {convertUTCToLocal(item?.createdAt)}
                      </td>
                      <td className="px-2 pl-4">
                        {item?.paymentId?.paymentMethod}
                      </td>
                      <td className="px-2 pl-4">{item.paymentId?._id}</td>
                      <td className="px-2 pl-4">{item?.coupon}</td>
                      <td className="px-2 pl-4">{item?.couponCode}</td>
                      <td className="px-2 pl-4">{item?.vendorRevenue}</td>
                      {selectedTab === "Pending" && (
                        <td
                          className={`px-2 pl-4 ${
                            item.status === "Pending"
                              ? "text-[#F0890C]"
                              : "text-[#03AA00]"
                          }`}
                        >
                          {item.status}
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            )}
          </table>

          {data?.totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={data?.totalPages}
              onPageChange={(page) => setPage(page)}
            />
          )}
        </div>

        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          className="flex items-center justify-center"
        >
          <Slide direction="up" in={isModalOpen} timeout={700}>
            <Box
              sx={{
                transform: "translate(-50%, -50%)",
                width: "50%",
                maxWidth: "350px",
                bgcolor: "white",
                boxShadow: 20,
                borderRadius: 3,
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{ textAlign: "center", fontWeight: "semibold", p: 2 }}
              >
                Amount Details
              </Typography>
              <Divider />
              <div className="p-4">
                <div className="flex justify-between p-3 text-[14px]">
                  <span className="text-[#1B1B1B] opacity-80">
                    Total Amount
                  </span>
                  <span>
                    {payData?.amount?.totalAmount &&
                      payData?.amount?.totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between p-3 text-[14px]">
                  <span className="text-[#1B1B1B] opacity-80">
                    Commission Amount
                  </span>
                  <span>
                    {payData?.amount?.totalCommission &&
                      payData?.amount?.totalCommission.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between p-3 text-[14px]">
                  <span className="text-[#1B1B1B] opacity-80">
                    Vendor Amount
                  </span>
                  <span>
                    {payData?.amount?.totalVendorRevenue &&
                      payData?.amount?.totalVendorRevenue.toFixed(2)}
                  </span>
                </div>
              </div>
            </Box>
          </Slide>
        </Modal>
      </div>
    );
};

export default PayoutDetail;
