import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../../components/pagination/ReviewPagination';
import { Modal, Box, Typography, Divider, Slide } from '@mui/material';
import TableShimmer from '../../../../components/loading/shimmer/TableShimmer';
import { useAddPayout } from '../../../../api/useDataControllerAdmin';
import { toast } from 'react-toastify';


const Table = ({ selectedTab ,data, loading }) => {
   
    const navigate = useNavigate();
  
    const [isModalOpen, setModalOpen] = useState(false);
    const [isBankModalOpen, setBankModalOpen] = useState(false);
    const [bankDetails, setBankDetails] = useState('')
    const [payIds, setPayIds] = useState({
    vendorId: '',
  bankId:''
    })
   const {mutate,isPending:payPending} = useAddPayout();

    const isPending = selectedTab === 'Payouts';

    const columns = isPending
        ? ['Vendor', 'Phone Number', 'Bank Account', 'Commission', 'Amount', 'Action']
        : ['Vendor', 'Phone Number', 'Bank Account', 'Commission', 'Amount', ''];


    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleOpenBankModal = () => setBankModalOpen(true);
    const handleCloseBankModal = () => setBankModalOpen(false);


    return (
      <div className="mt-[24px] rounded-lgflex flex-col gap-[16px] w-full font-urbanist overflow-y-auto">
        <table className="w-full min-w-[700px] text-left font-urbanist mb-8">
          <thead className="bg-[#F8FAFC] h-10 text-left font-[600] text-[14px] leading-[16.8px]">
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
            <TableShimmer columnCount={6} rowCount={12} />
          ) : (
            <tbody className="text-left font-[500] text-[14px] leading-[16.8px]">
              {data?.length > 0 &&
                data?.map((item) => (
                  <tr
                    className="h-[84px] border-b border-b-inputBorder cursor-pointer"
                    onClick={() =>
                      navigate("/admin/payout-detail", {
                        state: { selectedTab, id: item?.bank?.vendorId },
                      })
                    }
                  >
                    <td className="px-2 pl-4 font-thin">{item?.name}</td>
                    <td className="px-2 pl-4 font-thin">
                      {item?.dialCode}
                      {item?.phone}
                    </td>
                    <td
                      className="px-2 pl-4 font-thin underline"
                      onClick={(event) => {
                        event.stopPropagation();
                        setBankDetails(item?.bank);
                        handleOpenModal();
                      }}
                    >
                      {item?.bank?.bank}
                    </td>
                    <td className="px-2 pl-4 font-thin">
                      {item?.commission && item?.commission.toFixed(2)}%
                    </td>
                    <td className="px-2 pl-4 font-thin">
                      {item?.amount && item?.amount?.toFixed(2)}
                    </td>
                    {selectedTab === "Payouts" && (
                      <td className="px-2 pl-4">
                        <button
                          className="bg-[#3C7CF5] text-white text-[12px] px-5 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                          onClick={(event) => {
                            event.stopPropagation();
                              setPayIds({
                                vendorId: item?.bank?.vendorId,
                                bankId: item?.bank?._id,
                              });
                            handleOpenBankModal();
                          }}
                        >
                          Pay
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          )}
        </table>

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
                Account Details
              </Typography>
              <Divider />
              <div className="p-4">
                <div className="flex justify-between p-3 text-[14px]">
                  <span className="text-[#1B1B1B] opacity-80">Bank Name</span>
                  <span>{bankDetails?.bank}</span>
                </div>
                <div className="flex justify-between p-3 text-[14px]">
                  <span className="text-[#1B1B1B] opacity-80">
                    Account Holder
                  </span>
                  <span>{bankDetails?.accountHolderName}</span>
                </div>
                <div className="flex justify-between p-3 text-[14px]">
                  <span className="text-[#1B1B1B] opacity-80">
                    Account Number
                  </span>
                  <span>{bankDetails?.accountNumber}</span>
                </div>
                <div className="flex justify-between p-3 text-[14px]">
                  <span className="text-[#1B1B1B] opacity-80">IFSC</span>
                  <span>{bankDetails?.ifsc}</span>
                </div>
                <div className="flex justify-between p-3 text-[14px]">
                  <span className="text-[#1B1B1B] opacity-80">IBAN</span>
                  <span>{bankDetails?.iban}</span>
                </div>
              </div>
            </Box>
          </Slide>
        </Modal>

        <Modal
          open={isBankModalOpen}
          onClose={handleCloseBankModal}
          className="flex items-center justify-center"
        >
          <Slide direction="up" in={isBankModalOpen} timeout={700}>
            <Box
              sx={{
                transform: "translate(-50%, -50%)",
                width: "50%",
                maxWidth: "400px",
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
                Payment Confirmation
              </Typography>
              <Divider />
              <div className="p-6 flex flex-col items-center gap-4">
                <div className="flex flex-col items-center justify-center gap-2">
                  <svg
                    width="103"
                    height="103"
                    viewBox="0 0 103 103"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="51.5"
                      cy="51.5"
                      r="51.5"
                      fill="#CE5D06"
                      fill-opacity="0.1"
                    />
                    <path
                      d="M52.4187 53.4334L48.6027 57.2494L41.0414 49.6174L44.8574 45.8014L48.6734 49.6174L58.1427 40.1481L61.9587 43.9641L52.4187 53.4334Z"
                      fill="#CE5D06"
                    />
                    <path
                      d="M25 34V65.164H78V34H25ZM74.8907 55.836C71.428 55.836 68.672 58.592 68.672 62.0547H34.328C34.328 58.592 31.572 55.836 28.1093 55.836V43.3987C31.572 43.3987 34.328 40.6427 34.328 37.18H68.6013C68.6013 40.6427 71.3573 43.3987 74.82 43.3987V55.836H74.8907Z"
                      fill="#CE5D06"
                    />
                  </svg>

                  <span className="text-[16px] font-[400]">
                    Are you sure want to pay the vendor
                  </span>
                </div>

                <div className="flex gap-4 w-full mt-4">
                  <button
                    onClick={handleCloseBankModal}
                    className="flex-1 border border-[#CE5D06] text-[#CE5D06] py-2 rounded-md"
                  >
                    No
                  </button>
                  <button disabled={payPending}
                                    onClick={() => {
                                        mutate(payIds, {
                                            onSuccess: (data) => {
                                              toast.success("Payment Successfully")
                                                handleCloseBankModal()
  
                                            },
                                            onError: (error) => {
                                                toast.error(error.message)
                                            }
                                        })
                     }}
                    className="flex-1 bg-[#CE5D06] text-white py-2 rounded-md hover:bg-[#d57744] transition"
                  >
                   {payPending?'Laoding....': "Yes"}
                  </button>
                </div>
              </div>
            </Box>
          </Slide>
        </Modal>
      </div>
    );
};

export default Table;
