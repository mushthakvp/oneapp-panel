import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useOtpVerification, useResendOtp } from "../../../api/useDataController";
import { toast } from "react-toastify";
import Spinner from '../../../components/loading/spinnerSmall';
import { setUserDataCookie } from '../../../utils/settingCookie';
import nxisBg from '../../../assets/auth/nxis.png'

function OtpPage() {

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(180);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const mail = location?.state?.email || "";
  const { data, isPending, mutate, error } = useOtpVerification();
  const { mutate: resendOtpMutate, isPending: resendPending } = useResendOtp();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    toast.clearWaitingQueue()
    console.log('data otp verification', data);

    if (data) {
      if (data?.role === 'admin') {
        const userData = {
          email: data?.admin?.email,
          name: data?.admin?.name,
          role: data?.role,
          token: data?.token,
        };

        toast.info(data?.message);
        localStorage.setItem("token", data?.token);
        localStorage.setItem("role", data?.role);
        localStorage.setItem("mail", data?.admin?.email);
        localStorage.setItem("name", data?.admin?.name);

        setUserDataCookie(userData);
        navigate("/");
      } else if (data?.vendor?.isVerified) {
        toast.info(data?.message);
        localStorage.setItem("token", data?.token);
        localStorage.setItem("role", data?.role);
        localStorage.setItem("mail", data?.vendor?.email);
        localStorage.setItem("name", data?.vendor?.name);     
        navigate("/");
      } else{
        toast.info('Admin Verification Pending');
        // navigate("/processing");
      }

    } else if (error) {

      const errorMessage = error?.response?.data?.message;

      if (errorMessage !== 'Invalid token' && errorMessage !== 'Token expired') {
        toast.info(error?.response?.data?.message);
        console.log('error otp verification: ', errorMessage);
        toast.clearWaitingQueue()

        // if (!error?.response?.data?.vendor?.isVerified && error?.response?.data?.message === 'Vendor is not verified.') {
          if (!error?.response?.data?.vendor?.isVerified && errorMessage === 'Vendor is not verified.') {
            navigate("/processing");
          } else if (error?.response?.data?.vendor?.isRejected) {
            navigate("/rejected", { state: { selected: 'Registration', vendor: error?.response?.data?.vendor, message: errorMessage, bank: error?.response?.data?.bank } });
          } else if (errorMessage !== 'Invalid OTP.' && errorMessage !== 'OTP expired.') {
            navigate("/auth");
          }
        setOtp(Array(6).fill(""));
      } else {
        toast.error("Something went wrong");
        setOtp(Array(6).fill(""));
      }
    }
  }, [data, error])

  const handleChange = (index, value) => {
    if (isNaN(value)) return false;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    if (otp.length === 6) {
      mutate({
        email: mail,
        otp: otp.join(""),
      });
    } else {
      toast.error("Please enter a valid 6-digit OTP");
    }
  };

  const handleResend = () => {
    resendOtpMutate({ email: mail }, {
      onSuccess: (data) => {
        toast.success(data?.message || "OTP resent successfully");
        setTimer(180);
        setOtp(Array(6).fill(""));
      },
      onError: (error) => {
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error("Failed to resend OTP");
        }
      }
    });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };


  return (
    <div className="relative font-urbanist">
      <div className="fixed z-10 left-0  right-0 bg-[#FFFFFFCC] pl-[20px] sm:pl-[40px] md:pl-[80px] top-0 border border-[#0000001A] flex items-center text-[#2f4eff0f] h-[65px] sm:h-[80px] text-[23px] sm:text-[32.53px] font-montserrat font-[400]">
        <img src="/auth.svg" alt="" className="h-16 w-16" />
        {/* <p className="text-black ml-4">LIVARA</p> */}
      </div>

      <div
        className="  fixed flex items-center justify-center"
        style={{
          backgroundImage: `url(${nxisBg})`,
          backgroundSize: "cover", // Adjusts the size of the background image
          backgroundPosition: "center", // Centers the image
          height: "100vh", // Full viewport height
          width: "100%", // Full width
        }}
      >
        <div className="bg-[#ffffff75] absolute top-0 left-0 right-0 bottom-0 z-0" />

        <div className="bg-white rounded-lg shadow-md z-20 p-5  sm:p-[20px] text-center">
          <h2 className="text-xl sm:text-2xl font-semibold mt-[10px] sm:mt-[33px]">
            OTP Verification
          </h2>
          <p className="text-xs sm:text-sm text-[#00000066] py-2 sm:py-4">
            We've sent a 6-digit OTP to your registered <br /> Email
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            {otp.map((value, index) => (
              <input
                className="w-10 h-10 md:w-14 md:h-14 border border-inputBorder rounded-md text-center"
                key={index}
                type="text"
                maxLength="1"
                value={value}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={timer === 0} // Disable input when timer reaches 0
                style={{
                  textAlign: "center",
                  fontSize: "24px",
                }}
              />
            ))}
          </div>
          <div className="w-full text-start text-xs sm:text-sm mt-2 sm:mt-4">
            <p className="text-red-600">
              {timer > 0 ? (
                <>
                  <span className="opacity-55 text-black"> Time left : </span>
                  <span className=" opacity-100">{formatTime(timer)}</span>
                </>
              ) : (
                "Time expired"
              )}
            </p>
          </div>
          <button
            className="mt-2 sm:mt-4 text-xs sm:text-sm bg-buttonColor text-white flex items-center justify-center w-full rounded-full h-10 sm:h-12 p-3"
            onClick={handleSubmit}
            disabled={timer === 0 || isPending}
          >
            {isPending ? <Spinner /> : "Submit OTP"}
          </button>
          <p
            className="text-xs sm:text-sm underline py-2 sm:py-4 cursor-pointer"
            onClick={() => handleResend()}
          >
            {resendPending ? "Resending" : "Resend OTP"}
          </p>
          {/* <p
            className={`text-xs sm:text-sm ${timer === 0 ? 'underline cursor-pointer' : 'text-gray-400'} py-2 sm:py-4`}
            onClick={() => timer === 0 && handleResend()}
          >
            {resendPending ? <Spinner /> : 'Resend OTP'}
          </p> */}
        </div>
      </div>
    </div>
  );
}


export default OtpPage
