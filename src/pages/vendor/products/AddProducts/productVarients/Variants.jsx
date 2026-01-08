import React, { useState } from 'react';
import ColorDrp from '../dropDownSection/ColorDrp';
import PlusMinusButton from '../PlusMinusButton';


function Variants({ variant, variants, setVariants, index }) {
  const [getIndex, setGetIndex] = useState(index)


  const addSizes = () => {
    const newSize = {
      Size: "",
      prize: "",
      Quantity: "",
      OfferPrize: "",
      // Weight: "",
    };

    const updatedVariants = variants.map((v, i) => {
      if (i === index) {
        // Preserve other properties and only update the sizes
        return {
          ...v, // Spread the existing properties of the variant
          sizes: [...v.sizes, newSize], // Add the new size to the current variant's sizes
        };
      }
      return v;
    });

    setVariants(updatedVariants); // Update the state with the new variant list

  };

  const removeSizes = (sizeIndex) => {
    const updatedVariants = variants.map((v, i) => {
      if (i === index) {
        // Preserve other properties and only update the sizes
        return {
          ...v,
          sizes: variant?.sizes.filter((_, idx) => {
            return idx !== sizeIndex;
          }), // Remove the size at sizeIndex
        };
      }

      return v;
    });

    setVariants(updatedVariants);
  };
  const handleFileChange = (event, imageIndex, variantIndex) => {


    const file = event.target.files[0]; // Get the first file (if any)
    if (file) {
      setVariants((prevVariants) => {
        const updatedVariants = [...prevVariants]; // Create a copy of the variants array.


        // Update the image at the correct getIndex and imagegetIndex.
        updatedVariants[getIndex].images[imageIndex] = file;

        // Return the updated variants.
        return updatedVariants;
      });
    }
  };


  return (
    <div className="w-full font-urbanist">
      <div className="w-full ">
        <p className="mb-[8px]">Color</p>
        <ColorDrp
          selected={variants}
          setSelected={setVariants}
          variantIndex={index}
        />
      </div>
      {/* imageSection */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 mt-[28px] gap-3">
        {variant?.images?.length > 0 &&
          variant?.images?.map((image, imageIndex) => {
            const objectURL =
              image instanceof File ? URL.createObjectURL(image) : image;
            return (
              <div>
                <input
                  type="file"
                  id={`file-input_Add-${imageIndex}-${index}`}
                  accept="image/*"
                  onChange={(event) => {
                    handleFileChange(event, imageIndex, index);
                  }}
                  className="file-input hidden"
                />
                <div
                  onClick={(e) => {
                    setGetIndex(index);
                    e.preventDefault();

                    document
                      .getElementById(`file-input_Add-${imageIndex}-${index}`)
                      .click();
                  }}
                  className={`${!objectURL &&
                    "border-dashed border-2 border-dashed-[#DCDCDC]"
                    } relative cursor-pointer  p-4 rounded-md flex flex-col items-center justify-center gap-4  min-h-[160px] overflow-hidden`}
                >
                  {image && (
                    <img
                      src={objectURL}
                      alt=""
                      className="w-full h-full absolute"
                    />
                  )}
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.6">
                      <path
                        d="M3.33398 20C3.33398 12.1432 3.33398 8.21487 5.77476 5.77409C8.21554 3.33331 12.1439 3.33331 20.0007 3.33331C27.8574 3.33331 31.7858 3.33331 34.2265 5.77409C36.6673 8.21487 36.6673 12.1432 36.6673 20C36.6673 27.8567 36.6673 31.7851 34.2265 34.2259C31.7858 36.6666 27.8574 36.6666 20.0007 36.6666C12.1439 36.6666 8.21554 36.6666 5.77476 34.2259C3.33398 31.7851 3.33398 27.8567 3.33398 20Z"
                        stroke="black"
                        stroke-width="2"
                      />
                      <circle
                        cx="26.6673"
                        cy="13.3333"
                        r="3.33333"
                        stroke="black"
                        stroke-width="2"
                      />
                      <path
                        d="M3.33398 20.8336L6.25329 18.2792C7.77208 16.9503 10.0611 17.0265 11.4881 18.4535L18.6377 25.6031C19.7831 26.7484 21.5861 26.9046 22.9113 25.9732L23.4083 25.624C25.3154 24.2837 27.8955 24.439 29.6281 25.9983L35.0007 30.8336"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </g>
                  </svg>
                  <p className="text-center font-[400] text-[10px]">
                    Drop your images here or
                    <br /> select{" "}
                    <span className="text-[#2f4eff0f]">Click to browse</span>
                  </p>
                </div>
              </div>
            );
          })}
        {/* sizeSection */}
      </div>
      <div className="">
        {variant.sizes.map((size, sizeIndex) => {

          return (
            <div
              key={sizeIndex}
              className="flex flex-col gap-4 justify-between mb-2"
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 w-full gap-5 mt-6">
                <div className="w-full ">
                  <p className="mb-[8px]">Size</p>
                  <input
                    type="text"
                    value={size?.size}
                    placeholder="Enter product size"
                    onChange={(e) => {
                      setVariants((prevVariants) => {
                        const updatedVariants = [...prevVariants];
                        updatedVariants[getIndex].sizes[sizeIndex].size =
                          e.target.value;
                        return updatedVariants;
                      });
                    }}
                    className="w-full h-12 border border-inputBorder rounded-md px-3 bg-transparent outline-none"
                  />
                </div>
                <div className="w-full ">
                  <p className="mb-[8px]">Quantity</p>
                  <input
                    type="text"
                    value={size?.quantity}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Only update the state if the value is a valid number (this should work automatically with type="number")
                      if (!isNaN(value)) {
                        setVariants((prevVariants) => {
                          const updatedVariants = [...prevVariants];
                          updatedVariants[getIndex].sizes[sizeIndex].quantity =
                            e.target.value; // Convert to number
                          return updatedVariants;
                        });
                      }
                    }}
                    placeholder="Enter product Quantity"
                    className="w-full h-12 border border-inputBorder rounded-md px-3 bg-transparent outline-none"
                  />
                </div>
                <div className="w-full ">
                  <p className="mb-[8px]">Price</p>
                  <input
                    type="text"
                    value={size?.price}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Only update the state if the value is a valid number (this should work automatically with type="number")
                      if (!isNaN(value)) {
                        setVariants((prevVariants) => {
                          const updatedVariants = [...prevVariants];
                          updatedVariants[getIndex].sizes[sizeIndex].price =
                            e.target.value; // Convert to number
                          return updatedVariants;
                        });
                      }
                    }}
                    placeholder="Enter product Price"
                    className="w-full h-12 border border-inputBorder rounded-md px-3 bg-transparent outline-none"
                  />
                </div>
              </div>
              <div className="flex items-end gap-4 mt-5">
                <div className="w-full max-w-[214px]">
                  <p className="mb-[8px]">Offer Price</p>
                  <input
                    type="text"
                    placeholder="Enter Offer Price"
                    value={size?.offerPrice}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (!isNaN(value)) {
                        setVariants((prevVariants) => {
                          const updatedVariants = [...prevVariants];
                          updatedVariants[getIndex].sizes[
                            sizeIndex
                          ].offerPrice = e.target.value; // Convert to number
                          return updatedVariants;
                        });
                      }
                    }}
                    className="w-full h-12 border border-inputBorder rounded-md px-3 bg-transparent outline-none"
                  />
                </div>
                {/* <div className="w-full max-w-[214px]">
                  <p className="mb-[8px]">Weight</p>
                  <SizeDrop
                    index={index}
                    selected={variants}
                    setSelected={setVariants}
                    sizeIndex={sizeIndex}
                  />
                </div> */}
                <PlusMinusButton
                  callBack={addSizes}
                  icon={
                    <svg
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.7647 8.545H9.47059V1.23578C9.47059 1.10563 9.36518 1 9.23529 1H8.76471C8.63482 1 8.52941 1.10563 8.52941 1.23578V8.545H1.23529C1.10541 8.545 1 8.65063 1 8.78078V9.25234C1 9.38249 1.10541 9.48812 1.23529 9.48812H8.52941V16.7973C8.52941 16.927 8.63482 17.0331 8.76471 17.0331H9.23529C9.36518 17.0331 9.47059 16.927 9.47059 16.7973V9.48812H16.7647C16.8941 9.48812 17 9.38249 17 9.25234V8.78078C17 8.65063 16.8941 8.545 16.7647 8.545Z"
                        fill="white"
                        stroke="white"
                        stroke-width="2"
                      />
                    </svg>
                  }
                />
                {sizeIndex !== 0 && (
                  <PlusMinusButton
                    callBack={() => removeSizes(sizeIndex)}
                    icon={
                      <svg
                        width="20"
                        height="2"
                        viewBox="0 0 20 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1H19"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                      </svg>
                    }
                  />
                )}
              </div>
              {/* Button to remove the size */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Variants
