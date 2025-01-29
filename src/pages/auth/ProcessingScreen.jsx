import { useNavigate } from "react-router-dom";
import authBg from "../../assets/auth/SignIn.png";

const ProcessingPage = () => {
    const navigate = useNavigate();


    return (
        <div className="relative font-urbanist">
            <div className="fixed z-10 left-0  right-0 bg-[#FFFFFFCC] pl-[20px] sm:pl-[40px] md:pl-[80px] top-0 border border-[#0000001A] flex items-center text-[#2f4eff0f] h-[65px] sm:h-[80px] text-[23px] sm:text-[32.53px] font-jersey font-[400]">
                Ecom
            </div>
            <div
                className="  fixed flex items-center justify-center"
                style={{
                    backgroundImage: `url(${authBg})`,
                    backgroundSize: "cover", // Adjusts the size of the background image
                    backgroundPosition: "center", // Centers the image
                    height: "100vh", // Full viewport height
                    width: "100%", // Full width
                }}
            >
                <div className="bg-[#FFFFFFCC] absolute top-0 left-0 right-0 bottom-0 z-0" />
                <div
                    className="bg-white rounded-lg shadow-md z-20 p-5  sm:p-[20px] text-center"
                >
                    <div className="flex items-center justify-center h-full">
                        <div className="bg-white rounded-lg p-10 flex flex-col items-center justify-center">
                            <img src="/Animation - 1714383147911.gif" alt="Loading GIF" />
                            <p className="text-xl font-bold mt-4">Please wait ...</p>
                   
                            <p className="text-[16px] font-[400] mt-2 text-center opacity-80 tracking-wide">
                                Your request is currently being reviewed by our administrator. <br />Please allow some time for processing.
                            </p>
                            <p
                                onClick={() => navigate("/auth")}
                                className="cursor-pointer hover:text-buttonColor mt-5"
                            >
                                Back to login
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProcessingPage;
