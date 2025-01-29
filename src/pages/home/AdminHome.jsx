import React from 'react'
import AdminSideBar from '../../components/navbars/sideBar/AdminSideBar';
import TopBar from '../../components/navbars/TopBar';
import { Outlet, useLocation } from 'react-router-dom';

function AdminHome() {
  const path = useLocation().pathname;
 
  return (
    <div>
      <AdminSideBar />
      <TopBar />
      <main className="sm:ml-[248px] ml-0 text-black transition-all duration-1000 ease-out overflow-y-auto">
        <div
          style={{
            position: "fixed",

            // backgroundImage: path === "/admin" && `url(/livera.gif)`,
            backgroundSize: "cover", // Adjusts the size of the background image
            backgroundPosition: "center", // Centers the image
            height: "100vh", // Full viewport height
            // Full width
          }}
          className="z-0 fixed sm:left-[248px] left-0 top-0 right-0 bottom-0"
        />
        <section className="mt-[80px] p-[10px] sm:p-[37px] transition-all duration-1000 ease-out z-10 relative">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default AdminHome
