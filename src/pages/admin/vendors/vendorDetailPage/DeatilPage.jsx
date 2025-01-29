import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import PageHeading from '../../../../components/pageHeding/PageHeading';
import TopDiv from './TopDiv';
import Products from './Product/Products';
import CommissionModal from '../modals/CommisionModal';
import RejectModal from '../modals/RejectModal';
import BlockModal from '../modals/BlockModal';
import UnblockModal from '../modals/UnblockModal';
import PrevReasonModal from '../modals/PrevReasonModal';

function DetailPage() {

  const navigate = useNavigate();
  const location = useLocation();
  // const vendor = location.state?.vendor;
  const { vendor, status } = location.state || {};

  const [isOpen, setIsOpen] = useState(false);
  const [ApproveOpen, setApproveOpen] = useState(false);
  const [BlockOpen, setBlockOpen] = useState(false);
  const [Unblock, setUnblock] = useState(false);
  const [prevReasonOpen, setPrevReasonOpen] = useState(false);

  const handleAction = (action) => {
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
      case 'request':
        setPrevReasonOpen(true);
        break;
      default:
        break;
    }
  };

  const getAttemptTitle = (index) => {
    const attemptNumber = index + 1;
    const suffix = attemptNumber === 1 ? 'st' : attemptNumber === 2 ? 'nd' : attemptNumber === 3 ? 'rd' : 'th';
    return `${attemptNumber}${suffix}`;
  };


  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <svg
            onClick={() => navigate('/admin/vendors', { state: { tab: status } })}
            width="26"
            height="20"
            viewBox="0 0 26 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25 10H1M1 10L10 1M1 10L10 19"
              stroke="black"
              stroke-width="1.98214"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <PageHeading title="Vendor Details" />
        </div>
        {status === "Blocked" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAction('unblock')
            }
            }
            className="text-sm flex items-center justify-center p-2 h-[44px] bg-[#E31F1F] px-4 rounded-md text-white">
            Unblock Vendor
          </button>
        )}
        {status === "Requests" && vendor?.rejectReasons?.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAction('request')
            }
            }
            className="text-sm flex items-center justify-center p-2 h-[44px] text-buttonColor bg-[#2f4eff0f1A] border border-buttonColor px-4 rounded-md">
            Previous Reason
          </button>
        )}
        {status === "Approved" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAction('block')
            }
            }
            className="text-sm flex items-center justify-center p-2 h-[44px] bg-[#E31F1F] px-4 rounded-md text-white">
            Block Vendor
          </button>
        )}
      </div>
      <div className="bg-containerWhite mt-[15px] p-[22px] rounded-md ">
        {/* topDivs */}
        <TopDiv vendor={vendor} status={status} />

        {/* buttonSection */}
        {status === "Requests" && (
          <>
            <div className="flex items-center justify-center w-full gap-4 mt-6">
              <button
                // onClick={() => setApproveOpen(!ApproveOpen)}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAction('approve')
                }
                }
                className="p-2 px-4 bg-[#12A42D] max-w-[246px] rounded-md w-full text-white"
              >
                Approve
              </button>
              <button
                // onClick={() => setIsOpen(!isOpen)}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAction('reject')
                }
                }
                className="p-2 px-4 bg-[#E31F1F] rounded-md max-w-[246px] w-full text-white"
              >
                Reject
              </button>
            </div>
            <p className='text-center mt-3 text-[16px] font-[500]'>{getAttemptTitle(vendor?.rejectCount)} Attempt of the vendor</p>
          </>
        )}
      </div>

      {/* tableSections */}
      {(status === "Blocked" || status === "Approved"||!status) && (
        <div className="bg-containerWhite mt-[15px] p-[22px] rounded-md ">
          <Products vendor={vendor} />
        </div>
      )}

      <BlockModal isOpen={BlockOpen} setIsOpen={setBlockOpen} vendor={vendor} />
      <UnblockModal isOpen={Unblock} setIsOpen={setUnblock} vendor={vendor} />
      <RejectModal isOpen={isOpen} setIsOpen={setIsOpen} status={status} vendor={vendor} />
      <CommissionModal isOpen={ApproveOpen} setIsOpen={setApproveOpen} vendor={vendor} />
      <PrevReasonModal isOpen={prevReasonOpen} setIsOpen={setPrevReasonOpen} status={status} vendor={vendor} />

    </div>
  );
}

export default DetailPage
