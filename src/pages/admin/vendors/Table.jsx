import { Modal } from '@mui/material';
import React, { useState } from 'react'
import CommissionModal from './modals/CommisionModal';
import RejectModal from './modals/RejectModal';
import BlockModal from './modals/BlockModal';
import UnblockModal from './modals/UnblockModal';
import { useNavigate } from 'react-router-dom';
import TableShimmer from '../../../components/loading/shimmer/TableShimmer';
import EmptyScreen from '../../vendor/products/EmptyProductsScreen';


function Table({ data, status, isLoading }) {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [ApproveOpen, setApproveOpen] = useState(false);
  const [BlockOpen, setBlockOpen] = useState(false);
  const [Unblock, setUnblock] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const handleAction = (action, vendor) => {
    setSelectedVendor(vendor);
    switch (action) {
      case 'approve':
        setApproveOpen(true);
        break;
      case 'reject':
        setIsOpen(true);
        break;
      case 'block':
        setBlockOpen(true);
        break;
      case 'unblock':
        setUnblock(true);
        break;
      default:
        break;
    }
  };



  return (
    <table className="w-full min-w-[700px] text-start mt-[21px] font-urbanist">
      <thead className="text-left bg-[#F8FAFC] font-[600] text-[14px]  ">
        <th className="px-3 p-3 rounded-l-lg opacity-60">Vendors</th>
        <th className="px-3 p-3 opacity-60 ">Phone Number</th>
        <th className="px-3 p-3  opacity-60">Email</th>
        <th className="px-3 p-3  opacity-60">Country</th>
        <th className="px-3 p-3  opacity-60">State</th>
        {status !== "Rejected" && (
          <th className="px-3 p-3 opacity-60 rounded-r-lg ">Action</th>
        )}
        {status === "Rejected" && (
          <th className="px-3 p-3 opacity-60 rounded-r-lg ">Reason</th>
        )}
      </thead>

      {isLoading ? (
        <TableShimmer columnCount={6} rowCount={5} />
      ) : (
        <tbody>
          {data?.length > 0 ? (
            data?.map((item, index) => (
              <tr
                onClick={() => navigate("/admin/vendor-detailPage", {state: { vendor: item, status: status } })}
                className="h-[50px] text-left font-[500] text-[14px] cursor-pointer">
                <td className="px-3 p-3">{item?.name}</td>
                <td className="px-3 p-3">{item?.dialCode} {item?.phone}</td>
                <td className="px-3 p-3">{item?.email}</td>
                <td className="px-3 p-3">{item?.country}</td>
                <td className="px-3 p-3">{item?.state}</td>
                <td className="px-3 p-3">
                  <div className="flex items-center gap-2">
                    {status === "Requests" && (
                      <>
                        <button
                          // onClick={() => setApproveOpen(!ApproveOpen)}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction('approve', item)}
                          }
                          className="p-2 px-4 bg-[#12A42D] rounded-md text-white"
                        >
                          Approve
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction('reject', item)}
                          }
                          className="p-2 px-4 bg-buttonColor rounded-md text-white"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {(status === "Approved" || status === "Blocked") && (
                      <button onClick={(e) => {
                        // e.stopPropagation();
                        if (status === "Approved") {
                          // setBlockOpen(!BlockOpen)
                          e.stopPropagation();
                          handleAction('block', item)
                        } else {
                          // setUnblock(!Unblock)
                          e.stopPropagation();
                          handleAction('unblock', item)
                        }
                      }} className="p-2 px-4 bg-buttonColor rounded-md text-white">
                        {status === "Approved" ? "Block" : "Unblock"}
                      </button>
                    )}
                    {status === "Rejected" && (
                      <>
                        <p
                          className="line-clamp-1 cursor-pointer underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(!isOpen);
                            setSelectedVendor(item);
                          }}
                        >
                          {item?.rejectedReason}
                        </p>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="h-[84px] text-center font-[500] text-gray-500">
                {/* No vendors available */}
                <EmptyScreen first='No vendors' second='No vendors available' />
              </td>
            </tr>
          )}
        </tbody>
      )}

      <BlockModal isOpen={BlockOpen} setIsOpen={setBlockOpen} vendor={selectedVendor} />
      <UnblockModal isOpen={Unblock} setIsOpen={setUnblock} vendor={selectedVendor} />
      <RejectModal isOpen={isOpen} setIsOpen={setIsOpen} status={status} vendor={selectedVendor} rejectReason={selectedVendor?.rejectedReason} />
      <CommissionModal isOpen={ApproveOpen} setIsOpen={setApproveOpen} vendor={selectedVendor} />
    </table>
  );
}

export default Table
