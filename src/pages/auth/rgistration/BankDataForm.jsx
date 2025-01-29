import React, {useState} from 'react'
import PasswordField from '../PasswordField';
import { toast } from 'react-toastify';
import Spinner from '../../../components/loading/spinnerSmall';

function BankDataForm({ formData, setFormData, handleSubmit, isPending }) {

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    setErrors(prev => ({
      ...prev,
      [name]: ''  // Clear the error for the field being edited
    }));
  };

  const validateFirstForm = () => {

    let valid = true;
    let newErrors = {};

    if (!formData.bank) {
      // toast.error('Bank name is required');
      // return false;
      newErrors.bank = 'Bank name is required';
      valid = false;
    }
    if (!formData.accountHolderName) {
      // toast.error('Account holder name is required');
      // return false;
      newErrors.accountHolderName = 'Account holder name is required';
      valid = false;
    }
    if (!formData.accountNumber) {
      // toast.error('Please enter account number');
      // return false;
      newErrors.accountNumber = 'Account number is required';
      valid = false;
    }
    if (!formData.ifsc && !formData.iban) {
      // toast.error('Ifsc or iban is required');
      // return false;
      newErrors.ifsc = 'Ifsc or iban is required';
      valid = false;
    }
    // if (!formData.iban) {
    //   toast.error('Please enter iban');
    //   return false;
    // }
    // return true;
    setErrors(newErrors);
    return valid;
  };


  return (
    <div>
      <p className="text-sm text-[#00000066] mt-[20px]">Bank Account Details</p>
      <div className="flex flex-col gap-4 mt-[20px] sm:mt-[40px]">
        <div className="">
          <p className="text-xs sm:text-sm mb-2">Bank</p>
          <input
            type="text"
            name="bank"
            value={formData.bank}
            onChange={handleChange}
            placeholder="Enter Your Bank name"
            className="text-sm h-10 sm:h-12 border border-inputBorder rounded-md p-2 w-full outline-none"
          />
          {errors.bank && <p className="text-red-500 text-xs mt-1">{errors.bank}</p>}
        </div>

        <div className="">
          <p className="text-xs sm:text-sm mb-2">Account Holder Name</p>
          <input
            type="text"
            name="accountHolderName"
            value={formData.accountHolderName}
            onChange={handleChange}
            placeholder="Enter Account Holder Name"
            className="text-sm h-10 sm:h-12 border border-inputBorder rounded-md p-2 w-full outline-none"
          />
          {errors.accountHolderName && <p className="text-red-500 text-xs mt-1">{errors.accountHolderName}</p>}
        </div>
        <div className="">
          <p className="text-xs sm:text-sm mb-2">Account Number</p>
          <PasswordField
            placeHolder={"Enter Account Number"}
            postData={formData}
            setPostData={setFormData}
          />
          {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
        </div>
        <div className="flex items-center gap-5 w-full  ">
          <div className="w-full">
            <p className="text-xs sm:text-sm mb-2">Iban</p>
            <input
              type="text"
              name="iban"
              value={formData.iban}
              onChange={handleChange}
              placeholder="EnterI ban Number"
              className="text-sm h-10 sm:h-12 border border-inputBorder rounded-md p-2 w-full outline-none"
            />
          </div>
          <div className="w-full">
            <p className="text-xs sm:text-sm mb-2">IFSC Code</p>
            <input
              type="text"
              name="ifsc"
              value={formData.ifsc}
              onChange={handleChange}
              placeholder="Enter IFSC"
              className="text-sm h-10 sm:h-12 border border-inputBorder rounded-md p-2 w-full outline-none"
            />
          </div>
        </div>
        {errors.ifsc && <p className="text-red-500 text-xs mt-1">{errors.ifsc}</p>}
      </div>
      <button
        // onClick={handleSubmit}
        onClick={() => validateFirstForm() && handleSubmit()}
        disabled={isPending}
        className="w-full text-sm h-10 sm:h-12 rounded-full bg-buttonColor p-3 flex items-center justify-center text-white mt-7"
      >
        {isPending ? <Spinner /> : 'Next'}
      </button>
    </div>
  );
}

export default BankDataForm
