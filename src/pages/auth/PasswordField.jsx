import { Height, Password, Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react'

function PasswordField({ placeHolder, postData, setPostData }) {
  
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    // Only allow numeric input
    if (/^\d*$/.test(value)) {
      setPostData({
        ...postData,
        accountNumber: value
      });
    }
  };

  return (
    <div className="p-2 px-4 rounded-md w-full md:min-w-[335px] lg:max-w-[435px] lg:min-w-[435px] md:h-[44px] lg:h-[54px] border border-borderColor outline-none flex items-center gap-2">
      <input
        type={isPasswordVisible ? "text" : "password"}
        className="w-full h-full outline-none"
        name="accountNumber"
        value={postData?.accountNumber} 
        placeholder={placeHolder}
        onChange={handleChange}
        // onChange={(e) => 
        //   setPostData({ 
        //     ...postData, 
        //     accountNumber: e.target.value // Use the field name from props
        //   })
        // }
      />
      <span>
        {isPasswordVisible ? (
          <Visibility
            sx={{ cursor: "pointer", width: "18px", height: "18px" }}
            onClick={() => setIsPasswordVisible(false)}
            className="cursor-pointer"
          />
        ) : (
          <VisibilityOff
            sx={{ cursor: "pointer", width: "18px", height: "18px" }}
            onClick={() => setIsPasswordVisible(true)}
            className="cursor-pointer"
          />
        )}
      </span>
    </div>
  );
}

export default PasswordField;


