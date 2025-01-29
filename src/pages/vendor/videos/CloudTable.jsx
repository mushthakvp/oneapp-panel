import { Modal } from '@mui/material';
import React from 'react'

function CloudTable() {
    const teHeading = [
      "Title",
      "File Uploaded",
      "Thumbnail/Video",
      "Storage Used",
      "Upload Date",
  
    ];
    const tBody = [
        {
          title:"Bigg Offer",
     image: "Thumbanail Iphone.jpg",
     type: "Thumbanail ",
     size: "10 MB",
     date :"21/10/2024",
        },
         {
          title:"Bigg Offer",
     image: "Thumbanail Iphone.jpg",
     type: "Thumbanail ",
     size: "10 MB",
     date :"21/10/2024",
         },
          {
          title:"Bigg Offer",
     image: "Thumbanail Iphone.jpg",
     type: "Thumbanail ",
     size: "10 MB",
     date :"21/10/2024",
     }
    ];
  return (
    <table className="text-start w-full min-w-[700px] mt-5">
      <thead>
        {teHeading?.map((item, index) => {
          return (
            <th
              className={`bg-[#F8FAFC] p-3 font-urbanist opacity-65 font-[100] text-left px-3 ${
                index === 0 ? "rounded-l-md" : ""
              } ${index === teHeading?.length - 1 ? "rounded-r-md" : ""}`}
            >
              {item}
            </th>
          );
        })}
      </thead>
      <tbody>
        {tBody?.map((item, index) => {
          return (
            <tr
              className={`p-4 h-14 text-left px-3 text-sm ${
                index !== teHeading?.length - 1
                  ? "border-b border-inputBorder"
                  : ""
                      }`}
                  style={{height:'100px'}}
            >
              <td className="p-4  text-left px-3">{item?.title}</td>
              <td className="p-4 text-left px-3">{item?.image}</td>
              <td className="p-4 text-left px-3">{item?.type}</td>
              <td className="p-4 text-left px-3">{item?.size}</td>
              <td className="p-4 text-left px-3">{item?.date}</td>
            </tr>
          );
        })}
          </tbody>
        
    </table>
  );
}

export default CloudTable
