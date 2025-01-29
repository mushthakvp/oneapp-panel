import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from '@mui/material';
import { cookieLogout } from '../../../utils/settingCookie';

function SideBarElement({ text, icon, path }) {

  const location = useLocation().pathname;
  const navigate = useNavigate();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const isActive =
    location === path ||
    (path === "/orders" && location.startsWith("/order-detail")) ||
    (path === "/orders" && location.startsWith("/order-detail")) ||
    (path === "/revenue" && location.startsWith("/payout-detail")) ||
    (path === "/products" && location.startsWith("/product-detail")) ||
    (path === "/products" && location.startsWith("/add-products")) ||
    (path === "/admin/vendors" &&
      location.startsWith("/admin/vendor-detailPage")) ||
    (location === "/admin/add-category" && path === "/admin/category") ||
    (location === "/admin/add-section" && path === "/admin/section") ||
    (path === "/admin/payouts" &&
      location.startsWith("/admin/payout-detail")) ||
    (path === "/admin/banner" && location === "/admin/add-banner") ||
    (path === "/coupons" && location === "/coupon-detail") ||
    (path === "/admin/subCategory" && location === "/admin/add-subCategory") ||
    (path === "/videos" && location === "/add-videos") ||
    (path === "/videos" && location === "/videoDetail") ||
    (path === "/videos" && location === "/useHistory")||
      (path==='/admin/clouds'&&location==='/admin/add-clouds')

  const handleClick = () => {
    if (text === "Logout") {
      setIsLogoutModalOpen(true);
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLogoutModalOpen(false);   
    cookieLogout();
    console.log("Logging out...");
    navigate('/auth');
  };


  return (
    <>
      <li
        // onClick={() => { navigate(path) }}
        onClick={handleClick}
        className="flex relative items-center pl-9 h-[50px] w-full gap-3  font-urbanist text-[16px] font-[400] cursor-pointer"
        style={{
          // backgroundColor: path === location && "#2f4eff0f1A",
          // opacity: path === location ? "1" : "0.6",
          backgroundColor: isActive && "#2f4eff0f",
          color: isActive ? "#2F4EFF" : "#000000",
          opacity: isActive ? "1" : "0.6",
        }}
      >
        {isActive && (
          <div className="absolute left-0 h-full w-1 bg-buttonColor" />
        )}
        {icon}
        <p>{text}</p>
      </li>

      <Modal
        open={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        className="flex items-center justify-center outline-none"
      >
        <div className="max-w-[400px] w-full bg-white outline-none rounded-3xl">
          <h1 className="text-center p-6 w-full border-b border-b-borderColor text-[18px] font-[600] leading-[21.6px]">
            Logout
          </h1>
          <div className="p-[28px]">
            <div className="flex items-center justify-center">
              <svg
                width="103"
                height="103"
                viewBox="0 0 103 103"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="51.5" cy="51.5" r="51.5" fill="#FFDDDD" />
                <path
                  d="M30.9082 30.9081L69.092 69.092M77 50C77 64.9118 64.9118 77 50 77C35.0883 77 23 64.9118 23 50C23 35.0883 35.0883 23 50 23C64.9118 23 77 35.0883 77 50Z"
                  stroke="#D42B2B"
                  stroke-width="4.725"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <p className="text-center mt-4 mb-4">Are you sure want to logout</p>
            <div className="flex justify-center gap-[10px] items-center">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="border border-[#D42B2B] max-w-[148px] w-full h-[46px] justify-center rounded-lg text-[#D42B2B] flex items-center text-center"
              >
                No
              </button>
              <button
                onClick={handleLogout}
                className="border border-[#D42B2B] bg-[#D42B2B] w-full rounded-lg justify-center max-w-[148px] h-[46px] text-white flex items-center text-center"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default SideBarElement
