import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeading from '../../../components/pageHeding/PageHeading';
import CloudTable from './CloudTable';
import { Modal } from '@mui/material';
import PageNation from '../../../components/pagenation/PageNation';

function StorageUsageHistory() {
    const navigate = useNavigate()
    const [cloudDetailOpen,setCloudDetailOpen] = useState(false)
  return (
    <div>
      <div className="flex items-center gap-3">
        <svg
          className="cursor-pointer"
          onClick={() => navigate(-1)}
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.9998 18H5.99976M5.99976 18L14.9998 9M5.99976 18L14.9998 27"
            stroke="black"
            stroke-width="1.98214"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <PageHeading title={"Storage  Usage Details"} />
      </div>
      <div className="bg-containerWhite rounded-md border border-inputBorder mt-[26px] p-[35px] overflow-y-auto">
        <div className="flex items-center justify-between w-full ">
          <p>Cloud Type : Starter</p>
          <button
            onClick={() => setCloudDetailOpen(!cloudDetailOpen)}
            className="bg-nonActiveColor border border-buttonColor p-2 px-4 rounded-md text-buttonColor"
          >
            Cloud Details
          </button>
        </div>
        <div className="w-full mt-5">
          <CloudTable />
          <div className='mt-6'>
            <PageNation totalpage={5} />
          </div>
        </div>
      </div>
      <Modal
        open={cloudDetailOpen}
        onClose={() => setCloudDetailOpen(false)}
        className="flex items-center justify-center p-4"
      >
        <div className="bg-white text-sm w-full max-w-[296px] rounded-md overflow-hidden outline-none">
          <h1 className="p-3 text-center w-full border border-b text-[14px] font-[500]">
            Cloud Details
          </h1>
          <div className="grid grid-cols-5 md:p-6 p-4 gap-6">
            {/* 1111111 */}
            <div className="col-span-3 opacity-60">Cloud Type :</div>
            <div className="col-span-2">Starter</div>

            {/* 33333 */}
            <div className="col-span-3 opacity-60">Total Storage :</div>
            <div className="col-span-2">4GB</div>

            {/* 55555 */}
            <div className="col-span-3 opacity-60">Available Storage :</div>
            <div className="col-span-2">500 MB</div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default StorageUsageHistory
