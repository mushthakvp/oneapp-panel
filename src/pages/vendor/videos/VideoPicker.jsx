import React, { useRef, useState } from "react";

function VideoPicker({ formData, setFormData, prev, setPrev }) {
  const fileInputRef = useRef(null);

  const [error, setError] = useState("");

  const validateVideo = (file) => {
    // Check file type
    // const validTypes = ["video/mp4", "video/webm", "video/ogg"];
    // if (!validTypes.includes(file.type)) {
    //   setError("Please select MP4, WebM, or OGG video files only");
    //   return false;
    // }

    // Check file size (100MB max)
    // const maxSize = 100 * 1024 * 1024; // 100MB in bytes
    // if (file.size > maxSize) {
    //   setError("Video size should be less than 100MB");
    //   return false;
    // }

    setError("");
    return true;
  };

  const handleVideoClick = () => {
    fileInputRef.current.click();
  };

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (validateVideo(file)) {
        const videoUrl = URL.createObjectURL(file);
        setFormData((prev) => ({
          ...prev,
          video: file,
        }));
        setPrev(videoUrl);
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      if (validateVideo(file)) {
        const videoUrl = URL.createObjectURL(file);
        setFormData((prev) => ({
          ...prev,
          video: file,
        }));
        setPrev(videoUrl);
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="w-full">
      <p>Add Video</p>
      <div
        className={`h-[252px] mt-2 group border-dashed border-2 rounded-md w-full flex flex-col items-center justify-center gap-3 relative overflow-hidden ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {prev ? (
          <div className="absolute inset-0 w-full h-full">
            <video
              src={prev}
              className="w-full h-full object-contain"
              controls
            />

            <button
              onClick={handleVideoClick}
              className="bg-white/80 text-buttonColor px-4 py-2 rounded-md text-sm absolute left-[40%] top-[40%] group-hover:opacity-100 opacity-0"
            >
              Change Video
            </button>
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
                d="M4.8335 29C4.8335 17.6077 4.8335 11.9116 8.37262 8.37247C11.9117 4.83334 17.6079 4.83334 29.0002 4.83334C40.3924 4.83334 46.0886 4.83334 49.6277 8.37247C53.1668 11.9116 53.1668 17.6077 53.1668 29C53.1668 40.3923 53.1668 46.0884 49.6277 49.6275C46.0886 53.1667 40.3924 53.1667 29.0002 53.1667C17.6079 53.1667 11.9117 53.1667 8.37262 49.6275C4.8335 46.0884 4.8335 40.3923 4.8335 29Z"
                stroke={error ? "#EF4444" : "#2F4EFF"}
                strokeWidth="2"
              />
              <path
                d="M51.9582 19.3333H6.0415"
                stroke={error ? "#EF4444" : "#2F4EFF"}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M25.3748 6.04166L16.9165 19.3333"
                stroke={error ? "#EF4444" : "#2F4EFF"}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M41.0833 6.04166L32.625 19.3333"
                stroke={error ? "#EF4444" : "#2F4EFF"}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M36.2498 35.0417C36.2498 33.511 34.65 32.4788 31.4503 30.4142C28.2068 28.3215 26.5851 27.2752 25.3758 28.0434C24.1665 28.8117 24.1665 30.8884 24.1665 35.0417C24.1665 39.195 24.1665 41.2716 25.3758 42.0399C26.5851 42.8082 28.2068 41.7618 31.4503 39.6691C34.65 37.6045 36.2498 36.5723 36.2498 35.0417Z"
                stroke={error ? "#EF4444" : "#2F4EFF"}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center text-[14px] md:text-[20px]">
              <h1>
                Drop your Video here, or{" "}
                <span
                  className="cursor-pointer text-buttonColor"
                  onClick={handleVideoClick}
                >
                  click to browse
                </span>
              </h1>
              {/* <p className="text-[#5D7186] text-[12px]">
                MP4, WebM, OGG formats supported (max 100MB)
              </p> */}
            </div>
          </>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="video/mp4,video/webm,video/ogg"
          onChange={handleVideoChange}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

export default VideoPicker;
