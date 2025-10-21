import { Modal } from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';


function UnblockModal({ isOpen, setIsOpen, product, onConfirm, isLoading }) {



    return (
        <Modal className='flex items-center justify-center' open={isOpen} onClose={() => setIsOpen(false)}>
            <div className="outline-none text-center w-full max-w-[332px] rounded-md bg-containerWhite flex flex-col justify-center items-center gap-5 p-4">
                <div className="w-full flex justify-center items-center">
                    <svg
                        width="90"
                        height="90"
                        viewBox="0 0 90 90"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M45 4.6875C22.736 4.6875 4.6875 22.736 4.6875 45C4.6875 67.264 22.736 85.3125 45 85.3125C67.264 85.3125 85.3125 67.264 85.3125 45C85.3125 22.736 67.264 4.6875 45 4.6875ZM10.3125 45C10.3125 25.8426 25.8426 10.3125 45 10.3125C53.5669 10.3125 61.4084 13.4181 67.4602 18.565C67.4352 18.5882 67.4106 18.612 67.3863 18.6363L18.6363 67.3854C18.6119 67.4098 18.588 67.4346 18.5646 67.4598C13.418 61.4081 10.3125 53.5667 10.3125 45ZM22.5394 71.4347C28.5912 76.5817 36.4329 79.6875 45 79.6875C64.1574 79.6875 79.6875 64.1574 79.6875 45C79.6875 36.4331 76.5819 28.5916 71.435 22.5398C71.4118 22.5648 71.388 22.5895 71.3637 22.6138L22.6138 71.3629C22.5893 71.3874 22.5645 71.4113 22.5394 71.4347Z"
                            fill="#1c1c84"
                        />
                    </svg>
                </div>
                <div>
                    <h1 className="text-[24px] font-[700]">Unblock</h1>
                    <p className="text-[12px] font-[400] mt-[7px]">
                        Are you sure want to unblock the product
                    </p>
                </div>
                <div className="flex items-center gap-2 w-full">
                    <button onClick={() => setIsOpen(false)} className="text-sm w-full h-[35px] flex items-center justify-center text-buttonColor border border-buttonColor rounded-md">
                        No
                    </button>
                    <button onClick={onConfirm} className="text-sm w-full h-[35px] flex items-center justify-center rounded-md text-white bg-buttonColor border border-buttonColor">
                        {isLoading ? 'Processing...' : 'Yes'}
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default UnblockModal
