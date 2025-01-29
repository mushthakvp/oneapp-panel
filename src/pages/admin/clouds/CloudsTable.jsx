import React, { useState } from 'react'
import { useGetAdminUsageHistory } from '../../../api/useDataControllerAdmin';
import { convertUTCToLocal } from '../../../utils/dateFormate';

function CloudsTable({data}) {
    const teHeading = [
      "Vendors",
      "Cloud",
      "Total Storage",
      "Available Storage",
      "Storage Used",
      "Purchased Date",
    ];
  const tBody = [
    {
      vendor: "anathu",
      type: "Starter",
      total: "2GB",
      remain: "1GB ",
      used: "1GB",
      date: "21/10/2024",
    },
    {
      vendor: "anathu",
      type: "Starter",
      total: "2GB",
      remain: "1GB ",
      used: "1GB",
      date: "21/10/2024",
    },
    {
      vendor: "anathu",
      type: "Starter",
      total: "2GB",
      remain: "1GB ",
      used: "1GB",
      date: "21/10/2024",
    },
  ];
  const [page,setPage] =useState(1)
  
  console.log(data?.cloudPurchaseHistory, "egtewrgewrg");
  
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
        {data?.cloudPurchaseHistory?.length > 0 && data?.cloudPurchaseHistory?.map((item, index) => {
          console.log(item);
          
          return (
            <tr
              className={`p-4 h-14 text-left px-3 text-sm ${
                index !== teHeading?.length - 1
                  ? "border-b border-inputBorder"
                  : ""
              }`}
              style={{ height: "100px" }}
            >
              <td className="p-4  text-left px-3">{item?.vendorId?.name}</td>
              <td className="p-4 text-left px-3">{item?.cloudDetails?.name}</td>
              <td className="p-4 text-left px-3">
                {item?.cloudDetails?.storage} {item?.cloudDetails?.unit}
              </td>
              <td className="p-4 text-left px-3">{item?.remain}</td>
              <td className="p-4 text-left px-3">{item?.used}</td>
              <td className="p-4 text-left px-3">
                {convertUTCToLocal(item?.createdAt)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default CloudsTable
