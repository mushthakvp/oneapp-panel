import { Modal } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

function BlockModal({ isOpen, setIsOpen, product, onConfirm, isLoading, selectedButton }) {
    const [blockReason, setBlockReason] = useState('');

    const handleBlock = () => {
        if (!blockReason) {
            toast.error('Please enter a reason for blocking.');
            return;
        }
        onConfirm(blockReason);
        setBlockReason('');
    };

    const handleClose = () => {
        if (!isLoading) {
            setIsOpen(false);
            setBlockReason('');
        }
    };

    return (
        <Modal
            className="flex items-center justify-center"
            open={isOpen}
            onClose={handleClose}
        >
            <div className="outline-none w-full max-w-[332px] rounded-md bg-containerWhite p-4">
                <p className="text-lg font-semibold text-center mb-4">Block Product</p>
                <p className="text-sm mb-2">Reason for blocking "{product?.name}":</p>
                {selectedButton === "all" ? (
                    <>
                        <textarea
                            value={blockReason}
                            onChange={(e) => setBlockReason(e.target.value)}
                            disabled={isLoading}
                            className="w-full p-2 border rounded-md focus:outline-none"
                        />
                        <div className="flex gap-2 mt-4">
                            <button onClick={handleClose} className="flex-1 py-2 border rounded-md">
                                Cancel
                            </button>
                            <button
                                onClick={handleBlock}
                                disabled={isLoading || !blockReason}
                                className="flex-1 py-2 bg-red-600 text-white rounded-md"
                            >
                                {isLoading ? 'Processing...' : 'Confirm Block'}
                            </button>
                        </div>
                    </>
                ) : (
                    <textarea
                        value={product?.blockReason}
                        readOnly
                        className="w-full p-2 border rounded-md focus:outline-none"
                    />
                )}
            </div>
        </Modal>
    );
}

export default BlockModal;
