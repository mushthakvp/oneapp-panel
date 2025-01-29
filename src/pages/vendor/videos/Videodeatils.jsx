import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import DeleteModal from '../../../components/modals/DeleteModal';
import { useDeleteVideo } from '../../../api/useDataController';

function VideoDetails() {
  const data = useLocation().state?.data
  console.log(data);
  
    const navigate = useNavigate()
  const [isDelete, setIsDelete] = useState(false)
   const { mutate, isPending } = useDeleteVideo();
  const handleDelete = () => {
      mutate({ id: data?._id }, {
          onSuccess: () => {
          toast.success('Video deleted successfully')
          navigate(-1)
            setIsDelete(false)
        }
      })
  }
  return (
    <div className="bg-containerWhite rounded-md border border-inputBorder mt-[26px] p-[35px] flex flex-col items-start gap-4 md:flex-row font-urbanist lg:gap-[41px]">
      <DeleteModal
        isOpen={isDelete}
        setIsOpen={setIsDelete}
        handleDelete={handleDelete}
      />
      <video
        src={data?.video}
        // controls
        autoPlay
        muted
        loop
        className="h-[392px] w-full max-w-[392px] rounded-md"
      ></video>
      <div className="w-full">
        <div className="flex justify-end ">
          <div className="flex gap-3 items-center">
            <button
              onClick={() => navigate("/add-videos", { state: { data: data } })}
              className="p-3 px-4 bg-buttonColor text-white rounded-md"
            >
              Edit Details
            </button>
            <button onClick={() => setIsDelete(true)}>
              <svg
                width="43"
                height="43"
                viewBox="0 0 43 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="21.5"
                  cy="21.5"
                  r="21.5"
                  fill="#E31F1F"
                  fill-opacity="0.05"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.682 12.0936H23.317C23.5497 12.0934 23.7523 12.0933 23.9437 12.1238C24.6997 12.2446 25.354 12.7161 25.7076 13.3952C25.7971 13.5671 25.8611 13.7594 25.9345 13.9801L26.0545 14.3401C26.0748 14.4011 26.0806 14.4183 26.0855 14.4319C26.2738 14.9523 26.7618 15.3041 27.3151 15.3181C27.3296 15.3185 27.3475 15.3186 27.412 15.3186H30.637C31.0823 15.3186 31.4433 15.6795 31.4433 16.1248C31.4433 16.5701 31.0823 16.9311 30.637 16.9311H12.3619C11.9166 16.9311 11.5557 16.5701 11.5557 16.1248C11.5557 15.6795 11.9166 15.3186 12.3619 15.3186H15.587C15.6516 15.3186 15.6694 15.3185 15.6839 15.3181C16.2372 15.3041 16.7252 14.9523 16.9135 14.4319C16.9184 14.4182 16.9241 14.4014 16.9445 14.3401L17.0645 13.9801C17.1379 13.7594 17.2019 13.5671 17.2914 13.3952C17.645 12.7161 18.2993 12.2446 19.0553 12.1238C19.2467 12.0933 19.4494 12.0934 19.682 12.0936ZM18.2832 15.3186C18.3386 15.21 18.3876 15.0971 18.4298 14.9804C18.4427 14.945 18.4552 14.9073 18.4714 14.8588L18.5787 14.5369C18.6767 14.2429 18.6992 14.1829 18.7216 14.1399C18.8395 13.9136 19.0576 13.7564 19.3096 13.7162C19.3575 13.7085 19.4215 13.7061 19.7314 13.7061H23.2676C23.5775 13.7061 23.6416 13.7085 23.6894 13.7162C23.9414 13.7564 24.1595 13.9136 24.2774 14.1399C24.2998 14.1829 24.3223 14.2429 24.4203 14.5369L24.5276 14.8586L24.5692 14.9804C24.6114 15.0971 24.6605 15.21 24.7158 15.3186H18.2832Z"
                  fill="#E31F1F"
                />
                <path
                  d="M14.9581 18.7587C14.9285 18.3144 14.5443 17.9782 14.1 18.0079C13.6557 18.0375 13.3196 18.4217 13.3492 18.866L13.8474 26.3391C13.9393 27.718 14.0136 28.8319 14.1877 29.7059C14.3687 30.6146 14.6766 31.3737 15.3126 31.9686C15.9485 32.5636 16.7264 32.8203 17.6451 32.9405C18.5288 33.0561 19.6451 33.0561 21.0271 33.0561H21.9719C23.3539 33.0561 24.4702 33.0561 25.3539 32.9405C26.2727 32.8203 27.0505 32.5636 27.6864 31.9686C28.3224 31.3737 28.6303 30.6146 28.8113 29.7059C28.9854 28.8319 29.0597 27.718 29.1516 26.3391L29.6498 18.866C29.6794 18.4217 29.3433 18.0375 28.899 18.0079C28.4547 17.9782 28.0705 18.3144 28.0409 18.7587L27.5464 26.1752C27.4498 27.6242 27.381 28.6323 27.2299 29.3909C27.0833 30.1267 26.8787 30.5161 26.5848 30.7911C26.2909 31.0661 25.8887 31.2443 25.1448 31.3416C24.3778 31.442 23.3673 31.4436 21.9152 31.4436H21.0838C19.6317 31.4436 18.6212 31.442 17.8543 31.3416C17.1104 31.2443 16.7081 31.0661 16.4142 30.7911C16.1203 30.5161 15.9157 30.1267 15.7691 29.3909C15.618 28.6323 15.5492 27.6242 15.4526 26.1752L14.9581 18.7587Z"
                  fill="#E31F1F"
                />
                <path
                  d="M18.7318 20.6976C19.1749 20.6533 19.57 20.9765 19.6143 21.4196L20.1518 26.7946C20.1961 27.2377 19.8728 27.6328 19.4297 27.6771C18.9867 27.7214 18.5916 27.3981 18.5473 26.9551L18.0098 21.5801C17.9655 21.137 18.2887 20.7419 18.7318 20.6976Z"
                  fill="#E31F1F"
                />
                <path
                  d="M24.2672 20.6976C24.7103 20.7419 25.0336 21.137 24.9893 21.5801L24.4518 26.9551C24.4075 27.3981 24.0124 27.7214 23.5693 27.6771C23.1262 27.6328 22.803 27.2377 22.8473 26.7946L23.3848 21.4196C23.4291 20.9765 23.8242 20.6533 24.2672 20.6976Z"
                  fill="#E31F1F"
                />
              </svg>
            </button>
          </div>
        </div>
        <h1 className="text-[20px] md:text-[34px] lg:text-[44px] font-[500]">
          {data?.title}
        </h1>
        <p className="text-[13px] md:text-[18px] md:mt-[32px]">
          {" "}
          Most Viewed :{" "}
          <span className="text-buttonColor">{data?.views} Viewers</span>
        </p>
        <p className="mt-[20px] md:mt-[38px] mb-2">Products</p>
        {data?.products?.length > 0 &&
          data?.products?.map((item) => {
            console.log(item);
            return (
              <div className="flex flex-wrap items-start">
                {/* content Div */}
                <div className="w-full max-w-[251px] flex rounded-xl overflow-hidden bg-black items-center">
                  <img
                    src={item?.images?.length > 0 && item?.images[0]}
                    className="max-h-[112px] max-w-[82px] w-full"
                    alt=""
                  />
                  <div className="ml-3 flex flex-col gap-2 text-white">
                    <h1 className="text-[14px] font-[500] font-urbanist">
                      {item?.name}
                    </h1>
                    <p className="opacity-50 text-[9px]">Emerson</p>
                    <p className="text-[14px] font-[600] text-buttonColor">
                      INR {item?.price}
                      {/* <span className="text-[#424242] text-[9px] line-through">
                        AED 50
                      </span> */}
                    </p>
                  </div>
                </div>
                {/* content Div */}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default VideoDetails;
