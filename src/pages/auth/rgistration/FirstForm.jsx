import React, { useState } from 'react';
import Select from 'react-select';
import { Country, State } from 'country-state-city';
import SelectPhoneCode from '../../../components/phone/SelectPhoneCode';
import { toast } from 'react-toastify';
import { validatePhoneNumber } from "./validatePhone";

function FirstForm({ formData, setFormData, setNext, message }) {

  const [errors, setErrors] = useState({});

  // Get all countries
  const countries = Country.getAllCountries().map(country => ({
    value: country.isoCode,
    label: country.name,
    ...country
  }));

  // Get states for selected country
  const states = formData.countryCode ?
    State.getStatesOfCountry(formData.countryCode).map(state => ({
      value: state.isoCode,
      label: state.name,
      ...state
    })) : [];

  // Custom styles for react-select to match your design
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: '40px',
      minHeight: '40px',
      '@media (min-width: 640px)': {
        height: '48px',
        minHeight: '48px',
      },
      borderColor: state.isFocused ? '#000' : '#e2e8f0',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#000',
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '0 8px',
    }),
    input: (provided) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: '0 8px',
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: '14px',
    }),

    menu: (provided) => ({
      ...provided,
      marginTop: '4px',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: '110px', // This sets the maximum height of the dropdown
      padding: '4px',
      '&::-webkit-scrollbar': {
        width: '4px',
      },
      '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#888',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#555',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#2563eb'
        : state.isFocused
          ? '#e2e8f0'
          : 'transparent',
      color: state.isSelected ? 'white' : 'black',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: state.isSelected ? '#2563eb' : '#e2e8f0',
      },
      fontSize: '14px',
      padding: '8px 12px',
    }),

  };

  const handleCountryChange = (selectedOption) => {
    if (selectedOption) {
      setFormData(prev => ({
        ...prev,
        country: selectedOption.name,
        countryCode: selectedOption.isoCode,
        state: '', // Reset state name
        stateCode: '' // Reset state code
      }));
    } else {
      // Handle when user clears the country selection
      setFormData(prev => ({
        ...prev,
        country: '',
        countryCode: '',
        state: '',
        stateCode: ''
      }));
    }

    setErrors(prev => ({
      ...prev,
      country: '',
      state: ''
    }));
  };

  const handleStateChange = (selectedOption) => {
    setFormData(prev => ({
      ...prev,
      state: selectedOption.name,
      stateCode: selectedOption.isoCode
    }));

    setErrors(prev => ({
      ...prev,
      state: ''
    }));
  };

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const phoneRegex = /^\d{10}$/;
    let valid = true;
    let newErrors = {};

    if (!formData.name) {
      // toast.error('Name is required');
      // return false;
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!validatePhoneNumber(formData.dialCode, formData.phone)) {
      // toast.error('Please enter valid phone number');
      // return;
      newErrors.phone = 'Please enter a valid phone number';
      valid = false;
    }
    // if (!formData.phone || !phoneRegex.test(formData.phone)) {
    //   toast.error('Please enter a valid phone number');
    //   return false;
    // }
    if (!formData.email || !emailRegex.test(formData.email)) {
      // toast.error('Please enter a valid email');
      // return false;
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }
    if (!formData.address) {
      // toast.error('Address is required');
      // return false;
      newErrors.address = 'Address is required';
      valid = false;
    }
    if (!formData.state) {
      // toast.error('Please enter state');
      // return false;
      newErrors.state = 'State is required';
      valid = false;
    }
    if (!formData.country) {
      // toast.error('Please enter country');
      // return false;
      newErrors.country = 'Country is required';
      valid = false;
    }

    // return true;
    setErrors(newErrors);
    return valid;
  };


  return (
    <div className="h-[calc(75vh)] overflow-y-auto">
      {/* <p className={`text-sm mt-[20px] ${message ? 'text-red-500 text-lg' : 'text-[#00000066]'}`}>
        {message ? 'Your request is rejected by admin, please apply again' : 'Create your Account'}
      </p> */}
      <p className='text-sm mt-[20px] text-[#00000066]'>
        Create your Account
      </p>
      <div className="flex flex-col gap-4 mt-[10px] sm:mt-[30px]">
        <div className="">
          <p className="text-xs sm:text-xs mb-2">Name</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Your Name"
            className="h-10 sm:h-12 border text-sm border-inputBorder rounded-md p-2 w-full outline-none"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <p className="text-xs sm:text-sm mb-2">Mobile Number</p>
          <SelectPhoneCode
            postData={formData}
            setPostData={setFormData}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
        <div className="">
          <p className="text-xs sm:text-sm mb-2">Email</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="h-10 sm:h-12 border border-inputBorder text-sm rounded-md p-2 w-full outline-none"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div className="">
          <p className="text-xs sm:text-sm mb-2">Address</p>
          <input
            type="text"
            placeholder="Enter Your Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="h-10 sm:h-12 text-xs border border-inputBorder rounded-md p-2 w-full outline-none"
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>
        <div className="flex items-center gap-5 w-full  ">
          <div className="w-full">
            <p className="text-xs sm:text-sm mb-2">Country</p>

            <Select
              options={countries}
              // value={countries.find(country => country.isoCode === formData.countryCode)}
              value={countries.find((country) => country.name.toLowerCase() === formData.country.toLowerCase())}
              onChange={handleCountryChange}
              placeholder="Select Country"
              styles={customStyles}
            // isClearable
            />

            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
          </div>
          <div className="w-full">
            <p className="text-xs sm:text-sm mb-2">State</p>

            <Select
              options={states}
              // value={formData.stateCode ? states.find(state => state.isoCode === formData.stateCode) : null}
              // options={states.filter((state) => state.countryName === formData.country)} // Filter states by selected country
              value={
                formData.state
                  ? states.find((state) => state.name.toLowerCase() === formData.state.toLowerCase())
                  : null
              }
              onChange={handleStateChange}
              placeholder="Select State"
              styles={customStyles}
              isDisabled={!formData.countryCode}
              // isClearable
              key={formData.countryCode} // Add this key prop
            />

            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </div>
        </div>
      </div>
      <button
        // onClick={() => setNext("company")}
        onClick={() => validateFirstForm() && setNext("company")}
        className="w-full h-10 sm:h-12 rounded-full bg-buttonColor p-3 flex items-center justify-center text-white mt-7"
      >
        Next
      </button>
    </div>
  );
}

export default FirstForm
