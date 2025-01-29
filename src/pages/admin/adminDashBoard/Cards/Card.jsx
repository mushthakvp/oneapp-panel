import React from 'react'

function Card({text, icon,count,percentage,color,textColor}) {
  return (
    <div className="p-5 sm:p-[20px] rounded-lg border border-naveBorder bg-containerWhite flex flex-col ">
      <div className="flex items-center justify-center w-[40px] h-[40px] rounded-lg border border-buttonColor bg-[#2f4eff0f]">
        {icon}
      </div>
      <p className="text-sm font-[400] opacity-60 mt-4 tracking-tighter">
        {text}
      </p>
      <div className="flex items-center justify-between">
        <h1 className="text-[34px] sm:text-[38px] font-[500] tracking-[-0.38px]">
          {count}
        </h1>
        <div
          style={{ background: color, color: textColor }}
          className="p-1 px-4 flex items-center gap-1 text-xs  rounded-md max-h-7"
        >
          {percentage >= 0 && (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.69064 2.02401C6.8615 1.85316 7.1385 1.85316 7.30936 2.02401L10.8094 5.52401C10.9802 5.69487 10.9802 5.97188 10.8094 6.14273C10.6385 6.31359 10.3615 6.31359 10.1906 6.14273L7.4375 3.38959L7.4375 11.6667C7.4375 11.9083 7.24162 12.1042 7 12.1042C6.75837 12.1042 6.5625 11.9083 6.5625 11.6667L6.5625 3.38959L3.80936 6.14273C3.6385 6.31359 3.3615 6.31359 3.19064 6.14273C3.01979 5.97188 3.01979 5.69487 3.19064 5.52401L6.69064 2.02401Z"
                fill={textColor}
              />
            </svg>
          )}
          {percentage < 0 && (
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.30936 10.976C4.1385 11.1468 3.8615 11.1468 3.69064 10.976L0.190642 7.47598C0.0197872 7.30513 0.0197872 7.02812 0.190642 6.85727C0.361495 6.68641 0.638506 6.68641 0.809359 6.85727L3.5625 9.61041L3.5625 1.33329C3.5625 1.09167 3.75838 0.895793 4 0.895793C4.24163 0.895793 4.4375 1.09167 4.4375 1.33329L4.4375 9.61041L7.19064 6.85727C7.3615 6.68641 7.63851 6.68641 7.80936 6.85727C7.98021 7.02812 7.98021 7.30513 7.80936 7.47599L4.30936 10.976Z"
                fill="#DE1B3F"
              />
            </svg>
          )}
          {percentage} %
        </div>
      </div>
    </div>
  );
}

export default Card
