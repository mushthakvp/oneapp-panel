import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { openSidebar } from '../../../redux/feature/navBarSlice';
import SideBarElement from './SideBarElement';
import { useLocation } from 'react-router-dom';
import { oneAppLogo } from '../../../../public/svg';

function SideBar() {
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state?.navbar?.toggleSidebar);
 const activeColor = "#2F4EFF";

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
        <div className="h-[80px] w-full flex items-center border-b border-b-naveBorder justify-center text-buttonColor text-[20px] sm:text-[27.41px] font-montserrat font-[400]">
          <img src="/auth.svg" alt="" className="h-16 w-16" />
        </div>

        {/* logo */}
        {/* navLinks */}
        <ul className="w-full font-urbanist text-[16px] flex flex-col gap-3 mt-10">
          <SideBarElement
            path={"/"}
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
                  fill={location === "/" ? activeColor : ""}
                  stroke={location === "/" ? "" : "black"}
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.7317 17.3659C12.7317 14.8065 14.8065 12.7317 17.3659 12.7317C19.9252 12.7317 22 14.8065 22 17.3659C22 19.9252 19.9252 22 17.3659 22C14.8065 22 12.7317 19.9252 12.7317 17.3659Z"
                  fill={location === "/" ? activeColor : ""}
                  stroke={location === "/" ? "" : "black"}
                />
                <path
                  d="M2 17.5C2 15.3787 2 14.318 2.65901 13.659C3.31802 13 4.37868 13 6.5 13C8.62132 13 9.68198 13 10.341 13.659C11 14.318 11 15.3787 11 17.5C11 19.6213 11 20.682 10.341 21.341C9.68198 22 8.62132 22 6.5 22C4.37868 22 3.31802 22 2.65901 21.341C2 20.682 2 19.6213 2 17.5Z"
                  fill={location === "/" ? activeColor : ""}
                  stroke={location === "/" ? "" : "black"}
                />
                <path
                  d="M13 6.5C13 4.37868 13 3.31802 13.659 2.65901C14.318 2 15.3787 2 17.5 2C19.6213 2 20.682 2 21.341 2.65901C22 3.31802 22 4.37868 22 6.5C22 8.62132 22 9.68198 21.341 10.341C20.682 11 19.6213 11 17.5 11C15.3787 11 14.318 11 13.659 10.341C13 9.68198 13 8.62132 13 6.5Z"
                  fill={location === "/" ? activeColor : ""}
                  stroke={location === "/" ? "" : "black"}
                />
              </svg>
            }
          />
          <SideBarElement
            path={"/products"}
            text={"Products"}
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.97883 9.68508C2.99294 8.89073 2 8.49355 2 8C2 7.50645 2.99294 7.10927 4.97883 6.31492L7.7873 5.19153C9.77318 4.39718 10.7661 4 12 4C13.2339 4 14.2268 4.39718 16.2127 5.19153L19.0212 6.31492C21.0071 7.10927 22 7.50645 22 8C22 8.49355 21.0071 8.89073 19.0212 9.68508L16.2127 10.8085C14.2268 11.6028 13.2339 12 12 12C10.7661 12 9.77318 11.6028 7.7873 10.8085L4.97883 9.68508Z"
                  stroke={
                    location === "/products" ||
                    location === "/product-detail" ||
                    location === "/add-products"
                      ? activeColor
                      : "black"
                  }
                  fill={
                    location === "/products" ||
                    location === "/product-detail" ||
                    location === "/add-products"
                      ? activeColor
                      : ""
                  }
                />
                <path
                  d="M22 12C22 12 21.0071 12.8907 19.0212 13.6851L16.2127 14.8085C14.2268 15.6028 13.2339 16 12 16C10.7661 16 9.77318 15.6028 7.7873 14.8085L4.97883 13.6851C2.99294 12.8907 2 12 2 12"
                  stroke={
                    location === "/products" ||
                    location === "/product-detail" ||
                    location === "/add-products"
                      ? activeColor
                      : "black"
                  }
                  stroke-linecap="round"
                />
                <path
                  d="M22 16C22 16 21.0071 16.8907 19.0212 17.6851L16.2127 18.8085C14.2268 19.6028 13.2339 20 12 20C10.7661 20 9.77318 19.6028 7.7873 18.8085L4.97883 17.6851C2.99294 16.8907 2 16 2 16"
                  stroke={
                    location === "/products" ||
                    location === "/product-detail" ||
                    location === "/add-products"
                      ? activeColor
                      : "black"
                  }
                  stroke-linecap="round"
                />
              </svg>
            }
          />
          <SideBarElement
            path={"/videos"}
            text={"Videos"}
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C13.8452 2 15.3293 2 16.5401 2.08783L13.0986 7.25002H8.40139L11.9014 2H12Z"
                  fill={
                    location === "/videos" ||
                    location === "/add-videos" ||
                    location === "/videoDetail" ||
                    location === "/useHistory"
                      ? activeColor
                      : "black"
                  }
                />
                <path
                  d="M3.46447 3.46447C4.71683 2.2121 6.62194 2.03072 10.0957 2.00445L6.59861 7.25002H2.10418C2.25143 5.48593 2.6068 4.32213 3.46447 3.46447Z"
                  fill={
                    location === "/videos" ||
                    location === "/add-videos" ||
                    location === "/videoDetail" ||
                    location === "/useHistory"
                      ? activeColor
                      : "black"
                  }
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2 12C2 10.7633 2 9.68875 2.02644 8.75002H21.9736C22 9.68875 22 10.7633 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12ZM13.014 12.5852C14.338 13.4395 15 13.8666 15 14.5C15 15.1334 14.338 15.5605 13.014 16.4148C11.6719 17.2807 11.0008 17.7137 10.5004 17.3958C10 17.0779 10 16.2186 10 14.5C10 12.7814 10 11.9221 10.5004 11.6042C11.0008 11.2863 11.6719 11.7193 13.014 12.5852Z"
                  fill={
                    location === "/videos" ||
                    location === "/add-videos" ||
                    location === "/videoDetail" ||
                    location === "/useHistory"
                      ? activeColor
                      : "black"
                  }
                />
                <path
                  d="M21.8958 7.25002C21.7486 5.48593 21.3932 4.32213 20.5355 3.46447C19.9382 2.86714 19.1924 2.51345 18.1987 2.30403L14.9014 7.25002H21.8958Z"
                  fill={
                    location === "/videos" ||
                    location === "/add-videos" ||
                    location === "/videoDetail" ||
                    location === "/useHistory"
                      ? activeColor
                      : "black"
                  }
                />
              </svg>
            }
          />
          <SideBarElement
            path={"/orders"}
            text={"Orders"}
            icon={
              <svg
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 9C1 5.22876 1 3.34315 2.17157 2.17157C3.34315 1 5.22876 1 9 1H11C14.7712 1 16.6569 1 17.8284 2.17157C19 3.34315 19 5.22876 19 9V13C19 16.7712 19 18.6569 17.8284 19.8284C16.6569 21 14.7712 21 11 21H9C5.22876 21 3.34315 21 2.17157 19.8284C1 18.6569 1 16.7712 1 13V9Z"
                  fill={
                    location === "/orders" || location === "/order-detail"
                      ? activeColor
                      : "white"
                  }
                  stroke={
                    location === "/orders" || location === "/order-detail"
                      ? activeColor
                      : "#1C274C"
                  }
                />
                <path
                  d="M6 9H14"
                  stroke={
                    location === "/orders" || location === "/order-detail"
                      ? "white"
                      : "#1C274C"
                  }
                  stroke-linecap="round"
                />
                <path
                  d="M6 13H11"
                  stroke={
                    location === "/orders" || location === "/order-detail"
                      ? "white"
                      : "#1C274C"
                  }
                  stroke-linecap="round"
                />
              </svg>
            }
          />

          <SideBarElement
            path={"/revenue"}
            text={"Revenue"}
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 19C6.19108 19 4.78661 19 3.77772 18.3259C3.34096 18.034 2.96596 17.659 2.67412 17.2223C2 16.2134 2 14.8089 2 12C2 9.19108 2 7.78661 2.67412 6.77772C2.96596 6.34096 3.34096 5.96596 3.77772 5.67412C4.78661 5 6.19108 5 9 5L15 5C17.8089 5 19.2134 5 20.2223 5.67412C20.659 5.96596 21.034 6.34096 21.3259 6.77772C22 7.78661 22 9.19108 22 12C22 14.8089 22 16.2134 21.3259 17.2223C21.034 17.659 20.659 18.034 20.2223 18.3259C19.2134 19 17.8089 19 15 19H9Z"
                  stroke={
                    location === "/revenue" || location === "/payout-detail"
                      ? activeColor
                      : "#1C274C"
                  }
                  fill={
                    location === "/revenue" || location === "/payout-detail"
                      ? activeColor
                      : "white"
                  }
                />
                <path
                  d="M12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9Z"
                  stroke={
                    location === "/revenue" || location === "/payout-detail"
                      ? "white"
                      : "#1C274C"
                  }
                />
                <path
                  d="M5.5 15L5.5 9"
                  stroke={
                    location === "/revenue" || location === "/payout-detail"
                      ? "white"
                      : "#1C274C"
                  }
                  stroke-linecap="round"
                />
                <path
                  d="M18.5 15L18.5 9"
                  stroke={
                    location === "/revenue" || location === "/payout-detail"
                      ? "white"
                      : "#1C274C"
                  }
                  stroke-linecap="round"
                />
              </svg>
            }
          />

          <SideBarElement
            path={"/coupons"}
            text={"Coupon"}
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
                  d="M7.24502 2H16.755C17.9139 2 18.4933 2 18.9606 2.16261C19.8468 2.47096 20.5425 3.18719 20.842 4.09946C21 4.58055 21 5.17705 21 6.37006V20.3742C21 21.2324 20.015 21.6878 19.3919 21.1176C19.0258 20.7826 18.4742 20.7826 18.1081 21.1176L17.625 21.5597C16.9834 22.1468 16.0166 22.1468 15.375 21.5597C14.7334 20.9726 13.7666 20.9726 13.125 21.5597C12.4834 22.1468 11.5166 22.1468 10.875 21.5597C10.2334 20.9726 9.26659 20.9726 8.625 21.5597C7.98341 22.1468 7.01659 22.1468 6.375 21.5597L5.8919 21.1176C5.52583 20.7826 4.97417 20.7826 4.6081 21.1176C3.985 21.6878 3 21.2324 3 20.3742V6.37006C3 5.17705 3 4.58055 3.15795 4.09946C3.45748 3.18719 4.15322 2.47096 5.03939 2.16261C5.50671 2 6.08614 2 7.24502 2ZM7 6.75C6.58579 6.75 6.25 7.08579 6.25 7.5C6.25 7.91421 6.58579 8.25 7 8.25H7.5C7.91421 8.25 8.25 7.91421 8.25 7.5C8.25 7.08579 7.91421 6.75 7.5 6.75H7ZM10.5 6.75C10.0858 6.75 9.75 7.08579 9.75 7.5C9.75 7.91421 10.0858 8.25 10.5 8.25H17C17.4142 8.25 17.75 7.91421 17.75 7.5C17.75 7.08579 17.4142 6.75 17 6.75H10.5ZM7 10.25C6.58579 10.25 6.25 10.5858 6.25 11C6.25 11.4142 6.58579 11.75 7 11.75H7.5C7.91421 11.75 8.25 11.4142 8.25 11C8.25 10.5858 7.91421 10.25 7.5 10.25H7ZM10.5 10.25C10.0858 10.25 9.75 10.5858 9.75 11C9.75 11.4142 10.0858 11.75 10.5 11.75H17C17.4142 11.75 17.75 11.4142 17.75 11C17.75 10.5858 17.4142 10.25 17 10.25H10.5ZM7 13.75C6.58579 13.75 6.25 14.0858 6.25 14.5C6.25 14.9142 6.58579 15.25 7 15.25H7.5C7.91421 15.25 8.25 14.9142 8.25 14.5C8.25 14.0858 7.91421 13.75 7.5 13.75H7ZM10.5 13.75C10.0858 13.75 9.75 14.0858 9.75 14.5C9.75 14.9142 10.0858 15.25 10.5 15.25H17C17.4142 15.25 17.75 14.9142 17.75 14.5C17.75 14.0858 17.4142 13.75 17 13.75H10.5Z"
                  fill={
                    location === "/coupons" || location === "/coupon-detail"
                      ? activeColor
                      : ""
                  }
                  stroke={
                    location === "/coupons" || location === "/coupon-detail"
                      ? ""
                      : "black"
                  }
                />
              </svg>
            }
          />
          <SideBarElement
            path={"/clouds"}
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
                  fill={location === "/clouds" && "#2F4EFF"}
                  stroke={location !== "/clouds" && "black"}
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10 12C8.11438 12 7.17157 12 6.58579 12.5858C6 13.1716 6 14.1144 6 16C6 17.8856 6 18.8284 6.58579 19.4142C7.17157 20 8.11438 20 10 20C11.8856 20 12.8284 20 13.4142 19.4142C14 18.8284 14 17.8856 14 16C14 14.1144 14 13.1716 13.4142 12.5858C12.8284 12 11.8856 12 10 12ZM11.8047 15.0842L10.4714 13.7508C10.2111 13.4905 9.78894 13.4905 9.52859 13.7508L8.19526 15.0842C7.93491 15.3445 7.93491 15.7666 8.19526 16.027C8.45561 16.2873 8.87772 16.2873 9.13807 16.027L9.33333 15.8317V17.7778C9.33333 18.146 9.63181 18.4444 10 18.4444C10.3682 18.4444 10.6667 18.146 10.6667 17.7778V15.8317L10.8619 16.027C11.1223 16.2873 11.5444 16.2873 11.8047 16.027C12.0651 15.7666 12.0651 15.3445 11.8047 15.0842Z"
                  fill={location === "/clouds" && "#2F4EFF"}
                  stroke={location !== "/clouds" && "black"}
                />
              </svg>
            }
          />
          <SideBarElement
            path={"/profile"}
            text={"Profile"}
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
                  // stroke=""
                  stroke={location === "/profile" ? activeColor : "#1C274C"}
                  fill={location === "/profile" ? activeColor : ""}
                />
                <ellipse
                  cx="12"
                  cy="17"
                  rx="7"
                  ry="4"
                  stroke={location === "/profile" ? activeColor : "#1C274C"}
                  fill={location === "/profile" ? activeColor : ""}
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

export default SideBar
