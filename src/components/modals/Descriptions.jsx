import { Modal } from '@mui/material'
import React from 'react'

function Descriptions({open,setOpen,descriptions}) {
  return (
    <Modal className='flex items-center justify-center font-urbanist p-4' open={open} onClose={()=>setOpen(false)}>
          <div className='bg-containerWhite rounded-md w-full max-w-[350px] outline-none overflow-hidden'>
              <p className='text-center p-4 border-b-inputBorder border'>
                  Description
              </p>
              <div className='mt-3 p-4 text-start'>
                  <p className='text-sm placeholder-opacity-60'>{ descriptions}</p>
              </div>
         </div>
    </Modal>
  )
}

export default Descriptions
