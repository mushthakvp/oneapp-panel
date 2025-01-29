import React, { useState, useEffect } from 'react';
import { useLogin } from '../../api/useDataController';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/loading/spinnerSmall';
import { getCookie } from "../../utils/settingCookie";
function LoginForm() {

  const navigate = useNavigate()

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [postData, setPostData] = useState({ email: '' });

  const { data, mutate, isPending, error } = useLogin()

  useEffect(() => {
    if (data) {
   
      toast.success(data?.message);
      navigate("/otp-verify", { state: { email: postData?.email } });
    } else if (error) {
    
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }, [data, error])

  return (
    <div>
      <p className="text-xs sm:text-sm text-[#00000066] mt-[20px] font-urbanist">
        Please enter your Details Below
      </p>
      <div className="mt-[20px] sm:mt-[40px]">
        <p className="text-xs sm:text-sm mb-2">Email</p>
        <input
          type="text"
          value={postData?.email}
          onChange={(e) => setPostData({ ...postData, email: e.target.value })}
          className="h-10 sm:h-12 border border-inputBorder rounded-md p-2 w-full outline-none"
        />
      </div>
      <button
        disabled={isPending}
        onClick={() => {
          if (!isValidEmail(postData.email)) {
            toast.error("Please enter a valid email address");
            return;
          }
          mutate(postData);
        }}
        className="bg-buttonColor p-3 w-full h-10 sm:h-12 rounded-full text-sm text-white flex items-center justify-center mt-[20px] sm:mt-[35px]"
      >
        {isPending ? <Spinner /> : 'Sign In'}
      </button>
    </div>
  );
}

export default LoginForm
