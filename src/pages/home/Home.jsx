import React from 'react'
import TopBar from '../../components/navbars/TopBar'
import SideBar from '../../components/navbars/sideBar/SideBar'
import { Outlet, useLocation } from 'react-router-dom'

function Home() {
  const path = useLocation().pathname;

  return (
    <div>
      <SideBar />
      <TopBar />
      <main className="sm:ml-[248px]  ml-0 text-black transition-all duration-1000 ease-out ">
        <div
          style={{
            position: "fixed",

            // backgroundImage: path === "/" && `url(/livera.gif)`,
            backgroundSize: "cover", // Adjusts the size of the background image
            backgroundPosition: "center", // Centers the image
            height: "100vh", // Full viewport height
            // Full width
          }}
          className="z-0 fixed sm:left-[248px] left-0 top-0 right-0 bottom-0"
        />
        <section className="mt-[80px] p-[10px] sm:p-[37px] transition-all duration-1000 ease-out relative z-10">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default Home
