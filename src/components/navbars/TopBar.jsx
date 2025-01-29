import { useState, useEffect } from "react";

function TopBar() {
  const [userData, setUserData] = useState({
    name: localStorage.getItem("name") || "",
    role: localStorage.getItem("role") || "",
    mail: localStorage.getItem("mail") || "",
  });

  function formatName(name) {
    const parts = name.split(" ");

    if (parts.length === 2) {
      return (
        parts[0].charAt(0).toUpperCase() + parts[1].charAt(0).toUpperCase()
      );
    } else if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    } else {
      return "";
    }
  }

  // Function to update user data from localStorage
  const updateUserDataFromStorage = () => {
  
    setUserData({
      name: localStorage.getItem("name") || "",
      role: localStorage.getItem("role") || "",
      mail: localStorage.getItem("mail") || "",
    });
  };

  useEffect(() => {
    // Add focus event listener
    const handleFocus = () => {
      
      updateUserDataFromStorage();
    };

    window.addEventListener("focus", handleFocus);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <div className="h-[80px] z-40 font-urbanist fixed top-0 w-full bg-white border-b border-naveBorder flex items-center px-7 justify-end md:justify-between">
      <div className="sm:ml-[248px] ml-0 md:block hidden">
        <h1 className="text-[20px] font-[500] leading-[24px] tracking-[-0.38px] mb-[4px] capitalize">
          Welcome Back, {userData.role}!
        </h1>
        <p className="text-[12px] font-[300] opacity-60 tracking-[-0.38px]">
          {userData.role === "admin"
            ? " Here's what happening with your App"
            : "Here's what happening with your Products "}
        </p>
      </div>
      <div className="flex items-center gap-3 md:gap-[24px]">
        {/* <img src="/v-cart.gif" className="h-[42px] w-[42px] rounded-full" alt="" /> */}
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="20"
            cy="20"
            r="19.75"
            fill="white"
            stroke="#EAEAEA"
            strokeWidth="0.5"
          />
          <path
            d="M25.6243 18.0913V17.5041C25.6243 14.2802 23.1062 11.6666 20 11.6666C16.8938 11.6666 14.3757 14.2802 14.3757 17.5041V18.0913C14.3757 18.7959 14.1748 19.4848 13.7982 20.0711L12.8753 21.5079C12.0324 22.8202 12.6759 24.6041 14.142 25.0191C17.9773 26.1047 22.0227 26.1047 25.858 25.0191C27.3241 24.6041 27.9676 22.8202 27.1247 21.5079L26.2018 20.0711C25.8252 19.4848 25.6243 18.7959 25.6243 18.0913Z"
            stroke="#1C274C"
          />
          <path
            d="M16.25 25.8334C16.7959 27.2899 18.2687 28.3334 20 28.3334C21.7313 28.3334 23.2041 27.2899 23.75 25.8334"
            stroke="#1C274C"
            strokeLinecap="round"
          />
          <path d="M20 15V18.3333" stroke="#1C274C" strokeLinecap="round" />
        </svg>
        <svg
          width="2"
          height="42"
          viewBox="0 0 2 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L1 41"
            stroke="#EAEAEA"
            strokeWidth="0.6"
            strokeLinecap="round"
          />
        </svg>
        <div className="h-[40px] flex items-center justify-center w-[40px] rounded-full bg-black text-white font-[600] text-[16px] tracking-tight-[-0.38px]">
          {formatName(userData.name)}
        </div>
        <div>
          <h1 className="text-[13px] font-[500]">{userData.name}</h1>
          <p className="text-[10px] font-[300]">{userData.mail}</p>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
