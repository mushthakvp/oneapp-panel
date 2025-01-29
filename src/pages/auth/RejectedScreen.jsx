import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import authBg from "../../assets/auth/SignIn.png";

// const vendor = {
//     rejectReasons: [
//         {
//             text: "The submitted documents were incomplete.",
//             date: "2024-10-28T10:24:00Z",
//         },
//         {
//             text: "The provided address could not be verified.",
//             date: "2024-10-29T14:15:00Z",
//         },
//         {
//             text: "The business name conflicts with an existing entity.",
//             date: "2024-10-30T09:45:00Z",
//         },
//     ],
// };

const RejectedScreen = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [showReasons, setShowReasons] = useState(false);

    const vendor = location?.state?.vendor || null;
    const bank = location?.state?.bank || null;
    const message = location?.state?.message || null;

    const getAttemptTitle = (index, date) => {
        const attemptNumber = index + 1;
        const suffix = attemptNumber === 1 ? 'st' : attemptNumber === 2 ? 'nd' : attemptNumber === 3 ? 'rd' : 'th';
        const formattedDate = new Date(date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
        return `${attemptNumber}${suffix} Attempt Reason (${formattedDate})`;
    };

    return (
        <div className="relative font-urbanist">
            <div className="fixed z-10 left-0 right-0 bg-[#FFFFFFCC] pl-[20px] sm:pl-[40px] md:pl-[80px] top-0 border border-[#0000001A] flex items-center text-[#2f4eff0f] h-[65px] sm:h-[80px] text-[23px] sm:text-[32.53px] font-jersey font-[400]">
                Ecom
            </div>
            <div
                className="fixed flex items-center justify-center"
                style={{
                    backgroundImage: `url(${authBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                    width: "100%",
                }}
            >
                <div className="bg-[#FFFFFFCC] absolute top-0 left-0 right-0 bottom-0 z-0" />
                <div className="bg-white rounded-lg shadow-md z-20 p-5 sm:p-[20px] text-center relative transition-all duration-300"
                    style={{
                        width: '500px',  // Fixed width
                        height: showReasons ? '600px' : '350px',  // Height transition
                        overflow: 'hidden',  // Disable outer scroll
                    }}
                >
                    <div className="flex flex-col items-center justify-start h-full space-y-4">
                        {/* SVG Icon */}
                        <svg width="106" height="106" viewBox="0 0 106 106" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_b_2194_5614)">
                                <circle cx="52.9997" cy="53.0002" r="44.1667" fill="white" />
                                <circle cx="52.9997" cy="53.0002" r="44.1667" stroke="#C5C5C5" strokeWidth="0.732835" />
                            </g>
                            <path d="M64.0412 41.9586L41.958 64.0418M41.9579 41.9585L64.0412 64.0417" stroke="#E31F1F" strokeWidth="6.54972" strokeLinecap="round" />
                            <defs>
                                <filter id="filter0_b_2194_5614" x="-64.8167" y="-64.8165" width="235.633" height="235.633" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="36.6418" />
                                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_2194_5614" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_2194_5614" result="shape" />
                                </filter>
                            </defs>
                        </svg>

                        {/* Rejected Text */}
                        <p className="text-[26px] font-bold mt-4">Rejected!</p>
                        <p className="text-[16px] font-[400] mt-2 text-center opacity-60 tracking-wide">
                            The admin rejected your request
                        </p>

                        {/* Re-Register Button */}
                        <button
                            onClick={() => navigate("/auth", { state: { selected: 'Registration', vendor: vendor, bank: bank, message: message } })}
                            // navigate("/rejected", { state: { selected: 'Registration', vendor: error?.response?.data?.vendor, message: errorMessage, bank: error?.response?.data?.bank } });

                            className="cursor-pointer text-[18px] font-[500] bg-buttonColor text-white mt-5 px-20 py-3 rounded-full"
                        >
                            Re-Register
                        </button>

                        {/* Show Reasons Toggle */}
                        <div
                            className="flex items-center justify-center mt-3 gap-2 cursor-pointer"
                            onClick={() => setShowReasons(!showReasons)}
                        >
                            <p className="text-[18px] font-[500] text-center underline tracking-wide">
                                Show Reasons
                            </p>
                            <svg
                                width="14"
                                height="8"
                                viewBox="0 0 14 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`transition-transform duration-300 ${showReasons ? 'rotate-180' : ''}`}
                            >
                                <path d="M12.4216 0L1.57842 0C0.264145 0 -0.472617 1.20658 0.339396 2.0291L5.76098 7.52113C6.39099 8.15962 7.60726 8.15962 8.23902 7.52113L13.6606 2.0275C14.4726 1.20658 13.7359 0 12.4216 0Z" fill="black" />
                            </svg>
                        </div>

                        {/* Reasons Box */}
                        {showReasons && (
                            <div className="mt-5 p-4 w-full border border-gray-300 rounded-lg">
                                <p className="text-[16px] font-[600] mb-2 text-left">Reasons</p>
                                <hr className="border-gray-300 mx-[-1rem]" />
                                <div className="py-2 overflow-y-auto" style={{ maxHeight: '150px' }}>
                                    {vendor?.rejectReasons?.map((reason, index) => (
                                        <div key={index} className="mb-4 text-left">
                                            <p className="text-[14px] font-[500] mb-1">
                                                {getAttemptTitle(index, reason.date)}
                                            </p>
                                            <p className="text-[12px] font-[400] opacity-60">
                                                {reason.reason}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default RejectedScreen;
