import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const OrderStatusModal = ({ product, isOpen, onClose }) => {


    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <div className="relative">
                {/* Top border gradient */}
                <div className="absolute top-16 left-6 right-[450px] h-[3.5px] bg-[#DB3022]" />
                <div className="absolute top-16 left-6 right-6 h-[0.5px] bg-[#D9D9D9]" />

                <DialogTitle className="flex justify-between items-center border-b-0 mx-6 pb-2 pt-4">
                    <span className="text-xl font-semibold">Order Status</span>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent className="mt-4 px-6">
                    <OrderStatusTimeline currentStatus={product?.orderStatus} shippingInfo={product?.shippingInfo} />
                </DialogContent>
            </div>
        </Dialog>
    );
};

export default OrderStatusModal;


// Timeline Component
// const OrderStatusTimeline = ({ currentStatus, shippingInfo }) => {

//     const steps = [
//         {
//             id: 'placed',
//             title: 'Order Placed',
//             // note: '(The delivery boy will pick up the product at this time)',
//         },
//         {
//             id: 'packed',
//             title: 'Order Packed',
//         },
//         {
//             id: 'picking',
//             title: 'Order Picking',
//         },
//         {
//             id: 'shipped',
//             title: 'Order Shipped',
//         },
//         {
//             id: 'delivered',
//             title: 'Order Delivered',
//         }
//     ];

//     const getStatusIndex = (status) => {
//         return steps.findIndex(step => step.id === status?.toLowerCase());
//     };

//     const isCompleted = (stepIndex) => {
//         const currentStatusIndex = getStatusIndex(currentStatus);
//         return stepIndex <= currentStatusIndex;
//     };

//     const isLineCompleted = (stepIndex) => {
//         const currentStatusIndex = getStatusIndex(currentStatus);
//         return stepIndex < currentStatusIndex;
//     };

//     const getStatusDate = (stepId) => {
//         const statusUpdate = shippingInfo?.find(
//             update => update.status.toLowerCase() === stepId
//         );
//         return statusUpdate?.date || '';
//     };

//     function formatDate(dateString) {
//         const date = new Date(dateString);
//         const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
//         const formattedDate = date.toLocaleDateString('en-GB', options);
//         const formattedTime = date.toLocaleTimeString('en-US', {
//             hour: '2-digit',
//             minute: '2-digit',
//             hour12: true,
//         });
//         return `${formattedDate} ${formattedTime}`;
//     }


//     return (
//         <div className="relative pl-8 py-4">
//             {steps.map((step, index) => (
//                 <div key={step.id} className="mb-12 last:mb-0 relative">
//                     {/* Connecting line */}
//                     {index < steps.length - 1 && (
//                         <div
//                             className={`absolute left-[-13px] top-5 w-0.5 h-[calc(100%+22px)] 
//                                 ${isLineCompleted(index) ? 'bg-[#DB3022]' : 'bg-[#D9D9D9]'}`}
//                         />
//                     )}

//                     {/* Circle indicator */}
//                     <div
//                         className={`absolute left-[-20px] top-0 w-4 h-4 rounded-full border-2 z-10
//                             ${isCompleted(index)
//                                 ? 'bg-[#DB3022] border-[#DB3022]'
//                                 : 'bg-[#D9D9D9] border-[#D9D9D9]'
//                             }`}
//                     />

//                     {/* Content */}
//                     <div className="pl-4">
//                         <h4 className="font-medium text-base mb-1">{step.title}</h4>
//                         {getStatusDate(step.id) && (
//                             <>
//                                 <p className="text-gray-400 text-sm">
//                                     {/* {new Date(getStatusDate(step.id)).toLocaleString()} */}
//                                     {formatDate(getStatusDate(step.id))}
//                                 </p>
//                                 {step.note && (
//                                     <p className="text-gray-400 text-xs italic mt-1">{step.note}</p>
//                                 )}
//                             </>
//                         )}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );


// };


const OrderStatusTimeline = ({ shippingInfo }) => {
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
        return `${formattedDate} ${formattedTime}`;
    }

    return (
        <div className="relative pl-8 py-4">
            {shippingInfo?.map((step, index) => (
                <div key={step.status} className="mb-12 last:mb-0 relative">
                    {/* Connecting line */}
                    {index < shippingInfo.length - 1 && (
                        <div
                            className="absolute left-[-13px] top-5 w-0.5 h-[calc(100%+22px)] bg-[#DB3022]"
                        />
                    )}

                    {/* Circle indicator */}
                    <div
                        className="absolute left-[-20px] top-0 w-4 h-4 rounded-full border-2 z-10
                            bg-[#DB3022] border-[#DB3022]"
                    />

                    {/* Content */}
                    <div className="pl-4">
                        <h4 className="font-medium text-base mb-1 capitalize">{step.status}</h4>
                        {step.date && (
                            <p className="text-gray-400 text-sm">
                                {formatDate(step.date)}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
