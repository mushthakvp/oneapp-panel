import React from 'react';

function Card({ text, icon, count, bgColor, svgColor }) {
    return (
        <div className="p-[16px] rounded-lg flex flex-col md:w-[190.42px] md:h-[139.44px]"
            style={{
                backgroundColor: bgColor,
                boxShadow: "0px 1.5px 3px 0px #0000001A",
                border: "0 0.75 0.75 0.75px solid #BBBBBB66",
            }}
        >
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center justify-center w-[39px] h-[39px] rounded-xl" style={{ backgroundColor: svgColor }}>
                    {icon}
                </div>
                <svg width="44" height="22" viewBox="0 0 44 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.30469 21.3329L6.63549 10.4047C7.79756 8.02251 10.7571 7.15643 13.0201 8.53633L16.1341 10.4351C19.3531 12.3979 23.4081 9.74477 22.8987 6.0091V6.0091C22.4494 2.71449 25.6225 0.0977179 28.7713 1.16606L42.9129 5.9641" stroke="#BBBBBB" stroke-opacity="0.4" stroke-width="0.749697" />
                </svg>
            </div>

            <p className="text-[17px] font-[400] opacity-60 mt-2">
                {text}
            </p>
            <div className="flex items-center justify-between">
                <h1 className="text-[20px] md:text-[27px] font-[600] tracking-[0.38px]">
                    {count}
                </h1>
            </div>
        </div>
    );
}

export default Card
