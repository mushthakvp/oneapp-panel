import React from 'react'

function Buttons({selected,setSelected}) {
    return (
      <div className="flex">
        <div className="bg-[#2f4eff0f] flex items-center ">
          <button
            className={`${
              selected === "Requests"
                ? "text-white bg-buttonColor"
                : "bg-[#2f4eff0f] text-black "
            } p-2 px-4 w-auto`}
            onClick={() => setSelected("Requests")}
          >
            Requests
          </button>
          <button
            className={`${
              selected === "Approved"
                ? "text-white bg-buttonColor"
                : "bg-[#2f4eff0f] text-black"
            } p-2 px-4 w-auto`}
            onClick={() => setSelected("Approved")}
          >
            Approved
          </button>
          <button
            className={`${
              selected === "Rejected"
                ? "text-white bg-buttonColor"
                : "bg-[#2f4eff0f] text-black"
            } p-2 px-4 w-auto`}
            onClick={() => setSelected("Rejected")}
          >
            Rejected
          </button>
          <button
            className={`${
              selected === "Blocked"
                ? "text-white bg-buttonColor"
                : "bg-[#2f4eff0f] text-black"
            } p-2 px-4 w-auto`}
            onClick={() => setSelected("Blocked")}
          >
            Blocked
          </button>
        </div>
      </div>
    );
}

export default Buttons
