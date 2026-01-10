import React, { useState } from "react";
import { toast } from "react-toastify";

function ImagePicker({ image, setImage, editData }) {
  // To store the selected image file
  const [dragging, setDragging] = useState(false); // To manage drag-and-drop state

  // Handle file selection when clicking the "Browse" button
  const handleFileSelect = (event) => {
    const file = event.target.files[0]; // Get the first selected file

    if (file) {
      const fileType = file.type; // Get the file type (MIME type)
      const validImageTypes = ["image/png", "image/jpeg"]; // Allowed file types
      const img = new Image(); // Create an Image instance

      // Check file type
      if (!validImageTypes.includes(fileType)) {
        toast.error("Only PNG or JPG files are allowed.");
        return; // Exit function if the file type is invalid
      }

      // Create an image to get its dimensions
      img.onload = () => {
        // const width = img.width;
        // const height = img.height;

        // // Check if dimensions match
        // if (width !== 64 || height !== 64) {
        //   toast.error("Image dimensions must be 64x64 pixels.");
        //   return; // Exit function if the dimensions are incorrect
        // }

        // If the file passes both checks, set the image
        setImage(file);
      };

      // Read the file to trigger the image load event
      img.src = URL.createObjectURL(file);
    }
  };

  // Handle the drag over event (to allow drop)
  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true); // Set dragging state to true when the user is dragging a file over the drop area
  };

  // Handle the drag leave event (when the dragged item leaves the drop area)
  const handleDragLeave = () => {
    setDragging(false);
  };

  // Handle the drop event (when the file is dropped)
  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0]; // Get the dropped file
    if (file) {
      const fileType = file.type; // Get the file type (MIME type)
      const validImageTypes = ["image/png", "image/jpeg"]; // Allowed file types
      const img = new Image(); // Create an Image instance

      // Check file type
      if (!validImageTypes.includes(fileType)) {
        toast.error("Only PNG or JPG files are allowed.");
        return; // Exit function if the file type is invalid
      }

      // Create an image to get its dimensions
      img.onload = () => {
        // const width = img.width;
        // const height = img.height;

        // // Check if dimensions match
        // if (width !==64 || height !== 64) {
        //   toast.error("Image dimensions must be 64x64 pixels.");
        //   return; // Exit function if the dimensions are incorrect
        // }

        // If the file passes both checks, set the image
        setImage(file);
      };

      // Read the file to trigger the image load event
      img.src = URL.createObjectURL(file);
    }
  };
  const imageUrl = image ? URL.createObjectURL(image) : null;
  return (
    <div className="flex items-center">
      <div className="w-full max-[30%]">
        Upload Image <span className="text-buttonColor">*</span>
      </div>
      <div
        className={`w-full min-w-[70%] border-2 border-dashed relative ${dragging ? "border-buttonColor" : "border-borderColor"
          } bg-transparent rounded-md h-[252px] flex flex-col items-center justify-center gap-[30px] overflow-hidden`}
        onDragOver={handleDragOver} // When dragging over the container
        onDragLeave={handleDragLeave} // When the dragged item leaves the container
        onDrop={handleDrop} // When the item is dropped into the container
      >
        {imageUrl ? (
          <div className="h-full w-full relative">
            <div
              onClick={() => document.getElementById("fileInput").click()}
              className=" z-20 absolute cursor-pointer w-[40px] h-[40px] bottom-5 right-5 rounded-full flex items-center justify-center bg-buttonColor"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.6665 9.99984C1.6665 6.07147 1.6665 4.10728 2.88689 2.88689C4.10728 1.6665 6.07147 1.6665 9.99984 1.6665C13.9282 1.6665 15.8924 1.6665 17.1128 2.88689C18.3332 4.10728 18.3332 6.07147 18.3332 9.99984C18.3332 13.9282 18.3332 15.8924 17.1128 17.1128C15.8924 18.3332 13.9282 18.3332 9.99984 18.3332C6.07147 18.3332 4.10728 18.3332 2.88689 17.1128C1.6665 15.8924 1.6665 13.9282 1.6665 9.99984Z"
                  stroke="#F6F6F6"
                  stroke-width="1.25"
                />
                <circle
                  cx="13.3332"
                  cy="6.66667"
                  r="1.66667"
                  stroke="#F6F6F6"
                  stroke-width="1.25"
                />
                <path
                  d="M1.6665 10.4169L3.12616 9.13976C3.88555 8.47529 5.03007 8.5134 5.74357 9.22691L9.31835 12.8017C9.89104 13.3744 10.7925 13.4525 11.4552 12.9868L11.7037 12.8121C12.6572 12.142 13.9473 12.2196 14.8136 12.9993L17.4998 15.4169"
                  stroke="#F6F6F6"
                  stroke-width="1.25"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <img
              src={imageUrl}
              className="w-full h-full max-h-[252px]"
              alt=""
            />
          </div>
        ) : editData?.image ? (
          <div className="h-full w-full relative">
            <div
              onClick={() => document.getElementById("fileInput").click()}
              className=" z-20 absolute cursor-pointer w-[40px] h-[40px] bottom-5 right-5 rounded-full flex items-center justify-center bg-buttonColor"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.6665 9.99984C1.6665 6.07147 1.6665 4.10728 2.88689 2.88689C4.10728 1.6665 6.07147 1.6665 9.99984 1.6665C13.9282 1.6665 15.8924 1.6665 17.1128 2.88689C18.3332 4.10728 18.3332 6.07147 18.3332 9.99984C18.3332 13.9282 18.3332 15.8924 17.1128 17.1128C15.8924 18.3332 13.9282 18.3332 9.99984 18.3332C6.07147 18.3332 4.10728 18.3332 2.88689 17.1128C1.6665 15.8924 1.6665 13.9282 1.6665 9.99984Z"
                  stroke="#F6F6F6"
                  stroke-width="1.25"
                />
                <circle
                  cx="13.3332"
                  cy="6.66667"
                  r="1.66667"
                  stroke="#F6F6F6"
                  stroke-width="1.25"
                />
                <path
                  d="M1.6665 10.4169L3.12616 9.13976C3.88555 8.47529 5.03007 8.5134 5.74357 9.22691L9.31835 12.8017C9.89104 13.3744 10.7925 13.4525 11.4552 12.9868L11.7037 12.8121C12.6572 12.142 13.9473 12.2196 14.8136 12.9993L17.4998 15.4169"
                  stroke="#F6F6F6"
                  stroke-width="1.25"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <img
              src={editData?.image}
              className="w-full h-full max-h-[252px]"
              alt=""
            />
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
                d="M31.4355 45.1992V35.5137H38.6855L29 23.4492L19.3145 35.5137H26.5645V45.1992H31.4355ZM16.9355 45.1992H21.75V40.3848H16.9355C14.9342 40.3848 13.2256 39.6673 11.8096 38.2324C10.3936 36.7975 9.68555 35.0983 9.68555 33.1348C9.68555 31.4355 10.318 29.8685 11.583 28.4336C12.848 26.9987 14.3678 26.1302 16.1426 25.8281L17.5586 25.6016L18.0117 24.2422C18.8424 21.75 20.249 19.7865 22.2314 18.3516C24.2139 16.9167 26.4701 16.1992 29 16.1992C30.6615 16.1992 32.2285 16.5202 33.7012 17.1621C35.1738 17.7663 36.4577 18.6159 37.5527 19.7109C38.6478 20.806 39.5163 22.0898 40.1582 23.5625C40.7624 25.0352 41.0645 26.6022 41.0645 28.2637V30.6992H43.5C44.8216 30.6992 45.9544 31.1712 46.8984 32.1152C47.8424 33.0592 48.3145 34.1921 48.3145 35.5137C48.3145 36.8353 47.8424 37.9775 46.8984 38.9404C45.9544 39.9033 44.8216 40.3848 43.5 40.3848H36.25V45.1992H43.5C46.181 45.1992 48.4655 44.2552 50.3535 42.3672C52.2415 40.4792 53.1855 38.1947 53.1855 35.5137C53.1855 33.248 52.487 31.2562 51.0898 29.5381C49.6927 27.82 47.9368 26.6966 45.8223 26.168L45.7656 26.1113C45.5013 24.0345 44.8783 22.1087 43.8965 20.334C42.9525 18.5215 41.7347 16.9544 40.2432 15.6328C38.7516 14.3112 37.043 13.2728 35.1172 12.5176C33.1914 11.7624 31.1523 11.3848 29 11.3848C27.3385 11.3848 25.7337 11.6113 24.1855 12.0645C22.6751 12.5176 21.2686 13.1784 19.9658 14.0469C18.6631 14.9154 17.4831 15.9727 16.4258 17.2188C15.4062 18.4648 14.5755 19.862 13.9336 21.4102C11.3281 22.1654 9.1569 23.6475 7.41992 25.8564C5.68294 28.0654 4.81445 30.4915 4.81445 33.1348C4.81445 34.7962 5.13542 36.3444 5.77734 37.7793C6.41927 39.252 7.28776 40.5358 8.38281 41.6309C9.47786 42.7259 10.7617 43.5944 12.2344 44.2363C13.707 44.8783 15.2741 45.1992 16.9355 45.1992Z"
                fill="#2f4eff0f"
              />
            </svg>
            <div className="w-full text-center ">
              <h1 className="text-[18px] font-[600]">
                Drop your images here, or{" "}
                <span
                  className="text-buttonColor cursor-pointer"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  click to browse
                </span>
              </h1>
              <p className="text-[#5D7186] text-[13px] mt-2">
                64W x 64H recommended. PNG, JPG
              </p>
            </div>
          </>
        )}

        {/* Hidden File Input */}
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect} // Trigger file selection when a file is chosen
        />
      </div>
    </div>
  );
}

export default ImagePicker;
