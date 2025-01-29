import React from 'react'

function Buttons({selected,setSelected}) {
    return (
      <div className="flex">
        <div className="bg-[#2f4eff0f] flex items-center ">
          <button
            className={`${
              selected === "all"
                ? "text-white bg-buttonColor"
                : "bg-[#2f4eff0f] text-black "
            } p-2 px-4 w-full max-w-[114px]`}
            onClick={() => setSelected("all")}
          >
            All
          </button>
          <button
            className={`${
              selected === "blocked"
                ? "text-white bg-buttonColor"
                : "bg-[#2f4eff0f] text-black"
            } p-2 px-4 w-full max-w-[114px]`}
            onClick={() => setSelected("blocked")}
          >
            Blocked
          </button>
        </div>
      </div>
    );
}

export default Buttons
