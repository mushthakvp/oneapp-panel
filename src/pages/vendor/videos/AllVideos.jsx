import React, { useEffect, useState } from "react";
import PageHeading from "../../../components/pageHeding/PageHeading";
import PageNation from "../../../components/pagenation/PageNation";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../components/modals/DeleteModal";
import { useDeleteVideo, useGetVibes } from "../../../api/useDataController";
import NodataWithText from "../../../components/nodata/NodataWithText";
import ShimmerProductCard from "../../../components/loading/productsShimmer/ShimmerProductCard";
import { toast } from "react-toastify";

function AllVideos() {
    const [page, setPage] = useState(1);
  const navigate = useNavigate()
  const { mutate, isPending } = useDeleteVideo();
  
  const [deleteModal,setDeleteModal] = useState('')
  const [openVideoIndex, setOpenVideoIndex] = useState(null);

  const videos = [
    {
      name: "Flash",
      image: "/flash.png",
    },
    {
      name: "Flash",
      image: "/movie3.png",
    },
    {
      name: "Flash",
      image: "/movi2.png",
    },
    {
      name: "Flash",
      image: "/movie3.png",
    },
    {
      name: "Flash",
      image: "/movi2.png",
    },
    {
      name: "Flash",
      image: "/flash.png",
    },
    {
      name: "Flash",
      image: "/flash.png",
    },
    {
      name: "Flash",
      image: "/movi2.png",
    },
  ];
  const { data, isLoading } = useGetVibes(page);
  console.log(data);
  
  const handleToggle = (index) => {
    setOpenVideoIndex(openVideoIndex === index ? null : index);
  };
  const handleDelete = () => {
    mutate({ id: deleteModal }, {
      onSuccess: () => {
        toast.success('Video deleted successfully')
        setDeleteModal('')
    }
  })
}
  return (
    <div className="">
      <DeleteModal isOpen={deleteModal} setIsOpen={setDeleteModal} handleDelete={handleDelete} loading={isPending}/>
      <div className="flex justify-between items-center w-full">
        <PageHeading title={"Videos"} />
        <div className="flex items-center gap-4 text-xs md:text-sm">
          <button
            onClick={() => navigate("/useHistory")}
            className="p-2 bg-nonActiveColor border border-buttonColor rounded-md text-buttonColor max-w-[171px] lg:h-[50px]"
          >
            Storage Usage History
          </button>
          <button
            onClick={() => navigate("/add-videos")}
            className="p-2 flex bg-buttonColor text-white rounded-md max-w-[137px] gap-2 items-center lg:h-[50px]"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
              <path
                d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Add Video
          </button>
        </div>
      </div>
      <div className="bg-containerWhite rounded-md border border-inputBorder mt-[26px] p-[35px]">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px]">
          {data?.vibes?.length > 0 &&
            !isLoading &&
            data?.vibes?.map((item, index) => {
              console.log(item);
              
              return (
                <div key={index} className="relative rounded-md">
                  <div
                    // onClick={() =>
                    //   navigate("/videoDetail", { state: { data: item} })
                    // }
                    className="absolute top-0 bottom-0 left-0 w-full h-full z-10 rounded-md p-4 flex items-end"
                  >
                    <div className="relative w-full">
                      <div
                        className={`hiddenClass absolute right-0 transition-all duration-1000 ease-in-out ${
                          openVideoIndex === index
                            ? "-top-40 opacity-100"
                            : "top-36 opacity-0 hidden"
                        }`}
                      >
                        <Buttons
                          navigate={() =>
                            navigate("/videoDetail", {
                              state: { data: item, curancy: data?.currency },
                            })
                          }
                          editNavigate={() =>
                            navigate("/add-videos", {
                              state: { data: item },
                            })
                          }
                          deleteFunction={() => setDeleteModal(item?._id)}
                        />
                      </div>

                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full bg-white/80 h-[41px] rounded-md flex justify-between items-center pl-4 text-sm"
                      >
                        <h1>{item?.title}</h1>
                        <button
                          onClick={() => handleToggle(index)}
                          className="h-full w-[41px] rounded-md bg-buttonColor flex items-center justify-center"
                        >
                          <svg
                            width="8"
                            height="13"
                            viewBox="0 0 8 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.46217 12.4004L0 10.9387L4.82515 6.19833L0 1.46204L1.46217 0.00039196L7.75 6.19833L1.46217 12.4004Z"
                              fill="white"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <img
                    src={item?.thumpImage}
                    className="w-full h-full rounded-md relative min-h-[296px]"
                    alt=""
                  />
                </div>
              );})}
          {isLoading &&
            Array.from({ length: 4 }, (_, index) => (
              <ShimmerProductCard key={index} />
            ))}
        </div>

        {data?.vibes?.length === 0 && !isLoading && (
          <NodataWithText subText={"Videos"} text={" Video"} />
        )}
        {data?.totalPages > 1 && (
          <div className="w-full flex items-center justify-center mt-10">
            <PageNation totalpage={data?.totalPages} setPage={setPage} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AllVideos;

export const Buttons = ({navigate,editNavigate,deleteFunction}) => {
  return (
    <div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-3">
      <button onClick={()=>navigate()} className="">
        <svg
          width="40"
          height="41"
          viewBox="0 0 40 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="40"
            height="41"
            rx="10"
            fill="white"
            fill-opacity="0.8"
          />
          <path
            d="M12.9802 14.532C12.7249 14.2767 12.3066 14.2841 12.0809 14.5659C10.7788 16.1918 10 18.2549 10 20.5C10 25.7467 14.2533 30 19.5 30C24.7467 30 29 25.7467 29 20.5C29 15.2533 24.7467 11 19.5 11C17.691 11 16.0002 11.5056 14.561 12.3832C14.224 12.5887 14.1878 13.0526 14.4668 13.3317C14.6854 13.5502 15.0274 13.5794 15.2929 13.4212C16.5241 12.6879 17.9629 12.2667 19.5 12.2667C24.0471 12.2667 27.7333 15.9529 27.7333 20.5C27.7333 25.0471 24.0471 28.7333 19.5 28.7333C14.9529 28.7333 11.2667 25.0471 11.2667 20.5C11.2667 18.5846 11.9207 16.8221 13.0176 15.4234C13.2269 15.1564 13.2201 14.7719 12.9802 14.532Z"
            fill="#2F4EFF"
          />
          <path
            d="M19.4995 16.0669C19.8493 16.0669 20.1329 16.3505 20.1329 16.7003C20.1329 17.05 19.8493 17.3336 19.4995 17.3336C19.1498 17.3336 18.8662 17.05 18.8662 16.7003C18.8662 16.3505 19.1498 16.0669 19.4995 16.0669Z"
            fill="#2F4EFF"
          />
          <path
            d="M19.4995 18.2836C19.8493 18.2836 20.1329 18.5671 20.1329 18.9169V25.2503C20.1329 25.6001 19.8493 25.8836 19.4995 25.8836C19.1498 25.8836 18.8662 25.6001 18.8662 25.2503V18.9169C18.8662 18.5671 19.1498 18.2836 19.4995 18.2836Z"
            fill="#2F4EFF"
          />
        </svg>
      </button>
      <button onClick={()=>editNavigate()}>
        <svg
          width="40"
          height="41"
          viewBox="0 0 40 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="40"
            height="41"
            rx="10"
            fill="white"
            fill-opacity="0.8"
          />
          <path
            d="M12.7852 27.2187C12.7586 27.2183 12.7324 27.2126 12.7081 27.2019C12.6837 27.1911 12.6618 27.1756 12.6436 27.1563C12.6254 27.1369 12.6113 27.1141 12.6021 27.0891C12.5929 27.0642 12.5888 27.0377 12.5901 27.0111L12.7977 23.6568C12.7994 23.609 12.8195 23.5637 12.8539 23.5304L24.0593 12.3249C24.2679 12.1168 24.5506 12 24.8452 12C25.1399 12 25.4225 12.1168 25.6311 12.3249L27.4838 14.1855C27.6915 14.3943 27.8081 14.6768 27.8081 14.9714C27.8081 15.2659 27.6915 15.5484 27.4838 15.7573L16.2784 26.9549C16.2449 26.989 16.1997 27.009 16.152 27.0111L12.7977 27.2187H12.7852ZM13.1816 23.7536L12.9928 26.8144L16.0536 26.6271L27.2076 15.4732C27.3424 15.3375 27.418 15.154 27.418 14.9628C27.418 14.7715 27.3424 14.5881 27.2076 14.4524L25.3564 12.6012C25.2207 12.4664 25.0372 12.3908 24.846 12.3908C24.6547 12.3908 24.4713 12.4664 24.3356 12.6012L13.1816 23.7536Z"
            fill="#2F4EFF"
            stroke="#2F4EFF"
            stroke-width="0.4"
          />
          <path
            d="M14.6384 25.3595C14.5998 25.3598 14.5618 25.3487 14.5295 25.3275C14.4972 25.3063 14.4718 25.2759 14.4568 25.2403C14.4417 25.2047 14.4376 25.1654 14.4449 25.1274C14.4523 25.0894 14.4707 25.0545 14.498 25.027L24.1613 15.3668C24.1794 15.3486 24.201 15.3343 24.2247 15.3244C24.2484 15.3146 24.2738 15.3096 24.2994 15.3096C24.3251 15.3096 24.3505 15.3146 24.3742 15.3244C24.3979 15.3343 24.4194 15.3486 24.4376 15.3668C24.4557 15.3849 24.4701 15.4065 24.4799 15.4302C24.4897 15.4539 24.4948 15.4793 24.4948 15.5049C24.4948 15.5306 24.4897 15.556 24.4799 15.5797C24.4701 15.6034 24.4557 15.6249 24.4376 15.6431L14.7774 25.3033C14.7401 25.3393 14.6903 25.3595 14.6384 25.3595Z"
            fill="#2F4EFF"
            stroke="#2F4EFF"
            stroke-width="0.4"
          />
          <path
            d="M25.8677 17.2729C25.8159 17.2729 25.7661 17.2528 25.7288 17.2168L22.5805 14.0669C22.5474 14.0297 22.5298 13.9811 22.5313 13.9313C22.5329 13.8815 22.5534 13.8341 22.5888 13.7989C22.6241 13.7638 22.6716 13.7435 22.7215 13.7422C22.7713 13.741 22.8197 13.7589 22.8568 13.7922L26.0051 16.9405C26.0321 16.9678 26.0505 17.0024 26.0579 17.0401C26.0654 17.0778 26.0615 17.1168 26.0468 17.1523C26.0322 17.1878 26.0073 17.2182 25.9755 17.2397C25.9436 17.2611 25.9061 17.2727 25.8677 17.2729Z"
            fill="#2F4EFF"
            stroke="#2F4EFF"
            stroke-width="0.4"
          />
          <path
            d="M16.2113 26.9351C16.1857 26.9353 16.1603 26.9303 16.1367 26.9203C16.113 26.9104 16.0917 26.8958 16.0739 26.8773L12.9241 23.7291C12.906 23.711 12.8917 23.6896 12.882 23.666C12.8722 23.6425 12.8672 23.6172 12.8672 23.5917C12.8672 23.5662 12.8722 23.5409 12.882 23.5174C12.8917 23.4938 12.906 23.4724 12.9241 23.4544C12.9421 23.4363 12.9635 23.422 12.9871 23.4122C13.0107 23.4025 13.0359 23.3975 13.0614 23.3975C13.0869 23.3975 13.1122 23.4025 13.1358 23.4122C13.1593 23.422 13.1808 23.4363 13.1988 23.4544L16.3471 26.6026C16.3652 26.6206 16.3796 26.642 16.3894 26.6656C16.3992 26.6892 16.4042 26.7144 16.4042 26.74C16.4042 26.7655 16.3992 26.7908 16.3894 26.8144C16.3796 26.8379 16.3652 26.8593 16.3471 26.8773C16.3295 26.8956 16.3084 26.9101 16.285 26.92C16.2617 26.9299 16.2366 26.9351 16.2113 26.9351Z"
            fill="#2F4EFF"
            stroke="#2F4EFF"
            stroke-width="0.4"
          />
          <path
            d="M12.1945 27.8043C12.1689 27.8045 12.1435 27.7995 12.1199 27.7895C12.0963 27.7796 12.075 27.765 12.0572 27.7465C12.0391 27.7286 12.0247 27.7072 12.0149 27.6836C12.0051 27.66 12 27.6347 12 27.6092C12 27.5837 12.0051 27.5584 12.0149 27.5348C12.0247 27.5112 12.0391 27.4898 12.0572 27.4718L12.6441 26.8834C12.6622 26.8652 12.6837 26.8509 12.7075 26.841C12.7312 26.8312 12.7566 26.8262 12.7822 26.8262C12.8079 26.8262 12.8333 26.8312 12.857 26.841C12.8807 26.8509 12.9022 26.8652 12.9203 26.8834C12.9385 26.9015 12.9529 26.9231 12.9627 26.9468C12.9725 26.9705 12.9776 26.9959 12.9776 27.0215C12.9776 27.0472 12.9725 27.0726 12.9627 27.0963C12.9529 27.12 12.9385 27.1415 12.9203 27.1597L12.3319 27.7465C12.3141 27.765 12.2928 27.7796 12.2692 27.7895C12.2455 27.7995 12.2202 27.8045 12.1945 27.8043Z"
            fill="#2F4EFF"
            stroke="#2F4EFF"
            stroke-width="0.4"
          />
          <path
            d="M22.9272 28.0006H17.035C16.9832 28.0006 16.9336 27.98 16.897 27.9434C16.8604 27.9068 16.8398 27.8572 16.8398 27.8055C16.8398 27.7537 16.8604 27.7041 16.897 27.6675C16.9336 27.6309 16.9832 27.6104 17.035 27.6104H22.9272C22.979 27.6104 23.0286 27.6309 23.0652 27.6675C23.1018 27.7041 23.1223 27.7537 23.1223 27.8055C23.1223 27.8572 23.1018 27.9068 23.0652 27.9434C23.0286 27.98 22.979 28.0006 22.9272 28.0006Z"
            fill="#2F4EFF"
            stroke="#2F4EFF"
            stroke-width="0.4"
          />
        </svg>
      </button>
      <button onClick={()=>deleteFunction()}>
        <svg
          width="40"
          height="41"
          viewBox="0 0 40 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="40"
            height="41"
            rx="10"
            fill="#FF7266"
            fill-opacity="0.8"
          />
          <path
            d="M14.9385 13.7505H17.6172V12.4201C17.6172 12.1751 17.7934 12 18.0402 12C18.0402 12 18.0402 12 18.0754 12L22.3402 12.035C22.5516 12.035 22.7279 12.2101 22.7279 12.4201V13.7505H25.2656H26.9574C27.1689 13.7505 27.3451 13.9606 27.3451 14.1707C27.3451 14.3807 27.1689 14.5558 26.9574 14.5558H25.8295V27.0197C25.8295 27.2648 25.7238 27.5098 25.5475 27.7199C25.3713 27.895 25.1246 28 24.8426 28H15.5377C15.2557 28 15.009 27.895 14.8328 27.7199C14.6566 27.5098 14.5156 27.2648 14.5156 27.0197V14.5558H13.423C13.1762 14.5558 13 14.3807 13 14.1707C13 13.9606 13.1762 13.7505 13.423 13.7505H14.5156H14.9385ZM18.4279 13.7505H21.9172V12.8053H18.4279V13.7505ZM22.9393 24.3939C22.9393 24.6039 22.7631 24.779 22.5516 24.779C22.3402 24.779 22.1639 24.6039 22.1639 24.3939V17.3567C22.1639 17.1466 22.3402 16.9716 22.5516 16.9716C22.7631 16.9716 22.9393 17.1466 22.9393 17.3567V24.3939ZM20.5779 24.3939C20.5779 24.6039 20.4016 24.779 20.1902 24.779C19.9434 24.779 19.7672 24.6039 19.7672 24.3939V17.3567C19.7672 17.1466 19.9434 16.9716 20.1902 16.9716C20.4016 16.9716 20.5779 17.1466 20.5779 17.3567V24.3939ZM18.2164 24.3939C18.2164 24.6039 18.0402 24.779 17.7934 24.779C17.582 24.779 17.4057 24.6039 17.4057 24.3939V17.3567C17.4057 17.1466 17.582 16.9716 17.7934 16.9716C18.0402 16.9716 18.2164 17.1466 18.2164 17.3567V24.3939ZM25.0541 14.5558H18.0402H15.3262V27.0197C15.3262 27.0547 15.3262 27.1247 15.3967 27.1597C15.432 27.1947 15.4672 27.1947 15.5377 27.1947H24.8426C24.8779 27.1947 24.9484 27.1947 24.9836 27.1597C25.0189 27.1247 25.0541 27.0547 25.0541 27.0197V14.5558Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
};
