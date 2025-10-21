import React from 'react'
import authBg from "../../assets/auth/nxis.png";
import AuthCenterContent from './AuthCenterContent';
import { oneAppLogo } from '../../../public/svg';

function AuthPage() {
    return (
      <div className="relative">
        <div className="fixed z-10 left-0  right-0 bg-[#FFFFFFCC] pl-[20px] sm:pl-[40px] md:pl-[80px] top-0 border border-[#0000001A]  flex items-center text-[#2F4EFF] h-[65px] sm:h-[80px] text-[23px] sm:text-[32.53px] font-montserrat font-[400]">
          <img src="/auth.svg" alt="" className="h-16 w-16" />
        </div>
        <div
          className="  fixed"
          style={{
            backgroundImage: `url(${authBg})`,
            backgroundSize: "cover", // Adjusts the size of the background image
            backgroundPosition: "center", // Centers the image
            height: "100vh", // Full viewport height
            width: "100%", // Full width
          }}
        >
          {/* <div className="bg-[#ffffff6f] absolute top-0 left-0 right-0 bottom-0 z-0" /> */}

          <AuthCenterContent />
          {/* Any other content you want to add here */}
        </div>
      </div>
    );
}

export default AuthPage
