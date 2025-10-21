import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { openSidebar } from '../../../redux/feature/navBarSlice';
import SideBarElement from './SideBarElement';
import { oneAppLogo } from '../../../../public/svg';

function AdminSideBar() {
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state?.navbar?.toggleSidebar);

  return (
    <div
      className={`
  sidebar 
 max-h-screen
  transition-all 
  duration-1000 
  ease-out 
  fixed 
  h-full 
  left-0 
  top-0 
  bottom-0 
   z-50 
   bg-containerWhite border-r border-r-naveBorder
 sm:w-[248px]
  ${isSidebarOpen ? "w-[248px]" : "w-0"}
  
`}
    >
      {/* coleseOpeButtons */}
      <div
        onClick={(e) => {
          e.preventDefault();
          dispatch(openSidebar());
        }}
        style={{ right: isSidebarOpen ? "10px" : "-55px" }}
        className={`absolute -right-14 top-2 transition-all   duration-1000 ease-out sm:hidden  z-10 border border-buttonColor flex  items-center border-buttonYellow rounded-md ${
          isSidebarOpen ? "h-8 w-8" : " w-12 h-10"
        } p-2 cursor-pointer`}
      >
        {!isSidebarOpen ? (
          <div className=" w-full h-full ">
            <div className="w-[100%] bg-buttonColor rounded-sm h-1 mb-1 "></div>
            <div className="w-full bg-buttonColor rounded-sm h-1 mb-1"></div>
            <div className="w-full bg-buttonColor rounded-sm h-1 "></div>
          </div>
        ) : (
          <span className="absolute z-50 text-xl text-buttonColor  cursor-pointer">
            X
          </span>
        )}
      </div>

      {/* coleseOpeButtons */}
      <div
        className={`
  sidebar 
 max-h-screen
  transition-all 
  duration-1000 
  ease-out 
  
  h-full 
  left-0 
  top-0 
  overflow-y-auto
  bottom-0 
   z-50 
 sm:w-[248px]
  ${isSidebarOpen ? "w-[248px]" : "w-0"}
  `}
      >
        {/* logo */}
        {/* <div className="h-[80px] leading-[47.41px] w-full flex items-center border-b border-b-naveBorder justify-center font-jersey text-buttonColor text-[30px] sm:text-[47.41px] font-[400]">
          Admin
        </div> */}
        <div className="h-[80px] w-full flex items-center border-b border-b-naveBorder justify-center text-buttonColor text-[20px] sm:text-[27.41px] font-montserrat font-[400]">
          <img src="/auth.svg" alt="" className="h-16 w-16" />
        </div>
        {/* logo */}
        {/* navLinks */}
        <ul className="w-full font-urbanist text-[16px] flex flex-col gap-3 mt-10">
          <SideBarElement
            path={"/admin"}
            text={"Dashboard"}
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2 6.63415C2 4.07478 4.07478 2 6.63415 2C9.19351 2 11.2683 4.07478 11.2683 6.63415C11.2683 9.19351 9.19351 11.2683 6.63415 11.2683C4.07478 11.2683 2 9.19351 2 6.63415Z"
                  fill={location === "/admin" ? "#2F4EFF" : "black"}
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.7317 17.3659C12.7317 14.8065 14.8065 12.7317 17.3659 12.7317C19.9252 12.7317 22 14.8065 22 17.3659C22 19.9252 19.9252 22 17.3659 22C14.8065 22 12.7317 19.9252 12.7317 17.3659Z"
                  fill={location === "/admin" ? "#2F4EFF" : "black"}
                />
                <path
                  d="M2 17.5C2 15.3787 2 14.318 2.65901 13.659C3.31802 13 4.37868 13 6.5 13C8.62132 13 9.68198 13 10.341 13.659C11 14.318 11 15.3787 11 17.5C11 19.6213 11 20.682 10.341 21.341C9.68198 22 8.62132 22 6.5 22C4.37868 22 3.31802 22 2.65901 21.341C2 20.682 2 19.6213 2 17.5Z"
                  fill={location === "/admin" ? "#2F4EFF" : "black"}
                />
                <path
                  d="M13 6.5C13 4.37868 13 3.31802 13.659 2.65901C14.318 2 15.3787 2 17.5 2C19.6213 2 20.682 2 21.341 2.65901C22 3.31802 22 4.37868 22 6.5C22 8.62132 22 9.68198 21.341 10.341C20.682 11 19.6213 11 17.5 11C15.3787 11 14.318 11 13.659 10.341C13 9.68198 13 8.62132 13 6.5Z"
                  fill={location === "/admin" ? "#2F4EFF" : "black"}
                />
              </svg>
            }
          />

          <SideBarElement
            path={"/admin/vendors"}
            text={"Vendors"}
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="6"
                  r="4"
                  fill={
                    location === "/admin/vendors" ||
                    location === "/admin/vendor-detailPage"
                      ? "#2F4EFF"
                      : "black"
                  }
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.5 22C14.8501 22 14.0251 22 13.5126 21.4874C13 20.9749 13 20.1499 13 18.5C13 16.8501 13 16.0251 13.5126 15.5126C14.0251 15 14.8501 15 16.5 15C18.1499 15 18.9749 15 19.4874 15.5126C20 16.0251 20 16.8501 20 18.5C20 20.1499 20 20.9749 19.4874 21.4874C18.9749 22 18.1499 22 16.5 22ZM18.468 17.7458C18.6958 17.518 18.6958 17.1487 18.468 16.9209C18.2402 16.693 17.8709 16.693 17.6431 16.9209L15.7222 18.8417L15.3569 18.4764C15.1291 18.2486 14.7598 18.2486 14.532 18.4764C14.3042 18.7042 14.3042 19.0736 14.532 19.3014L15.3097 20.0791C15.5375 20.307 15.9069 20.307 16.1347 20.0791L18.468 17.7458Z"
                  fill={
                    location === "/admin/vendors" ||
                    location === "/admin/vendor-detailPage"
                      ? "#2F4EFF"
                      : "black"
                  }
                />
                <path
                  d="M15.4147 13.5074C14.4046 13.1842 13.24 13 12 13C8.13401 13 5 14.7909 5 17C5 19.1406 7.94244 20.8884 11.6421 20.9949C11.615 20.8686 11.594 20.7432 11.5775 20.6201C11.4998 20.0424 11.4999 19.3365 11.5 18.586V18.414C11.4999 17.6635 11.4998 16.9576 11.5775 16.3799C11.6639 15.737 11.8705 15.0333 12.4519 14.4519C13.0334 13.8705 13.737 13.6639 14.3799 13.5774C14.6919 13.5355 15.0412 13.5162 15.4147 13.5074Z"
                  fill={
                    location === "/admin/vendors" ||
                    location === "/admin/vendor-detailPage"
                      ? "#2F4EFF"
                      : "black"
                  }
                />
              </svg>
            }
          />

          <SideBarElement
            path={"/admin/payouts"}
            text={"Payouts"}
            icon={
              location === "/admin/payouts" ||
              location === "/admin/payout-detail" ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.25993 21.3884H6C5.05719 21.3884 4.58579 21.3884 4.29289 21.0955C4 20.8026 4 20.3312 4 19.3884V18.2764C4 17.7579 4 17.4987 4.13318 17.2672C4.26636 17.0356 4.46727 16.9188 4.8691 16.6851C7.51457 15.1464 11.2715 14.2803 13.7791 15.7759C13.9475 15.8764 14.0991 15.9977 14.2285 16.1431C14.7866 16.77 14.746 17.7161 14.1028 18.2775C13.9669 18.396 13.8222 18.486 13.6764 18.5172C13.7962 18.5033 13.911 18.4874 14.0206 18.4699C14.932 18.3245 15.697 17.8375 16.3974 17.3084L18.2046 15.9433C18.8417 15.462 19.7873 15.4619 20.4245 15.943C20.9982 16.3762 21.1736 17.0894 20.8109 17.6707C20.388 18.3487 19.7921 19.216 19.2199 19.7459C18.6469 20.2766 17.7939 20.7504 17.0975 21.0865C16.326 21.4589 15.4738 21.6734 14.6069 21.8138C12.8488 22.0983 11.0166 22.0549 9.27633 21.6964C8.29253 21.4937 7.27079 21.3884 6.25993 21.3884Z"
                    fill="#2F4EFF"
                  />
                  <path
                    d="M6.58579 2.58579C6.21901 2.95256 6.08188 3.4593 6.03061 4.2498C7.24895 4.23355 8.23355 3.24896 8.2498 2.03061C7.4593 2.08188 6.95256 2.21901 6.58579 2.58579Z"
                    fill="#2F4EFF"
                  />
                  <path
                    d="M17.4142 2.58579C17.0474 2.21901 16.5407 2.08188 15.7502 2.03061C15.7664 3.24895 16.751 4.23355 17.9694 4.2498C17.9181 3.4593 17.781 2.95256 17.4142 2.58579Z"
                    fill="#2F4EFF"
                  />
                  <path
                    d="M17.4142 9.41421C17.0474 9.78099 16.5407 9.91812 15.7502 9.96939C15.7665 8.75104 16.751 7.76645 17.9694 7.7502C17.9181 8.5407 17.781 9.04744 17.4142 9.41421Z"
                    fill="#2F4EFF"
                  />
                  <path
                    d="M6.58579 9.41421C6.95256 9.78099 7.4593 9.91812 8.2498 9.96939C8.23355 8.75105 7.24895 7.76645 6.03061 7.7502C6.08188 8.5407 6.21901 9.04744 6.58579 9.41421Z"
                    fill="#2F4EFF"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6 5.75C8.07107 5.75 9.75 4.07107 9.75 2H14.25C14.25 4.07107 15.9289 5.75 18 5.75V6.25C15.9289 6.25 14.25 7.92893 14.25 10H9.75C9.75 7.92893 8.07107 6.25 6 6.25V5.75ZM12 7C12.5523 7 13 6.55228 13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6C11 6.55228 11.4477 7 12 7Z"
                    fill="#2F4EFF"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.4142 10.4142C18 9.82843 18 8.88562 18 7C18 5.11438 18 4.17157 17.4142 3.58579M17.4142 10.4142C16.8284 11 15.8856 11 14 11H10C8.11438 11 7.17157 11 6.58579 10.4142M17.4142 10.4142C17.4142 10.4142 17.4142 10.4142 17.4142 10.4142ZM17.4142 3.58579C16.8284 3 15.8856 3 14 3L10 3C8.11438 3 7.17157 3 6.58579 3.58579M17.4142 3.58579C17.4142 3.58579 17.4142 3.58579 17.4142 3.58579ZM6.58579 3.58579C6 4.17157 6 5.11438 6 7C6 8.88562 6 9.82843 6.58579 10.4142M6.58579 3.58579C6.58579 3.58579 6.58579 3.58579 6.58579 3.58579ZM6.58579 10.4142C6.58579 10.4142 6.58579 10.4142 6.58579 10.4142Z"
                    stroke="#1C274C"
                  />
                  <path
                    d="M13 7C13 7.55228 12.5523 8 12 8C11.4477 8 11 7.55228 11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7Z"
                    stroke="#1C274C"
                  />
                  <path
                    d="M18 6C16.3431 6 15 4.65685 15 3"
                    stroke="#1C274C"
                    stroke-linecap="round"
                  />
                  <path
                    d="M18 8C16.3431 8 15 9.34315 15 11"
                    stroke="#1C274C"
                    stroke-linecap="round"
                  />
                  <path
                    d="M6 6C7.65685 6 9 4.65685 9 3"
                    stroke="#1C274C"
                    stroke-linecap="round"
                  />
                  <path
                    d="M6 8C7.65685 8 9 9.34315 9 11"
                    stroke="#1C274C"
                    stroke-linecap="round"
                  />
                  <path
                    d="M5 20.3884H7.25993C8.27079 20.3884 9.29253 20.4937 10.2763 20.6964C12.0166 21.0549 13.8488 21.0983 15.6069 20.8138C16.4738 20.6734 17.326 20.4589 18.0975 20.0865C18.7939 19.7504 19.6469 19.2766 20.2199 18.7459C20.7921 18.216 21.388 17.3487 21.8109 16.6707C22.1736 16.0894 21.9982 15.3762 21.4245 14.943C20.7873 14.4619 19.8417 14.462 19.2046 14.9433L17.3974 16.3084C16.697 16.8375 15.932 17.3245 15.0206 17.4699C14.911 17.4874 14.7962 17.5033 14.6764 17.5172M14.6764 17.5172C14.6403 17.5214 14.6038 17.5254 14.5668 17.5292M14.6764 17.5172C14.8222 17.486 14.9669 17.396 15.1028 17.2775C15.746 16.7161 15.7866 15.77 15.2285 15.1431C15.0991 14.9977 14.9475 14.8764 14.7791 14.7759C11.9817 13.1074 7.62942 14.3782 5 16.2429M14.6764 17.5172C14.6399 17.525 14.6033 17.5292 14.5668 17.5292M14.5668 17.5292C14.0434 17.5829 13.4312 17.5968 12.7518 17.5326"
                    stroke="#1C274C"
                    stroke-linecap="round"
                  />
                  <rect
                    x="2"
                    y="14"
                    width="3"
                    height="8"
                    rx="1.5"
                    stroke="#1C274C"
                  />
                </svg>
              )
            }
          />

          <SideBarElement
            path={"/admin/category"}
            text={"Category"}
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 3.5C8 2.67157 8.67157 2 9.5 2H14.5C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5Z"
                  fill={
                    location === "/admin/add-category" ||
                    location === "/admin/category"
                      ? "#2F4EFF"
                      : "#1C274C"
                  }
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.5 4.03662C5.24209 4.10719 4.44798 4.30764 3.87868 4.87694C3 5.75562 3 7.16983 3 9.99826V15.9983C3 18.8267 3 20.2409 3.87868 21.1196C4.75736 21.9983 6.17157 21.9983 9 21.9983H15C17.8284 21.9983 19.2426 21.9983 20.1213 21.1196C21 20.2409 21 18.8267 21 15.9983V9.99826C21 7.16983 21 5.75562 20.1213 4.87694C19.552 4.30764 18.7579 4.10719 17.5 4.03662V4.5C17.5 6.15685 16.1569 7.5 14.5 7.5H9.5C7.84315 7.5 6.5 6.15685 6.5 4.5V4.03662ZM6.25 10.5C6.25 10.0858 6.58579 9.75 7 9.75H17C17.4142 9.75 17.75 10.0858 17.75 10.5C17.75 10.9142 17.4142 11.25 17 11.25H7C6.58579 11.25 6.25 10.9142 6.25 10.5ZM7.25 14C7.25 13.5858 7.58579 13.25 8 13.25H16C16.4142 13.25 16.75 13.5858 16.75 14C16.75 14.4142 16.4142 14.75 16 14.75H8C7.58579 14.75 7.25 14.4142 7.25 14ZM8.25 17.5C8.25 17.0858 8.58579 16.75 9 16.75H15C15.4142 16.75 15.75 17.0858 15.75 17.5C15.75 17.9142 15.4142 18.25 15 18.25H9C8.58579 18.25 8.25 17.9142 8.25 17.5Z"
                  fill={
                    location === "/admin/add-category" ||
                    location === "/admin/category"
                      ? "#2F4EFF"
                      : "#1C274C"
                  }
                />
              </svg>
            }
          />

          <SideBarElement
            path={"/admin/subCategory"}
            text={"Subcategory"}
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z"
                  stroke={
                    location === "/admin/subCategory" ||
                    location === "/admin/add-subCategory"
                      ? "#2F4EFF"
                      : "black"
                  }
                  fill={
                    location === "/admin/subCategory" ||
                    location === "/admin/add-subCategory"
                      ? "#2F4EFF"
                      : "white"
                  }
                />
                <path
                  d="M8 12H16"
                  stroke={
                    location === "/admin/subCategory" ||
                    location === "/admin/add-subCategory"
                      ? "white"
                      : "black"
                  }
                  stroke-linecap="round"
                />
                <path
                  d="M8 8H16"
                  stroke={
                    location === "/admin/subCategory" ||
                    location === "/admin/add-subCategory"
                      ? "white"
                      : "black"
                  }
                  stroke-linecap="round"
                />
                <path
                  d="M8 16H13"
                  stroke={
                    location === "/admin/subCategory" ||
                    location === "/admin/add-subCategory"
                      ? "white"
                      : "black"
                  }
                  stroke-linecap="round"
                />
              </svg>
            }
          />

          <SideBarElement
            path={"/admin/section"}
            text={"Section"}
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.75 3C12.75 2.58579 12.4142 2.25 12 2.25C11.5858 2.25 11.25 2.58579 11.25 3V5C11.25 5.41421 11.5858 5.75 12 5.75C12.4142 5.75 12.75 5.41421 12.75 5V3Z"
                  fill={
                    location === "/admin/section" ||
                    location === "/admin/add-section"
                      ? "#2F4EFF"
                      : "black"
                  }
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M22.75 12.0565C22.75 13.8943 22.75 15.3499 22.5969 16.4891C22.4392 17.6615 22.1071 18.6105 21.3588 19.3588C20.6104 20.1072 19.6614 20.4393 18.489 20.597C17.3498 20.7501 15.8942 20.7501 14.0565 20.7501H9.94348C8.10577 20.7501 6.65017 20.7501 5.51098 20.597C4.33856 20.4393 3.38961 20.1072 2.64124 19.3588C1.89288 18.6105 1.56076 17.6615 1.40314 16.4891C1.24997 15.3499 1.24999 13.8943 1.25 12.0565L1.25 11.7725C1.25002 11.5529 1.25011 11.3388 1.25053 11.1303C1.25132 10.7466 1.25327 10.3814 1.25806 10.034C1.27152 9.05873 1.30741 8.22316 1.40314 7.51116C1.56076 6.33873 1.89288 5.38978 2.64124 4.64142C3.38961 3.89306 4.33856 3.56094 5.51098 3.40331C6.22742 3.30699 7.069 3.27125 8.05206 3.25799C8.2173 3.25576 8.47469 3.25412 8.74859 3.25292C9.3014 3.2505 9.75 3.69873 9.75 4.25155V5.00008C9.75 6.24272 10.7574 7.25008 12 7.25008C13.2426 7.25008 14.25 6.24272 14.25 5.00008V4.25028C14.25 3.69796 14.698 3.24935 15.2503 3.25196C16.5391 3.25806 17.6086 3.28494 18.489 3.40331C19.6614 3.56094 20.6104 3.89306 21.3588 4.64142C22.1071 5.38978 22.4392 6.33873 22.5969 7.51116C22.75 8.65036 22.75 10.1059 22.75 11.9437V12.0565ZM8 9.75008C7.58579 9.75008 7.25 10.0859 7.25 10.5001C7.25 10.9143 7.58579 11.2501 8 11.2501H16C16.4142 11.2501 16.75 10.9143 16.75 10.5001C16.75 10.0859 16.4142 9.75008 16 9.75008H8ZM8 13.2501C7.58579 13.2501 7.25 13.5859 7.25 14.0001C7.25 14.4143 7.58579 14.7501 8 14.7501H13.5C13.9142 14.7501 14.25 14.4143 14.25 14.0001C14.25 13.5859 13.9142 13.2501 13.5 13.2501H8Z"
                  fill={
                    location === "/admin/section" ||
                    location === "/admin/add-section"
                      ? "#2F4EFF"
                      : "black"
                  }
                />
              </svg>
            }
          />

          <SideBarElement
            path={"/admin/banner"}
            text={"Banner"}
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2H22"
                  stroke={
                    location === "/admin/banner" ||
                    location === "/admin/add-banner"
                      ? "#2F4EFF"
                      : "black"
                  }
                  stroke-linecap="round"
                />
                <path
                  d="M4 2H20V12.27C20 13.6091 20 14.2787 19.7319 14.8691C19.4638 15.4595 18.9595 15.9004 17.951 16.7822L15.951 18.5309C14.0685 20.177 13.1272 21 12 21C10.8728 21 9.93152 20.177 8.04897 18.5309L6.04897 16.7822C5.04046 15.9004 4.5362 15.4595 4.2681 14.8691C4 14.2787 4 13.6091 4 12.27V2Z"
                  stroke={
                    location === "/admin/banner" ||
                    location === "/admin/add-banner"
                      ? "#2F4EFF"
                      : "black"
                  }
                  fill={
                    location === "/admin/banner" ||
                    location === "/admin/add-banner"
                      ? "#2F4EFF"
                      : "white"
                  }
                />
                <path
                  d="M8.5 13L15.5 13"
                  stroke={
                    location === "/admin/banner" ||
                    location === "/admin/add-banner"
                      ? "white"
                      : "black"
                  }
                  stroke-linecap="round"
                />
                <path
                  d="M8.5 8L15.5 8"
                  stroke={
                    location === "/admin/banner" ||
                    location === "/admin/add-banner"
                      ? "white"
                      : "black"
                  }
                  stroke-linecap="round"
                />
              </svg>
            }
          />
          <SideBarElement
            path={"/admin/clouds"}
            text={"Clouds"}
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.50001 16L4.50001 15.9105C4.49991 15.0449 4.49981 14.2512 4.58661 13.6056C4.6822 12.8946 4.90709 12.1432 5.52514 11.5251C6.14319 10.9071 6.89464 10.6822 7.6056 10.5866C8.25122 10.4998 9.04488 10.4999 9.91052 10.5H10.0895C10.9551 10.4999 11.7488 10.4998 12.3944 10.5866C13.1054 10.6822 13.8568 10.9071 14.4749 11.5251C15.0929 12.1432 15.3178 12.8946 15.4134 13.6056C15.4989 14.2417 15.5001 15.0215 15.5 15.8722C18.0726 15.3221 20 13.0599 20 10.3529C20 7.88113 18.393 5.78024 16.1551 5.01498C15.8371 2.19371 13.4159 0 10.4762 0C7.32028 0 4.7619 2.52827 4.7619 5.64706C4.7619 6.33687 4.88706 6.9978 5.11616 7.60887C4.8475 7.55673 4.56983 7.52941 4.28571 7.52941C1.91878 7.52941 0 9.42562 0 11.7647C0 14.1038 1.91878 16 4.28571 16L4.50001 16Z"
                  fill={
                    location === "/admin/clouds" ||
                    location === "/admin/add-clouds"
                      ? "#2F4EFF"
                      : "none"
                  }
                  stroke={
                    location === "/admin/clouds" ||
                    location === "/admin/add-clouds"
                      ? "#2F4EFF"
                      : "black"
                  }
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10 12C8.11438 12 7.17157 12 6.58579 12.5858C6 13.1716 6 14.1144 6 16C6 17.8856 6 18.8284 6.58579 19.4142C7.17157 20 8.11438 20 10 20C11.8856 20 12.8284 20 13.4142 19.4142C14 18.8284 14 17.8856 14 16C14 14.1144 14 13.1716 13.4142 12.5858C12.8284 12 11.8856 12 10 12ZM11.8047 15.0842L10.4714 13.7508C10.2111 13.4905 9.78894 13.4905 9.52859 13.7508L8.19526 15.0842C7.93491 15.3445 7.93491 15.7666 8.19526 16.027C8.45561 16.2873 8.87772 16.2873 9.13807 16.027L9.33333 15.8317V17.7778C9.33333 18.146 9.63181 18.4444 10 18.4444C10.3682 18.4444 10.6667 18.146 10.6667 17.7778V15.8317L10.8619 16.027C11.1223 16.2873 11.5444 16.2873 11.8047 16.027C12.0651 15.7666 12.0651 15.3445 11.8047 15.0842Z"
                  fill={
                    location === "/admin/clouds" ||
                    location === "/admin/add-clouds"
                      ? "#2F4EFF"
                      : "none"
                  }
                  stroke={
                    location === "/admin/clouds" ||
                    location === "/admin/add-clouds"
                      ? "#2F4EFF"
                      : "black"
                  }
                />
              </svg>
            }
          />
          <SideBarElement
            path={""}
            text={"Logout"}
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2V6" stroke="#1C274C" stroke-linecap="round" />
                <path
                  d="M8.5 3.70593C5.26806 5.07145 3 8.27087 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 8.27087 18.7319 5.07145 15.5 3.70593"
                  stroke="#1C274C"
                  stroke-linecap="round"
                />
              </svg>
            }
          />
        </ul>
        {/* navLinks */}
      </div>
    </div>
  );
}

export default AdminSideBar
