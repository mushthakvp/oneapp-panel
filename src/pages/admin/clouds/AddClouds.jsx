import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../../components/pageHeding/PageHeading";
import { useAddClod } from "../../../api/useDataControllerAdmin";
import { useImageUpload } from "../../../api/useDataController";
import { toast } from "react-toastify";

function AddClouds() {
  const { mutate: imageMutate, isPending: imagePending } = useImageUpload();
  const navigate = useNavigate();
  const [prev,setPrev] =useState('')
  const [errors, setErrors] = useState({});
  const [unit, setUnit] = useState("GB");
  const [postdata, setPostData] = useState({
    name: "",
    image: "",
    price: "", // Changed from 0 to empty string
    specification: ["", "", ""],
    unit: "GB",
    storage: "", // Changed from 0 to empty string
  });

  const { mutate, isPending } = useAddClod();

  const validateForm = () => {
    const newErrors = {};

    if (!postdata.name.trim()) {
      newErrors.name = "Plan name is required";
    }

    // Modified price validation to handle empty string
    if (!postdata.price || Number(postdata.price) <= 0) {
      newErrors.price = "Valid price is required";
    }

    // Modified storage validation to handle empty string
    if (!postdata.storage || Number(postdata.storage) <= 0) {
      newErrors.storage = "Valid storage amount is required";
    }
    if (!postdata?.image) {
  newErrors.image = 'Image is required'
}
    if (!postdata.specification.some((spec) => spec.trim())) {
      newErrors.specification = "At least one specification is required";
    }
console.log(newErrors);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "specification") {
      const newSpecification = [...postdata.specification];
      newSpecification[index] = value;
      setPostData((prev) => ({
        ...prev,
        specification: newSpecification,
      }));
    } else {
      setPostData((prev) => ({
        ...prev,
        [name]: value, // Remove the Number conversion here
      }));
    }
  };

  const handleSubmit = async () => {
        console.log(validateForm());
        
    if (validateForm()) {
   
      try {
        // Convert price and storage to numbers before submitting
         const cleanedSpecifications = postdata.specification.filter(
           (spec) => spec.trim() !== ""
         );
       
        const submitData = {
         
          price: Number(postdata.price),
          storage: Number(postdata.storage),
          specification: cleanedSpecifications,
        };
        console.log(submitData);
        
        imageMutate(postdata?.image, {
          onSuccess: (imageData) => {
            mutate(
              {
                name: postdata?.name,
                image: imageData?.secure_url,
                ...submitData,
                unit: postdata?.unit,
                // Changed from 0 to empty string}, {
              },
              {
                onSuccess: () => {
                  toast.success("Cloud added successfully");
                  setPostData({
                    name: "",
                    image: "",
                    price: "", // Changed from 0 to empty string
                    specification: ["", "", ""],
                    unit: "GB",
                    storage: "", // Changed from 0 to empty string
                  });
                },
              }
            );
          },
        });
        
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          submit: "Failed to submit form. Please try again.",
        }));
      }
    }
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // You might want to add file type validation here
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostData((prev) => ({
          ...prev,
          image: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
    const handleUnitChange = (selectedUnit) => {
      setUnit(selectedUnit);
      setPostData((prev) => ({
        ...prev,
        unit: selectedUnit,
      }));
    };

 
  // Rest of your component remains the same...
  return (
    <div>
      <div className="flex items-center gap-5 text-sm">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.9998 18H5.99976M5.99976 18L14.9998 9M5.99976 18L14.9998 27"
            stroke="black"
            strokeWidth="1.98214"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <PageHeading title={"Add Cloud"} />
      </div>
      <div className="bg-containerWhite rounded-md border border-inputBorder mt-6 p-[35px] font-urbanist">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Plan Name */}
          <div>
            <p>Plan Name</p>
            <input
              type="text"
              name="name"
              value={postdata.name}
              onChange={(e) => handleInputChange(e)}
              className={`w-full h-10 md:h-12 p-2 md:px-4 border ${
                errors.name ? "border-red-500" : "border-inputBorder"
              } rounded-md mt-2`}
              placeholder="Enter Plan Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <p>Price</p>
            <input
              type="number"
              name="price"
              value={postdata.price}
              onChange={(e) => handleInputChange(e)}
              className={`w-full h-10 md:h-12 p-2 md:px-4 border ${
                errors.price ? "border-red-500" : "border-inputBorder"
              } rounded-md mt-2`}
              placeholder="Enter Plan Price"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <p>Image</p>
            <div className="w-full flex items-center justify-between h-10 md:h-12 p-2 md:px-4 border border-inputBorder rounded-md mt-2">
              <p>{postdata.image ? "Image selected" : "Upload Image"}</p>
              <input
                id="filePicker"
                type="file"
                className="hidden"
                onChange={handleImageUpload}
                accept="image/*"
              />
              <button
                className="flex items-center text-white bg-buttonColor rounded-md w-[80px] h-[34px] justify-center gap-1"
                onClick={() => document.getElementById("filePicker").click()}
              >
                Upload
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.31836 0C2.38119 0 0 2.38119 0 5.31836C0 8.25553 2.38119 10.6367 5.31836 10.6367C8.25553 10.6367 10.6367 8.25553 10.6367 5.31836C10.6367 2.38119 8.25553 0 5.31836 0ZM5.31836 10.2276C2.60702 10.2276 0.409105 8.0297 0.409105 5.31836C0.409105 2.60702 2.60702 0.409105 5.31836 0.409105C8.0297 0.409105 10.2276 2.60702 10.2276 5.31836C10.2276 8.0297 8.0297 10.2276 5.31836 10.2276Z"
                    fill="white"
                  />
                  <path
                    d="M8.69625 5.11463H5.52569V1.94407C5.52569 1.88762 5.47987 1.8418 5.42342 1.8418H5.21886C5.16241 1.8418 5.11659 1.88762 5.11659 1.94407V5.11463H1.94603C1.88957 5.11463 1.84375 5.16045 1.84375 5.21691V5.42146C1.84375 5.47792 1.88957 5.52374 1.94603 5.52374H5.11659V8.6943C5.11659 8.75055 5.16241 8.79658 5.21886 8.79658H5.42342C5.47987 8.79658 5.52569 8.75055 5.52569 8.6943V5.52374H8.69625C8.75251 5.52374 8.79853 5.47792 8.79853 5.42146V5.21691C8.79853 5.16045 8.75251 5.11463 8.69625 5.11463Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
            )}
          </div>

          {/* Storage */}
          <div>
            <p>Storage</p>
            <div className="w-full flex items-center justify-between h-10 md:h-12 md:px-4 border border-inputBorder rounded-md mt-2">
              <input
                type="number"
                name="storage"
                value={postdata.storage}
                onChange={(e) => handleInputChange(e)}
                placeholder="Enter storage"
                className={`w-full border-none bg-transparent outline-none ${
                  errors.storage ? "border-red-500" : ""
                }`}
              />
              <div className="flex items-center gap-1">
                <button
                  className={`flex items-center rounded-md text-xs p-1 px-2 justify-center gap-1 ${
                    unit === "MB" ? "bg-buttonColor text-white" : "bg-[#EDEDED]"
                  }`}
                  onClick={() => handleUnitChange("MB")}
                >
                  MB
                </button>
                <button
                  className={`flex items-center rounded-md text-xs p-1 px-2 justify-center gap-1 ${
                    unit === "GB" ? "bg-buttonColor text-white" : "bg-[#EDEDED]"
                  }`}
                  onClick={() => handleUnitChange("GB")}
                >
                  GB
                </button>
              </div>
            </div>
            {errors.storage && (
              <p className="text-red-500 text-sm mt-1">{errors.storage}</p>
            )}
          </div>

          {/* Specifications */}
          {postdata.specification.map((spec, index) => (
            <div key={index}>
              <p>{index === 0 ? "Specification" : ""}</p>
              <input
                type="text"
                name="specification"
                value={spec}
                onChange={(e) => handleInputChange(e, index)}
                className={`w-full h-10 md:h-12 p-2 md:px-4 border ${
                  errors.specification && index === 0
                    ? "border-red-500"
                    : "border-inputBorder"
                } rounded-md mt-2`}
                placeholder="Enter Plan Specification"
              />
              {errors.specification && index === 0 && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.specification}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center mt-[53px]">
          <button
            className="w-full bg-buttonColor text-white max-w-[352px] h-10 md:h-12 rounded-md disabled:opacity-50"
            onClick={handleSubmit}
            disabled={isPending||imagePending}
          >
            {isPending||imagePending ? "Submitting..." : "Submit"}
          </button>
          {errors.submit && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {errors.submit}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddClouds;
