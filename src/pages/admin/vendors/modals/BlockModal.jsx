import { Modal } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTakeAction } from '../../../../api/useDataControllerAdmin';
import { toast } from 'react-toastify';


function BlockModal({ isOpen, setIsOpen, vendor }) {

  const navigate = useNavigate();
  const [approved, setIsApproved] = useState(false);
  const [blockReason, setBlockReason] = useState('');
  const { mutate: takeAction, isPending } = useTakeAction();

  const handleBlock = () => {
    if (!blockReason) {
      toast.error('Please enter a reason for blocking.');
      return;
    };

    const payload = {
      vendorId: vendor?._id,
      blockReason: blockReason,
    };

    takeAction(
      { payload, action: 'Block' },
      {
        onSuccess: () => {
          // toast.success('Vendor blocked successfully.');
          // setIsOpen(false);
          setIsApproved(true);
          setTimeout(() => {
            setIsOpen(false);
            setIsApproved(false);
            setBlockReason('');
            navigate('/admin/vendors', { state: { tab: 'Approved' } });
          }, 2000);
          // toast.success('Vendor blocked successfully.');
        },
        onError: (error) => {
          toast.error(error?.message || 'Blocking failed. Please try again.');
          console.error('Blocking failed:', error);
        },
      }
    );
  };


  return (
    // <Modal className='flex items-center justify-center' open={isOpen} onClose={() => setIsOpen(false)}>
    //   <div className="outline-none text-center w-full max-w-[332px] rounded-md bg-containerWhite flex flex-col justify-center items-center gap-5 p-4">
    //     <div className="w-full flex justify-center items-center">
    //       <svg
    //         width="94"
    //         height="94"
    //         viewBox="0 0 94 94"
    //         fill="none"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path
    //           d="M46.9997 86.1666C68.6308 86.1666 86.1663 68.6311 86.1663 47C86.1663 37.2417 82.5977 28.317 76.6943 21.4596L21.4593 76.6946C28.3167 82.598 37.2414 86.1666 46.9997 86.1666Z"
    //           fill="#E31F1F"
    //         />
    //         <path
    //           d="M46.9997 7.83331C25.3685 7.83331 7.83301 25.3688 7.83301 47C7.83301 56.7582 11.4016 65.683 17.3051 72.5403L72.54 17.3054C65.6827 11.402 56.7579 7.83331 46.9997 7.83331Z"
    //           fill="#E31F1F"
    //         />
    //       </svg>
    //     </div>
    //     <div>
    //       <h1 className="text-[24px] font-[700]">Block</h1>
    //       <p className="text-[12px] font-[400] mt-[7px]">
    //         Are you sure want to block the Product
    //       </p>
    //     </div>
    //     <div className="flex items-center gap-2 w-full">
    //       <button onClick={() => setIsOpen(false)} className="text-sm w-full h-[35px] flex items-center justify-center text-buttonColor border border-buttonColor rounded-md">
    //         No
    //       </button>
    //       <button onClick={handleBlock} className="text-sm w-full h-[35px] flex items-center justify-center rounded-md text-white bg-buttonColor border border-buttonColor">
    //         Yes
    //       </button>
    //     </div>
    //   </div>
    // </Modal>

    <Modal
      open={isOpen}
      onClose={() => !isPending && setIsOpen(false)}
      className="flex items-center justify-center outline-none font-urbanist"
    >
      <>
        {!approved && (
          <div className="outline-none  w-full max-w-[332px] rounded-md bg-containerWhite">
            <p className="p-3 text-center border-b border-inputBorder font-[600] text-[18px]">
              Reason
            </p>
            <div className=" p-4">
              <p className="text-[14px] font-[400] mb-2">Reason</p>
                <textarea
                  type="text"
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                  disabled={isPending}
                  className={`min-h-[73px] p-2 w-full border border-inputBorder rounded-md focus:outline-none ${status === "Rejected" && "cursor-not-allowed focus:outline-none"
                    }`}
                />
  
                <button
                  onClick={handleBlock}
                  disabled={isPending || !blockReason}
                  className="w-full p-2 flex justify-center items-center bg-buttonColor text-white rounded-md mt-4"
                >
                  {isPending ? 'Processing...' : 'Block'}
                </button>
            </div>
          </div>
        )}
        {approved && (
          <div className="outline-none text-center w-full max-w-[332px] rounded-md bg-containerWhite flex flex-col justify-center items-center gap-5 p-4">
            <div className="w-full flex justify-center items-center">
              <svg
                width="80"
                height="79"
                viewBox="0 0 80 79"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M79.1664 39.5C79.1664 61.1312 61.6308 78.6667 39.9997 78.6667C18.3685 78.6667 0.833008 61.1312 0.833008 39.5C0.833008 17.8689 18.3685 0.333374 39.9997 0.333374C61.6308 0.333374 79.1664 17.8689 79.1664 39.5ZM28.1307 27.6312C29.2779 26.484 31.1378 26.484 32.285 27.6312L39.9996 35.3458L47.7141 27.6313C48.8612 26.4841 50.7211 26.4841 51.8683 27.6313C53.0155 28.7784 53.0155 30.6383 51.8683 31.7855L44.1538 39.5L51.8682 47.2144C53.0154 48.3616 53.0154 50.2215 51.8682 51.3687C50.7211 52.5159 48.8611 52.5159 47.714 51.3687L39.9996 43.6543L32.2851 51.3688C31.1379 52.5159 29.278 52.5159 28.1308 51.3688C26.9836 50.2216 26.9836 48.3617 28.1308 47.2145L35.8453 39.5L28.1307 31.7854C26.9836 30.6383 26.9836 28.7783 28.1307 27.6312Z"
                  fill="#E31F1F"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-[24px] font-[700]">Blocked !</h1>
              <p className="text-[12px] font-[400] mt-[7px]">
                Blocked the vendor successfully
              </p>
            </div>
          </div>
        )}
      </>
    </Modal>
  );
}

export default BlockModal
