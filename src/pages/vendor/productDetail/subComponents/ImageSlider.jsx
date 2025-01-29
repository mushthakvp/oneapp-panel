import React, { useState } from 'react';

function ImageSlider({ images }) {

    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const handleImageChange = (index) => {
        setActiveImageIndex(index);
    };


    return (
        <>
            <div className="relative mb-[16px] rounded-2xl overflow-hidden">
                <img
                    src={images[activeImageIndex]}
                    alt={`Product Image ${activeImageIndex + 1}`}
                    // className="w-full h-auto rounded-md"
                    className="w-full h-[300px] rounded-md"
                />
            </div>
            <div className="flex items-center justify-center gap-2">
                {images.map((image, index) => (
                    <div
                        key={index}
                        onClick={() => handleImageChange(index)} // Change image on click
                        className={`w-2 h-2 rounded-full cursor-pointer ${index === activeImageIndex ? "bg-buttonColor" : "bg-gray-300"}`}
                    />
                ))}
            </div>
        </>
    );
}

export default ImageSlider
