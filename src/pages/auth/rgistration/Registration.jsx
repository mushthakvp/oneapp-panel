import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SelectPhoneCode from '../../../components/phone/SelectPhoneCode';
import FirstForm from './FirstForm';
import SecondForm from './SecondForm';
import BankDataForm from './BankDataForm';
import { useSignUp } from '../../../api/useDataController';
import { toast } from 'react-toastify';
import { validatePhoneNumber } from "./validatePhone";

function Registration({ vendor, message, bank }) {

  const navigate = useNavigate();
  const [next, setNext] = useState('user');
  const [formData, setFormData] = useState({
    // User details
    name: vendor?.name || '',
    phone: vendor?.phone || '',
    dialCode: vendor?.dialCode || '+91',
    email: vendor?.email || '',
    address: vendor?.address || '',
    country: vendor?.country || '',
    state: vendor?.state || '',
    countryCode: vendor?.countryCode || 'IN',
    stateCode: vendor?.stateCode || '',

    // Company details
    companyName: vendor?.companyName || '',
    companyAddress: vendor?.companyAddress || '',
    companyType: vendor?.companyType || '',
    directors: vendor?.directors || [],
    gstNumber: vendor?.gstNumber || '',
    tradeLicense: vendor?.tradeLicense || '',
    // dinNumber: vendor?.dinNumber || '',
    roc: vendor?.roc || '',

    // Bank details
    bank: bank?.bank || '',
    accountHolderName: bank?.accountHolderName || '',
    accountNumber: bank?.accountNumber || '',
    iban: bank?.iban || '',
    ifsc: bank?.ifsc || '',
  });

  const { mutate, isPending } = useSignUp();

  const handleSubmit = () => {
    // Validate all required fields

    if (!validateAllFields()) {
      toast.error('Please fill all required fields correctly');
      return;
    }

    mutate(formData, {
      onSuccess: (data) => {
        toast.success(data.message || 'Registration successful!');
        navigate("/otp-verify", { state: { email: formData?.email } });

        setFormData({
          // Reset all fields to their default values
          name: '',
          phone: '',
          dialCode: '+91',
          email: '',
          address: '',
          country: '',
          state: '',
          countryCode: 'IN',
          stateCode: '',
          companyName: '',
          companyAddress: '',
          companyType: '',
          directors: [''],
          gstNumber: '',
          tradeLicense: '',
          dinNumber: '',
          roc: '',
          bank: '',
          accountHolderName: '',
          accountNumber: '',
          iban: '',
          ifsc: '',
        });

      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || 'Registration failed');
      }
    });
  };

  const validateAllFields = () => {
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const phoneRegex = /^\d{10}$/;

    // if (!formData.email || !emailRegex.test(formData.email)) return false;
    // if (!formData.phone || !phoneRegex.test(formData.phone)) return false;
    // if (!formData.name || formData.name.length < 3) return false;
    // if (!formData.bank) return false;
    // if (!formData.accountHolderName) return false;
    // if (!formData.accountNumber) return false;
    // if (!formData.iban && !formData.ifsc) return false;
    // if (!formData.ifsc) return false;
    return true;
  };


  return (
    // <div className="font-urbanist ">
    //      {next==='user'&& <FirstForm setNext={setNext}/>}
    //      {next==='company'&& <SecondForm setNext={setNext}/>}
    //      {next==='bank'&& <BankDataForm/>}
    // </div>

    <div className="font-urbanist">
      {next === 'user' && (
        <FirstForm
          formData={formData}
          setFormData={setFormData}
          setNext={setNext}
          message={message}
        />
      )}
      {next === 'company' && (
        <SecondForm
          formData={formData}
          setFormData={setFormData}
          setNext={setNext}
        />
      )}
      {next === 'bank' && (
        <BankDataForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          isPending={isPending}
        />
      )}
    </div>

  );
}

export default Registration
