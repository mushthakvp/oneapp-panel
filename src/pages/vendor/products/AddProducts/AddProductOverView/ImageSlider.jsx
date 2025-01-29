import React, { useState } from 'react'
import noProduct from '../../../../../assets/products/noProduct.png'

function ImageSlider({ variants }) {
      const [activeImageIndex, setActiveImageIndex] = useState(0);


     const images = variants?.flatMap((variant) => variant?.images || []).filter((image) => image);

      const handleImageChange = (index) => {
        setActiveImageIndex(index);
      };
    const objectURL =
      images[activeImageIndex] instanceof File
        ? URL.createObjectURL(images[activeImageIndex])
        : images[activeImageIndex];
    return (
      <>
        <div className="relative mb-[16px] rounded-md overflow-hidden w-full flex justify-center">
          {/* Display the current active image */}
          {objectURL ? (
            <img
              src={objectURL}
              alt={`Product Image ${activeImageIndex + 1}`}
              className="w-full max-w-[271px] max-h-[300.12px] min-h-[300.12px] h-auto  rounded-xl"
            />
          ) : (
            <img
              src={noProduct}
              alt={`Product Image ${activeImageIndex + 1}`}
              className="w-full max-w-[271px] max-h-[300.12px] min-h-[300.12px] h-auto  rounded-xl"
            />
          )}
        </div>
        <div className="flex items-center justify-center gap-2">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => handleImageChange(index)} // Change image on click
              className={`w-2 h-2 rounded-full cursor-pointer ${
                index === activeImageIndex ? "bg-buttonColor" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </>
    );
}

export default ImageSlider
