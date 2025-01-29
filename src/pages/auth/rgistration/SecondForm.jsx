import React, { useState, useRef } from 'react'
import { toast } from 'react-toastify';
import Select from 'react-select';
import { ChevronDown, Plus, Minus, Upload, Loader2 } from 'lucide-react';
import { uploadFile } from '../../../api/cloudinary';


const COMPANY_TYPES = [
  { value: 'public', label: 'Public Limited' },
  { value: 'private', label: 'Private Limited' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'proprietorship', label: 'Proprietorship' },
  { value: 'llp', label: 'LLP' },
  { value: 'opc', label: 'One Person Company' }
];

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
    maxHeight: '200px',
    padding: '4px',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#2563eb' : state.isFocused ? '#e2e8f0' : 'transparent',
    color: state.isSelected ? 'white' : 'black',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: state.isSelected ? '#2563eb' : '#e2e8f0',
    },
    fontSize: '14px',
    padding: '8px 12px',
  }),
};

function SecondForm({ formData, setFormData, setNext }) {

  const [errors, setErrors] = useState({});
  // const [directors, setDirectors] = useState(formData.directors || ['']); // For multiple names (directors/partners/designators)
  const [directors, setDirectors] = useState(
    formData.directors?.map(d => ({ director: d, dinNumber: '' })) || [{ director: '', dinNumber: '' }]
  );
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

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

  const handleCompanyTypeChange = (selectedOption) => {
    setFormData(prev => ({
      ...prev,
      companyType: selectedOption.label,
      // directors: [''] 
      directors: [{ director: '', dinNumber: '' }] // Reset with correct structure
    }));
    // setDirectors(['']); 
    setDirectors([{ director: '', dinNumber: '' }]); // Reset local state with correct structure
    setErrors(prev => ({
      ...prev,
      companyType: ''
    }));
  };

  // const handleNameChange = (index, value) => {
  //   const newNames = [...directors];
  //   newNames[index] = value;
  //   setDirectors(newNames);
  //   setFormData(prev => ({
  //     ...prev,
  //     directors: newNames
  //   }));
  // };

  const handleNameChange = (index, field, value) => {
    const newDirectors = [...directors];
    newDirectors[index][field] = value;
    setDirectors(newDirectors);
    setFormData(prev => ({
      ...prev,
      directors: newDirectors
    }));
  };

  // const addNameField = () => {
  //   setDirectors([...directors, '']);
  // };
  const addNameField = () => {
    setDirectors([...directors, { director: '', dinNumber: '' }]);
  };

  const removeNameField = (index) => {
    const newNames = directors.filter((_, i) => i !== index);
    setDirectors(newNames);
    setFormData(prev => ({
      ...prev,
      directors: newNames
    }));
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    setIsUploading(true);
    try {
      const uploadedFile = await uploadFile(file);
      setFormData(prev => ({
        ...prev,
        roc: uploadedFile.secure_url
      }));
      toast.success('ROC image uploaded successfully');
      setErrors(prev => ({
        ...prev,
        roc: ''
      }));
    } catch (error) {
      toast.error('Failed to upload ROC image');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const getNameFieldLabel = () => {
    switch (formData.companyType) {
      case 'Public Limited':
      case 'Private Limited':
        return "Director's Name";
      case 'Partnership':
        return "Partner's Name";
      case 'Proprietorship':
        return "Proprietor's Name";
      case 'LLP':
        return "Designator's Name";
      case 'One Person Company':
        return "Person's Name";
      default:
        return "Name";
    }
  };

  const getNameFieldPlaceholder = () => {
    switch (formData.companyType) {
      case 'Public Limited':
      case 'Private Limited':
        return "Enter director name";
      case 'Partnership':
        return "Enter partner name";
      case 'Proprietorship':
        return "Enter proprietor name";
      case 'LLP':
        return "Enter designator name";
      case 'One Person Company':
        return "Enter person name";
      default:
        return "Enter name";
    }
  };

  const shouldShowAddButton = () => {
    return ['Public Limited', 'Private Limited', 'Partnership', 'LLP'].includes(formData.companyType);
  };

  const validateFirstForm = () => {

    let valid = true;
    let newErrors = {};

    if (!formData.companyName) {
      // toast.error('Company name is required');
      // return false;
      newErrors.companyName = 'Company name is required';
      valid = false;
    }
    if (!formData.companyAddress) {
      // toast.error('Company address is required');
      // return false;
      newErrors.companyAddress = 'Company address is required';
      valid = false;
    }
    if (!formData.companyType) {
      // toast.error('Please enter company type');
      // return false;
      newErrors.companyType = 'Company type is required';
      valid = false;
    }
    if (!formData.roc) {
      // toast.error('Please enter company type');
      // return false;
      newErrors.roc = 'ROC is required';
      valid = false;
    }
    if (!formData.tradeLicense) {
      // toast.error('Please enter company type');
      // return false;
      newErrors.tradeLicense = 'Trade license is required';
      valid = false;
    }
    if (!formData.gstNumber) {
      // toast.error('Please enter company type');
      // return false;
      newErrors.gstNumber = 'GST number is required';
      valid = false;
    }
    // if (!formData.dinNumber) {
    //   newErrors.dinNumber = 'DIN number is required';
    //   valid = false;
    // }

    if (directors.length > 0) {
      const directorsValid = directors.every((director, index) => {
        console.log('directors: ', directors);
        
        if (!director.director || !director.dinNumber) {
          newErrors[`director_${index}`] = `Both ${getNameFieldLabel()} and DIN number are required`;
          valid = false;
          return false;
        }
        return true;
      });
    }

    // return true;
    setErrors(newErrors);
    return valid;
  };

  return (
    <div className="h-[calc(75vh)] overflow-y-auto">
      <p className="text-sm text-[#00000066] mt-[20px]">Company Details</p>
      <div className="flex flex-col gap-4 mt-[20px] sm:mt-[40px]">
        <div className="">
          <p className="text-xs sm:text-sm mb-2">Company Name</p>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter Your company Name"
            className="text-sm h-10 sm:h-12 border border-inputBorder rounded-md p-2 w-full outline-none"
          />
          {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
        </div>

        <div className="">
          <p className="text-xs sm:text-sm mb-2">Address</p>
          <input
            type="text"
            name="companyAddress"
            value={formData.companyAddress}
            onChange={handleChange}
            placeholder="Enter Your Company Address"
            className="text-sm h-10 sm:h-12 border border-inputBorder rounded-md p-2 w-full outline-none"
          />
          {errors.companyAddress && <p className="text-red-500 text-xs mt-1">{errors.companyAddress}</p>}
        </div>
        <div className="">
          <p className="text-xs sm:text-sm mb-2">Company Type</p>

          <Select
            options={COMPANY_TYPES}
            onChange={handleCompanyTypeChange}
            styles={customStyles}
            placeholder="Select Company Type"
            value={COMPANY_TYPES.find(type => type.label === formData.companyType)}
          />

          {errors.companyType && <p className="text-red-500 text-xs mt-1">{errors.companyType}</p>}
        </div>

        {/* {formData.companyType && (
          <div>
            <p className="text-xs sm:text-sm mb-2">{getNameFieldLabel()}</p>
            <div className="flex flex-col gap-2">
              {directors?.map((name, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    placeholder={getNameFieldPlaceholder()}
                    className={`text-sm h-10 sm:h-12 border border-inputBorder rounded-md p-2 outline-none ${shouldShowAddButton() ? 'w-[90%]' : 'w-full'
                      }`}
                  />
                  {shouldShowAddButton() && (
                    <div className="flex gap-2">
                      {index === directors?.length - 1 ? (
                        <button
                          onClick={addNameField}
                          className="px-3 bg-red-500 text-white rounded-md"
                        >
                          <Plus size={20} />
                        </button>
                      ) : (
                        <button
                          onClick={() => removeNameField(index)}
                          className="px-3 bg-red-500 text-white rounded-md"
                        >
                          <Minus size={20} />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )} */}

        {formData.companyType && (
          <div className="border-t border-b border-gray-200 py-4 my-4">
            <p className="text-xs sm:text-sm mb-2">{getNameFieldLabel()}</p>
            <div className="flex flex-col gap-4">
              {directors?.map((director, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={director.director}
                    onChange={(e) => handleNameChange(index, 'director', e.target.value)}
                    placeholder={getNameFieldPlaceholder()}
                    className="text-sm h-10 sm:h-12 border border-inputBorder rounded-md p-2 w-full outline-none"
                  />
                  <input
                    type="text"
                    value={director.dinNumber}
                    onChange={(e) => handleNameChange(index, 'dinNumber', e.target.value)}
                    placeholder="Enter DIN number"
                    className="text-sm h-10 sm:h-12 border border-inputBorder rounded-md p-2 w-full outline-none"
                  />
                  {errors[`director_${index}`] && (
                    <p className="text-red-500 text-xs mt-1">{errors[`director_${index}`]}</p>
                  )}
                  {index > 0 && (
                    <button
                      onClick={() => removeNameField(index)}
                      className="flex items-center gap-2 text-red-500 text-sm"
                    >
                      <Minus size={16} />
                      Remove
                    </button>
                  )}
                </div>
              ))}

              {shouldShowAddButton() && (
                <button
                  onClick={addNameField}
                  className="flex items-center gap-2 text-blue-500 text-sm mt-2"
                >
                  <Plus size={16} />
                  Add Another {getNameFieldLabel()}
                </button>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-5">
          <div className="w-full">
            <p className="text-xs sm:text-sm mb-2">
              {/* GST Number <span className="text-gray-400 text-xs">(optional)</span> */}
              GST Number
            </p>
            <input
              type="text"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
              placeholder="Enter GST number"
              className="text-sm h-10 sm:h-12 border border-inputBorder rounded-md p-2 w-full outline-none"
            />
            {errors.gstNumber && <p className="text-red-500 text-xs mt-1">{errors.gstNumber}</p>}
          </div>
          <div className="w-full">
            <p className="text-xs sm:text-sm mb-2">Trade License</p>
            <input
              type="text"
              name="tradeLicense"
              value={formData.tradeLicense}
              onChange={handleChange}
              placeholder="Enter trade license"
              className="text-sm h-10 sm:h-12 border border-inputBorder rounded-md p-2 w-full outline-none"
            />
            {errors.tradeLicense && <p className="text-red-500 text-xs mt-1">{errors.tradeLicense}</p>}
          </div>
        </div>

        {/* <div className="flex gap-5">
          <div className="w-full">
            <p className="text-xs sm:text-sm mb-2">
              DIN Number
            </p>
            <input
              type="text"
              name="dinNumber"
              value={formData.dinNumber}
              onChange={handleChange}
              placeholder="Enter DIN number"
              className="text-sm h-10 sm:h-12 border border-inputBorder rounded-md p-2 w-full outline-none"
            />
            {errors.dinNumber && <p className="text-red-500 text-xs mt-1">{errors.dinNumber}</p>}
          </div>
          <div className="w-full">
            <p className="text-xs sm:text-sm mb-2">ROC</p>
            <div className="relative">
              <input
                type="text"
                name="roc"
                value={formData.roc || ''}
                readOnly
                placeholder="Upload ROC"
                className="text-sm h-10 sm:h-12 border border-inputBorder rounded-md p-2 w-full outline-none"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                {isUploading ? (
                  <Loader2 size={20} className="text-gray-500 animate-spin" />
                ) : (
                  <Upload size={20} className="text-gray-500" />
                )}
              </button>
            </div>
            {errors.roc && <p className="text-red-500 text-xs mt-1">{errors.roc}</p>}
          </div>
        </div> */}

        <div className="w-full">
          <p className="text-xs sm:text-sm mb-2">ROC</p>
          <div className="relative">
            <input
              type="text"
              name="roc"
              value={formData.roc || ''}
              readOnly
              placeholder="Upload ROC"
              className="text-sm h-10 sm:h-12 border border-inputBorder rounded-md p-2 w-full outline-none"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              {isUploading ? (
                <Loader2 size={20} className="text-gray-500 animate-spin" />
              ) : (
                <Upload size={20} className="text-gray-500" />
              )}
            </button>
          </div>
          {errors.roc && <p className="text-red-500 text-xs mt-1">{errors.roc}</p>}
        </div>

      </div>
      <button
        // onClick={() => setNext("bank")}
        onClick={() => validateFirstForm() && setNext("bank")}
        disabled={isUploading}
        className="w-full text-sm h-10 sm:h-12 rounded-full bg-buttonColor p-3 flex items-center justify-center text-white mt-7"
      >
        {/* {isUploading ? (
          <div className="flex items-center gap-2">
            <Loader2 size={20} className="animate-spin" />
            Uploading...
          </div>
        ) : (
          'Next'
        )} */}
        Next
      </button>
    </div>
  );
}

export default SecondForm
