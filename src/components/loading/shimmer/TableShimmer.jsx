// import React from 'react';

// const TableShimmer = ({ columnCount, rowCount }) => {
//   return (
//     <div className="animate-pulse bg-containerWhite rounded-lg overflow-hidden mt-5 p-5">
//       <div className="bg-gray-100 rounded-lg h-10 mb-2"></div>
//       {Array.from({ length: rowCount }).map((_, rowIndex) => (
//         <div
//           key={rowIndex}
//           className="grid grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] gap-4 px-4 py-3 "
//         >
//           {Array.from({ length: columnCount }).map((_, columnIndex) => (
//             <div
//               key={`${rowIndex}-${columnIndex}`}
//               className="bg-gray-100 h-4 rounded"
//             ></div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TableShimmer;

import React from 'react';

const TableShimmer = ({ columnCount, rowCount }) => {
  return (
    <tbody className=''>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <tr
          key={rowIndex}
          className="h-[84px] border-b border-b-inputBorder"
        >
          {Array.from({ length: columnCount }).map((_, columnIndex) => (
            <td
              key={`${rowIndex}-${columnIndex}`}
              className="px-2 pl-4"
            >
              <div className="bg-gray-100 h-4 rounded animate-pulse"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableShimmer;