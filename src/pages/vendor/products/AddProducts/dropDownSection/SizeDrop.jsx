// import React from 'react'

// function SizeDrop({ selected, setSelected, index, sizeIndex }) {
//     const [isOpen, setIsOpen] = React.useState(false);

//   return (
//     <div className="flex justify-between  items-center h-12 gap-[8px] transition-all duration-700 ease-out">
//       <div className="w-full relative border border-inputBorder rounded-md h-12 flex items-center justify-between px-3">
//         <input
//           type="text"
//                   value={selected[index]?.sizes[sizeIndex]?.weight}
//           onChange={(e) => {
//                      const value = e.target.value;
//                     // Only update the state if the value is a valid number (this should work automatically with type="number")
//                     if (!isNaN(value)) {
//                         setSelected((prevSelected) => {
//                           const updatedSelected = [...prevSelected];
//                           updatedSelected[index].sizes[sizeIndex].weight =
//                             e.target.value;
//                           return updatedSelected;
//                         });
//                       }
//                   }}
//           className="w-auto max-w-[75%] h-full outline-none border-none text-sm"
//           placeholder="Ex: 10 Kg"
//         />
//         <div className="w-full h-full flex items-center">
//           {selected[index]?.sizes[sizeIndex]?.weightUnit}
//         </div>
//         <div className="w-10">
//           <svg
//             className={`cursor-pointer ${
//               isOpen ? "rotate-180 duration-700 ease-out" : ""
//             }`}
//             onClick={() => setIsOpen(!isOpen)}
//             width="14"
//             height="9"
//             viewBox="0 0 14 9"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M12.4216 0H1.57842C0.264145 0 -0.472617 1.29145 0.339396 2.17182L5.76098 8.05013C6.39099 8.73353 7.60726 8.73353 8.23902 8.05013L13.6606 2.17011C14.4726 1.29145 13.7359 0 12.4216 0Z"
//               fill="#1B3865"
//             />
//           </svg>
//         </div>
//         {/* dropElement */}
//         <div
//           className={`w-full z-50 bg-containerWhite absolute left-0 rounded-md duration-700 ease-out overflow-y-auto ${
//             isOpen ? "h-40 border border-inputBorder top-12" : "h-0 top-10"
//           }  `}
//         >
//           <ul>
//             <li
//               onClick={() => {
//                 setSelected((prevVariants) => {
//                   const updatedVariants = [...prevVariants];
//                   updatedVariants[index].sizes[sizeIndex].weightUnit = "kg"; // Convert to number
//                   return updatedVariants;
//                 });
//                 setIsOpen(false);
//               }}
//               className="cursor-pointer hover:bg-gray-100 p-2"
//             >
//               kg
//             </li>

//             <li
//               onClick={() => {
//                 setSelected((prevVariants) => {
//                   const updatedVariants = [...prevVariants];
//                   updatedVariants[index].sizes[sizeIndex].weightUnit = "g"; // Convert to number
//                   return updatedVariants;
//                 });
//                 setIsOpen(false);
//               }}
//               className="cursor-pointer hover:bg-gray-100 p-2"
//             >
//               g
//             </li>
//             <li
//               onClick={() => {
//                 setSelected((prevVariants) => {
//                   const updatedVariants = [...prevVariants];
//                   updatedVariants[index].sizes[sizeIndex].weightUnit = "lb"; // Convert to number
//                   return updatedVariants;
//                 });
//                 setIsOpen(false);
//               }}
//               className="cursor-pointer hover:bg-gray-100 p-2"
//             >
//               lb
//             </li>
//             <li
//               onClick={() => {
//                 setSelected((prevVariants) => {
//                   const updatedVariants = [...prevVariants];
//                   updatedVariants[index].sizes[sizeIndex].weightUnit = "oz"; // Convert to number
//                   return updatedVariants;
//                 });
//                 setIsOpen(false);
//               }}
//               className="cursor-pointer hover:bg-gray-100 p-2"
//             >
//               oz
//             </li>
//           </ul>
//         </div>
//       </div>

//     </div>
//   );
// }

// export default SizeDrop



import React from 'react';

function SizeDrop({ selected, setSelected, index, sizeIndex }) {
  const handleWeightUnitSelect = (unit) => {
    setSelected((prevVariants) => {
      const updatedVariants = [...prevVariants];
      updatedVariants[index].sizes[sizeIndex].weightUnit = unit;
      return updatedVariants;
    });
  };

  return (
    <div>
      <div className="relative border border-inputBorder rounded-md h-12 flex items-center px-3">
        <input
          type="text"
          value={
            selected[index]?.sizes[sizeIndex]?.weight
              ? `${selected[index]?.sizes[sizeIndex]?.weight} ${selected[index]?.sizes[sizeIndex]?.weightUnit || ''}`
              : ''
          }
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, ''); // Allow only numeric input
            if (!isNaN(value)) {
              setSelected((prevSelected) => {
                const updatedSelected = [...prevSelected];
                updatedSelected[index].sizes[sizeIndex].weight = value;
                return updatedSelected;
              });
            }
          }}
          className="w-full h-full outline-none border-none text-sm"
          placeholder="-- --"
        />
        <div className="flex gap-2">
          <button
            onClick={() => handleWeightUnitSelect('kg')}
            className={`px-2 py-1 rounded ${selected[index]?.sizes[sizeIndex]?.weightUnit === 'kg'
                ? 'border border-buttonColor text-black bg-gray-100'
                : 'bg-gray-100'
              }`}
          >
            kg
          </button>
          <button
            onClick={() => handleWeightUnitSelect('g')}
            className={`px-2 py-1 rounded ${selected[index]?.sizes[sizeIndex]?.weightUnit === 'g'
                ? 'border border-buttonColor bg-gray-100'
                : 'bg-gray-100'
              }`}
          >
            g
          </button>
        </div>
      </div>
      <div className="absolute mt-1">
        <p className="text-red-500 text-[10px]">
          *Please select the variant Kilogram(kg) or Gram(g)
        </p>
      </div>
    </div>
  );
}

export default SizeDrop;
