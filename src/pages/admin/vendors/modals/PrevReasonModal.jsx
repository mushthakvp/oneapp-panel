import { Modal } from '@mui/material';
import React from 'react';

function PrevReasonModal({ isOpen, setIsOpen, vendor }) {

    const getAttemptTitle = (index) => {
        const attemptNumber = index + 1;
        const suffix = attemptNumber === 1 ? 'st' : attemptNumber === 2 ? 'nd' : attemptNumber === 3 ? 'rd' : 'th';
        return `${attemptNumber}${suffix} Attempt Reason`;
    };

    
    return (
        <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="flex items-center justify-center outline-none font-urbanist"
        >
            <div className="outline-none w-full max-w-[500px] rounded-lg bg-containerWhite">
                <p className="p-3 text-center border-b border-inputBorder font-[600] text-[16px]">
                    Previous Reasons
                </p>
                <div className="p-4">
                    {vendor?.rejectReasons?.map((reason, index) => (
                        <div key={index} className="mb-4">
                            <p className="text-[14px] font-[600] mb-1">{getAttemptTitle(index)}</p>
                            <p className="text-[14px] font-[400] opacity-80">{reason}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    );
}

export default PrevReasonModal;

