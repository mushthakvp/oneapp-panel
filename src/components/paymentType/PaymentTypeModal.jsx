import { Modal } from '@mui/material'
import React, { useEffect } from 'react'

function PaymentTypeModal({ paymentType, setPaymentType, open, setOpen, isPending }) {
  
  return (
    <Modal
      open={open}
      onClose={()=>setOpen("")}
      className="flex items-center justify-center "
    >
          <div className="bg-white max-w-[417px] w-full rounded-lg relative overflow-hidden">
             {isPending&& <div className='absolute bg-black/70 w-full h-full left-0 right-0 flex items-center justify-center text-red-500'>Loading...</div>}
        <h1 className="p-4 text-center text-md border-b">
          Select Payment Method
        </h1>
        <div className="p-4 flex flex-col gap-4">
          {/* 1111111 */}
          <div className="flex items-center justify-between p-4 border border-[#7952A2] text-[#7952A2] rounded-md md:px-6">
            <div className="flex items-center gap-2">
              <svg
                width="19"
                height="22"
                viewBox="0 0 19 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.3997 6.63214L4.75487 19.3388H0.483723C0.187115 19.3388 -0.0501705 19.0422 0.009151 18.7456L2.85658 0.711857C2.9159 0.296607 3.27183 0 3.68708 0H10.9243C15.9073 0.177964 17.2717 2.72879 16.3819 6.644L16.3997 6.63214Z"
                  fill="#002C8A"
                />
                <path
                  d="M16.5912 5.45703C18.3708 6.40617 18.7861 8.18582 18.1929 10.5587C17.4217 14.0586 15.1082 15.5417 11.7268 15.601L10.7777 15.6603C10.4218 15.6603 10.1845 15.8976 10.1252 16.2535L9.35398 20.9399C9.29466 21.3552 8.93873 21.6518 8.52348 21.6518H4.96419C4.66758 21.6518 4.4303 21.3552 4.48962 21.0586L5.79469 12.5756C5.85401 12.279 16.5912 5.45703 16.5912 5.45703Z"
                  fill="#009BE1"
                />
                <path
                  d="M5.72266 12.991L6.90909 5.45722C6.948 5.2788 7.04464 5.11818 7.18405 5.00022C7.32346 4.88226 7.49786 4.81354 7.68026 4.80469H13.3751C14.7395 4.80469 15.748 5.04197 16.5785 5.45722C16.2819 8.06737 15.0361 12.2792 8.98534 12.3978H6.37519C6.07858 12.3978 5.78198 12.6351 5.72266 12.991Z"
                  fill="#001F6B"
                />
              </svg>
              Paypal
            </div>
            {/* checkDiv */}
            <div
              onClick={() => setPaymentType("paypal")}
              className="rounded-full h-6 w-6 border border-[#7952A2] flex items-center justify-center"
            >
              {paymentType === "paypal" && (
                <div className="rounded-full h-4 w-4 bg-[#7952A2]" />
              )}
            </div>
          </div>
          {/* 222222 */}
          <div className="flex items-center justify-between p-4 border border-[#7952A2] text-[#7952A2] rounded-md md:px-6">
            <div className="flex items-center gap-2">
              <svg
                width="48"
                height="20"
                viewBox="0 0 48 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.37333 7.82667C3.37333 7.30667 3.8 7.10667 4.50667 7.10667C5.52 7.10667 6.8 7.41333 7.81333 7.96V4.82667C6.70667 4.38667 5.61333 4.21333 4.50667 4.21333C1.8 4.21333 0 5.62667 0 7.98667C0 11.6667 5.06667 11.08 5.06667 12.6667C5.06667 13.28 4.53333 13.48 3.78667 13.48C2.68 13.48 1.26667 13.0267 0.146667 12.4133V15.5867C1.38667 16.12 2.64 16.3467 3.78667 16.3467C6.56 16.3467 8.46667 14.9733 8.46667 12.5867C8.45333 8.61333 3.37333 9.32 3.37333 7.82667ZM12.3867 1.54667L9.13333 2.24L9.12 12.92C9.12 14.8933 10.6 16.3467 12.5733 16.3467C13.6667 16.3467 14.4667 16.1467 14.9067 15.9067V13.2C14.48 13.3733 12.3733 13.9867 12.3733 12.0133V7.28H14.9067V4.44H12.3733L12.3867 1.54667ZM19.0533 5.42667L18.84 4.44H15.96V16.1067H19.2933V8.2C20.08 7.17333 21.4133 7.36 21.8267 7.50667V4.44C21.4 4.28 19.84 3.98667 19.0533 5.42667ZM22.64 4.44H25.9867V16.1067H22.64V4.44ZM22.64 3.42667L25.9867 2.70667V0L22.64 0.706667V3.42667ZM32.9467 4.21333C31.64 4.21333 30.8 4.82667 30.3333 5.25333L30.16 4.42667H27.2267V19.9733L30.56 19.2667L30.5733 15.4933C31.0533 15.84 31.76 16.3333 32.9333 16.3333C35.32 16.3333 37.4933 14.4133 37.4933 10.1867C37.48 6.32 35.28 4.21333 32.9467 4.21333ZM32.1467 13.4C31.36 13.4 30.8933 13.12 30.5733 12.7733L30.56 7.82667C30.9067 7.44 31.3867 7.17333 32.1467 7.17333C33.36 7.17333 34.2 8.53333 34.2 10.28C34.2 12.0667 33.3733 13.4 32.1467 13.4ZM48 10.32C48 6.90667 46.3467 4.21333 43.1867 4.21333C40.0133 4.21333 38.0933 6.90667 38.0933 10.2933C38.0933 14.3067 40.36 16.3333 43.6133 16.3333C45.2 16.3333 46.4 15.9733 47.3067 15.4667V12.8C46.4 13.2533 45.36 13.5333 44.04 13.5333C42.7467 13.5333 41.6 13.08 41.4533 11.5067H47.9733C47.9733 11.3333 48 10.64 48 10.32ZM41.4133 9.05333C41.4133 7.54667 42.3333 6.92 43.1733 6.92C43.9867 6.92 44.8533 7.54667 44.8533 9.05333H41.4133Z"
                  fill="#6772E5"
                />
              </svg>
            </div>
            {/* checkDiv */}
            <div
              onClick={() => setPaymentType("stripe")}
              className="rounded-full h-6 w-6 border border-[#7952A2] flex items-center justify-center"
            >
              {paymentType === "stripe" && (
                <div className="rounded-full h-4 w-4 bg-[#7952A2]" />
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PaymentTypeModal
