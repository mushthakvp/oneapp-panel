import { Modal } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTakeAction, useUpdateCommission } from '../../../../api/useDataControllerAdmin';
import { toast } from 'react-toastify';

function CommissionModal({ isOpen, setIsOpen, vendor, currentCommission, setCurrentCommission }) {

  const navigate = useNavigate();

  const [approved, setIsApproved] = useState(false)
  const [commission, setCommission] = useState(currentCommission || '');
  const { mutate: takeAction, isPending } = useTakeAction();
  const { mutate: changeCommission, isPending: pendingCommissionChange } = useUpdateCommission();

  useEffect(() => {
    const handleWheel = (e) => {
      if (document.activeElement.type === 'number') {
        document.activeElement.blur();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleApprove = () => {
    if (!commission) return;
    
    const payload = {
      vendorId: vendor?._id,
      commission: parseFloat(commission),
    };

    takeAction(
      { payload, action: 'Approve' },
      {
        onSuccess: () => {
          setIsApproved(true);
          setTimeout(() => {
            setIsOpen(false);
            setIsApproved(false);
            setCommission('');
            navigate('/admin/vendors', { state: { tab: 'Requests' } });
          }, 2000);
        },
        onError: (error) => {
          console.error('Approval failed:', error);
          toast.error(error?.message|| 'Approval failed. Please try again.');
        },
      }
    );
  };

  const handleCommissionChange = () => {
    if (!commission) return;
    
    const payload = {
      vendorId: vendor?._id,
      commission: parseFloat(commission),
    };

    changeCommission(
      { payload },
      {
        onSuccess: () => {
          setIsOpen(false);
          setCommission('');
          toast.success('Commission updated successfully.');
          setCurrentCommission(commission);
          // navigate('/admin/vendors', { state: { tab: 'Requests' } });
        },
        onError: (error) => {
          console.error('Commission updation failed:', error);
          toast.error(error?.message|| 'Commission updation failed. Please try again.');
        },
      }
    );
  };


  return (
    <Modal
      open={isOpen}
      onClose={() => !isPending && !pendingCommissionChange && setIsOpen(false)}
      className="flex items-center justify-center outline-none font-urbanist"
    >
      <>
        {!approved && (
          <div className="outline-none  w-full max-w-[332px] rounded-md bg-containerWhite">
            <p className="p-3 text-center border-b border-inputBorder font-[600] text-[18px]">
              Add Commission
            </p>
            <div className="mt-4  p-4">
              <p className="text-[14px] font-[400] mb-2">Commission</p>
              <input
                type="number"
                placeholder="--%"
                value={commission}
                onChange={(e) => setCommission(e.target.value)}
                disabled={isPending || pendingCommissionChange}
                className="min-h-[73px] p-2 w-full border border-inputBorder rounded-md focus:outline-none"
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
              />
              <button
                // onClick={handleApprove}
                onClick={() => {
                  if (currentCommission) {
                    handleCommissionChange();
                  } else {
                    handleApprove();
                  }
                }}
                disabled={isPending || !commission || pendingCommissionChange}
                className="w-full p-2 flex justify-center items-center bg-buttonColor text-white rounded-md mt-4"
              >
                {isPending || pendingCommissionChange ? 'Processing...' : 'Save'}
              </button>
            </div>
          </div>
        )}

        {approved && (
          <div className="outline-none text-center w-full max-w-[332px] rounded-md bg-containerWhite flex flex-col justify-center items-center gap-5 p-4">
            <div className="w-full flex justify-center items-center">
              <img
                src="/tick.gif"
                className="w-full max-w-[90px] max-h-[90px]"
                alt=""
              />
            </div>
            <div>
              <h1 className="text-[24px] font-[700]">Approved !</h1>
              <p className="text-[12px] font-[400] mt-[7px]">
                The vendor request successfully approved
              </p>
            </div>
          </div>
        )}
      </>
    </Modal>
  );
}

export default CommissionModal
