import React, { useRef, useState } from "react";

function ImagePicker({ formData, setFormData, prev, setPrev }) {
  const fileInputRef = useRef(null);
  
  const [error, setError] = useState("");

  // Image validation function
  const validateImage = (file) => {
    // Check file type
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setError("Please select only JPG or PNG images");
      return false;
    }

    // // Check file size (2MB max)
    // const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    // if (file.size > maxSize) {
    //   setError("Image size should be less than 2MB");
    //   return false;
    // }

    // Check image dimensions
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        // if (img.width > 1920 || img.height > 1080) {
        //   setError("Image dimensions should be max 1920x1080");
        //   resolve(false);
        // } else
        //     if (img.width !== 191 && img.height !== 298) {
        //   setError("Image dimensions should be min 191x298");
        //   resolve(false);
        // } else {
        setError("");
        resolve(true);
        // }
      };
    });
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const isValid = await validateImage(file);
      if (isValid) {
        const imageUrl = URL.createObjectURL(file);
        setFormData((prev) => ({
          ...prev,
          thumpImage: file,
        }));
        setPrev(imageUrl);
      }
    }
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const isValid = await validateImage(file);
      if (isValid) {
        const imageUrl = URL.createObjectURL(file);
        setFormData((prev) => ({
          ...prev,
          image: file,
        }));
        setPrev(imageUrl);
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="w-full">
      <p>Add Thumbnail</p>
      <div
        className={`h-[252px] mt-2 border-dashed border-2 rounded-md w-full flex flex-col items-center justify-center gap-3 relative overflow-hidden ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {prev ? (
          <div className="absolute inset-0 w-full h-full">
            <img
              src={prev}
              alt="Thumbnail"
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <button
                onClick={handleImageClick}
                className="bg-white/80 text-buttonColor px-4 py-2 rounded-md text-sm"
              >
                Change Image
              </button>
            </div>
          </div>
        ) : (
          <>
            <svg
              width="58"
              height="58"
              viewBox="0 0 58 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.8335 29C4.8335 17.6078 4.8335 11.9116 8.37262 8.3725C11.9117 4.83337 17.6079 4.83337 29.0002 4.83337C40.3924 4.83337 46.0886 4.83337 49.6277 8.3725C53.1668 11.9116 53.1668 17.6078 53.1668 29C53.1668 40.3923 53.1668 46.0885 49.6277 49.6276C46.0886 53.1667 40.3924 53.1667 29.0002 53.1667C17.6079 53.1667 11.9117 53.1667 8.37262 49.6276C4.8335 46.0885 4.8335 40.3923 4.8335 29Z"
                stroke={error ? "#EF4444" : "#2F4EFF"}
                strokeWidth="2"
              />
              <circle
                cx="38.6668"
                cy="19.3333"
                r="4.83333"
                stroke={error ? "#EF4444" : "#2F4EFF"}
                strokeWidth="2"
              />
              <path
                d="M4.8335 30.2086L9.0665 26.5048C11.2687 24.5778 14.5878 24.6884 16.657 26.7575L27.0238 37.1244C28.6846 38.7852 31.299 39.0116 33.2206 37.6611L33.9413 37.1547C36.7065 35.2113 40.4478 35.4365 42.96 37.6974L50.7502 44.7086"
                stroke={error ? "#EF4444" : "#2F4EFF"}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center text-[14px] md:text-[20px]">
              <h1>
                Drop your images here, or{" "}
                <span
                  className="cursor-pointer text-buttonColor"
                  onClick={handleImageClick}
                >
                  click to browse
                </span>
              </h1>
              <p className="text-[#5D7186] text-[12px]">
                191W x 298H recommended. PNG, JPG{" "}
              </p>
            </div>
          </>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/jpeg,image/png"
          onChange={handleImageChange}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

export default ImagePicker;
