import React from 'react'

function SelectionButton({ text, selected, setSelected }) {
 
  return (
    <div className=" w-full relative">
      <button
        onClick={() => setSelected(text)}
        className={`p-2 w-full pb-4 ${
          selected === text ? "text-buttonColor" : "text-[#8C8C8C]"
        }`}
      >
        {text}
       {selected === text&& <div className="bg-buttonColor h-[6.95px] w-full rounded-tl-md rounded-tr-md absolute bottom-0 left-0" />}
      </button>
    </div>
  );
}

export default SelectionButton
