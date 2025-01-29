import React from 'react';

function Card({ text, icon, count, color, textColor }) {
    return (
        <div className="p-5 sm:p-[20px] rounded-lg border border-naveBorder bg-containerWhite flex flex-col ">
            <div className="flex items-center justify-center w-[40px] h-[40px] rounded-lg border border-buttonColor bg-nonActiveColor">
                {icon}
            </div>
            <p className="text-sm font-[400] opacity-60 mt-4">
                {text}
            </p>
            <div className="flex items-center justify-between">
                <h1 className="text-[34px] sm:text-[38px] font-[500] tracking-[-0.38px]">
                    {count}
                </h1>
            </div>
        </div>
    );
}

export default Card
