import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import SelectionButton from './SelectionButton';
import LoginForm from './LoginForm';
import Registration from './rgistration/Registration';

function AuthCenterContent({ }) {

  const location = useLocation();

  const [selected, setSelected] = useState(location?.state?.selected || "Sign In");

  const vendor = location?.state?.vendor || null;
  const message = location?.state?.message || null;
  const bank = location?.state?.bank || null;

  console.log("vendor", vendor);
  console.log("message", location?.state?.message);
  

  return (
    <div className="flex  justify-center items-center h-[90vh]  w-full mt-[65px] sm:mt-[80px] overflow-y-auto relative z-20 p-10">
     
        <div className={`bg-[#FFFFFF] p-5 sm:p-[40px] w-full max-w-[540px] rounded-lg ${selected==='Sign In'?"-mt-[50px]":'mt-[20px]'}`}>
          <div className="grid grid-cols-2 border-b border-b-buttonColor">
            <SelectionButton
              selected={selected}
              setSelected={setSelected}
              text={"Sign In"}
            />
            <SelectionButton
              selected={selected}
              setSelected={setSelected}
              text={"Registration"}
            />
          </div>
          {selected === "Sign In" && <LoginForm />}
          {selected==='Registration'&& <Registration vendor={vendor} message={message} bank={bank} />}
        </div>
     
    </div>
  );
}

export default AuthCenterContent
