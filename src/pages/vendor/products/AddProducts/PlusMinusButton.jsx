import React from 'react'

function PlusMinusButton({icon,callBack}) {
  return (
    <button onClick={callBack} className="flex items-center justify-center min-w-12 rounded-lg  h-12 w-full max-w-[55px] bg-buttonColor">
     {icon}
    </button>
  );
}

export default PlusMinusButton
