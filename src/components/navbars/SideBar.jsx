import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { openSidebar } from '../../redux/feature/navBarSlice';

function SideBar() {
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
 
  ${isSidebarOpen ? "w-[248px]" : "w-0"}
  `}
        >
          {/* logo */}
          <div className="h-[80px] leading-[47.41px] w-full flex items-center border-b border-b-naveBorder justify-center font-jersey text-buttonColor text-[30px] sm:text-[47.41px] font-[400]">
            Vendor
          </div>
          {/* logo */}
          {/* navLinks */}
          <ul className="w-full font-urbanist text-[16px] flex flex-col gap-3 mt-10">
         
          </ul>
          {/* navLinks */}
        </div>
      </div>
    );
}

export default SideBar
