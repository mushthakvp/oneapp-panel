import React from 'react'

function Card({ text, icon, count }) {
    return (
        <div className="p-2 sm:p-[20px] rounded-lg bg-containerWhite flex flex-col ">
            <p className="text-[16px] font-medium">
                {text}
            </p>

            <div className="flex items-center pt-4">
                <div className="flex items-center justify-center w-[40px] h-[40px] rounded-lg border border-buttonColor bg-nonActiveColor">
                    {icon}
                </div>
                <h1 className="text-[34px] sm:text-[38px] font-[500] ml-4">
                    {count}
                </h1>
            </div>
        </div>
    );
}

export default Card
