import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PageNation from '../../../components/pagenation/PageNation';
import CloudsTable from './CloudsTable';
import VendorSearch from './VendorSearch';
import CloudType from './CloudType';
import { useDeleteCloud, useGetAdminCloud, useGetAdminUsageHistory } from '../../../api/useDataControllerAdmin';
import DeleteModal from '../../../components/modals/DeleteModal';
import { toast } from 'react-toastify';
import NodataWithText from '../../../components/nodata/NodataWithText';


function Clouds() {
  const [selected, setSelected] = useState("Clouds");
  const { mutate, isPending } = useDeleteCloud();
  const [deleteId,setDeleteId] =useState('')
    const [type,setType] = useState('')
    const [page,setPage]=useState()
    const navigate = useNavigate()
 
  const { data: cloudData, isLoading } = useGetAdminCloud(page);
  // const { data, isLoading: tableLoading } = useGetAdminUsageHistory(page);
  // console.log(data);
  const handelDelete = () => {
 
    mutate({ id: deleteId }, {

      onSuccess: () => {
        toast.success('Cloud deleted successfully')
      setDeleteId('')
    }})
  }
  return (
    <div>
      <div className="flex items-center justify-end mb-7">
        <DeleteModal
          isLoading={isPending}
          isOpen={deleteId}
          setIsOpen={setDeleteId}
          handleDelete={handelDelete}
        />
        {/* <div className="flex items-center ">
          <button
            onClick={() => {
              setPage(1);
              setSelected("Clouds");
            }}
            className={`w-[128px] h-[48px] flex items-center justify-center ${
              selected === "Clouds"
                ? "bg-buttonColor text-white"
                : "bg-nonActiveColor"
            }`}
          >
            Clouds
          </button>
          <button
            onClick={() => {
              setPage(1);
              setSelected("CloudUsage");
            }}
            className={`w-[128px] h-[48px] flex items-center justify-center ${
              selected === "CloudUsage"
                ? "bg-buttonColor text-white"
                : "bg-nonActiveColor"
            }`}
          >
            Cloud Usage
          </button>
        </div> */}
        <button
          onClick={() => navigate("/admin/add-clouds")}
          className="flex items-center gap-2 p-3 px-4 bg-buttonColor rounded-xl text-white"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="white" stroke-width="1.5" />
            <path
              d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          Add Cloud
        </button>
      </div>

      <div className="bg-containerWhite rounded-md border border-inputBorder  p-[35px] font-urbanist">
        {/* grid */}
        {selected === "Clouds" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[38px] mt-[45px]">
            {cloudData?.clouds?.length > 0 &&
              cloudData?.clouds?.map((item, index) => {
                return (
                  <div
                    style={{
                      background: `linear-gradient(180deg, #F7F8FA 0%, #E2E6FC 100%)`,
                    }}
                    id={index}
                    className="px-[27px] p-[28px] rounded-xl relative"
                  >
                    <button
                      onClick={() => setDeleteId(item?._id)}
                      className="absolute right-3 top-4"
                    >
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="17.51"
                          cy="17.51"
                          r="17.51"
                          fill="#D42B2B"
                          fill-opacity="0.1"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M16.2908 9.66875H19.0692C19.247 9.66863 19.4019 9.66854 19.5482 9.69189C20.1261 9.78417 20.6261 10.1446 20.8964 10.6636C20.9648 10.795 21.0137 10.942 21.0698 11.1107L21.1616 11.3859C21.1771 11.4325 21.1815 11.4456 21.1853 11.456C21.3292 11.8538 21.7022 12.1227 22.1251 12.1334C22.1362 12.1337 22.1498 12.1338 22.1992 12.1338H24.6642C25.0045 12.1338 25.2804 12.4097 25.2804 12.75C25.2804 13.0904 25.0045 13.3663 24.6642 13.3663H10.6958C10.3554 13.3663 10.0795 13.0904 10.0795 12.75C10.0795 12.4097 10.3554 12.1338 10.6958 12.1338H13.1608C13.2102 12.1338 13.2238 12.1337 13.2349 12.1334C13.6578 12.1227 14.0308 11.8538 14.1747 11.4561C14.1785 11.4456 14.1829 11.4327 14.1985 11.3859L14.2902 11.1107C14.3463 10.942 14.3952 10.795 14.4636 10.6636C14.7339 10.1446 15.234 9.78417 15.8118 9.69189C15.9581 9.66854 16.113 9.66863 16.2908 9.66875ZM15.2216 12.1338C15.264 12.0508 15.3015 11.9645 15.3337 11.8753C15.3435 11.8482 15.3531 11.8194 15.3655 11.7823L15.4475 11.5363C15.5224 11.3116 15.5397 11.2657 15.5568 11.2329C15.6469 11.0599 15.8135 10.9397 16.0062 10.909C16.0428 10.9031 16.0917 10.9013 16.3286 10.9013H19.0314C19.2683 10.9013 19.3173 10.9031 19.3539 10.909C19.5465 10.9397 19.7132 11.0599 19.8033 11.2329C19.8204 11.2657 19.8376 11.3116 19.9125 11.5363L19.9945 11.7822L20.0263 11.8753C20.0586 11.9645 20.0961 12.0508 20.1384 12.1338H15.2216Z"
                          fill="#D42B2B"
                        />
                        <path
                          d="M12.6802 14.7632C12.6575 14.4236 12.3639 14.1667 12.0243 14.1893C11.6847 14.2119 11.4278 14.5056 11.4504 14.8452L11.8312 20.5572C11.9015 21.6112 11.9582 22.4625 12.0913 23.1306C12.2297 23.8252 12.465 24.4053 12.9511 24.8601C13.4372 25.3149 14.0317 25.5111 14.7339 25.6029C15.4094 25.6913 16.2626 25.6913 17.3189 25.6913H18.0411C19.0974 25.6913 19.9507 25.6913 20.6261 25.6029C21.3283 25.5111 21.9228 25.3149 22.4089 24.8601C22.895 24.4053 23.1304 23.8252 23.2687 23.1306C23.4018 22.4625 23.4586 21.6112 23.5288 20.5572L23.9096 14.8452C23.9323 14.5056 23.6753 14.2119 23.3357 14.1893C22.9961 14.1667 22.7025 14.4236 22.6799 14.7632L22.3019 20.432C22.2281 21.5394 22.1755 22.31 22.06 22.8898C21.948 23.4522 21.7916 23.7499 21.5669 23.9601C21.3423 24.1702 21.0348 24.3065 20.4662 24.3808C19.8801 24.4575 19.1077 24.4588 17.9977 24.4588H17.3623C16.2523 24.4588 15.48 24.4575 14.8938 24.3808C14.3252 24.3065 14.0178 24.1702 13.7931 23.9601C13.5685 23.7499 13.4121 23.4522 13.3 22.8898C13.1845 22.31 13.1319 21.5394 13.0581 20.432L12.6802 14.7632Z"
                          fill="#D42B2B"
                        />
                        <path
                          d="M15.5645 16.2452C15.9032 16.2113 16.2052 16.4584 16.239 16.797L16.6499 20.9054C16.6837 21.244 16.4367 21.546 16.098 21.5799C15.7593 21.6137 15.4574 21.3667 15.4235 21.028L15.0127 16.9197C14.9788 16.581 15.2259 16.279 15.5645 16.2452Z"
                          fill="#D42B2B"
                        />
                        <path
                          d="M19.7955 16.2452C20.1342 16.279 20.3812 16.581 20.3474 16.9197L19.9365 21.028C19.9027 21.3667 19.6007 21.6137 19.262 21.5799C18.9234 21.546 18.6763 21.244 18.7102 20.9054L19.121 16.797C19.1549 16.4584 19.4568 16.2113 19.7955 16.2452Z"
                          fill="#D42B2B"
                        />
                      </svg>
                    </button>
                    <div className="flex gap-3 items-center">
                      <img
                        src={item?.image}
                        className="max-w-[77px] max-h-[67px] rounded-lg"
                        alt=""
                      />
                      <div>
                        <h1 className="text-[14px] md:text-[18px] max-w-[90%] font-[600]">
                          {item?.name}
                        </h1>
                        <p className="p-2 px-3 justify-center text-[9px] md:text-[13px] lg:text-[15px] flex bg-buttonColor text-white rounded-xl">
                          ${item?.price}
                        </p>
                      </div>
                    </div>
                    {/* benefits */}
                    <div className="flex flex-col gap-4 mt-[74px] mb-24">
                      {item?.specification?.map((benifit) => {
                        return (
                          <div className="flex items-center gap-2 text-[12px]">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M7 0C10.8657 0 14 3.13428 14 7C14 10.8657 10.8657 14 7 14C3.13428 14 0 10.8657 0 7C0 3.13428 3.13428 0 7 0ZM4.49805 6.47022C5.02214 6.77214 5.36279 7.02279 5.76953 7.47054C6.82227 5.77523 7.96615 4.83643 9.45182 3.50228L9.59766 3.44645H11.2246C9.04395 5.86865 7.35205 7.86589 5.83789 10.7871C5.04948 9.10205 4.34652 7.9388 2.77539 6.85986L4.49805 6.47022Z"
                                fill="#3AAF3C"
                              />
                            </svg>
                            <p className="opacity-60 "> {benifit}</p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="absolute bottom-0 w-full left-0 flex items-center justify-center mb-5">
                      <div className="flex items-center justify-center mt-[50px] gap-4">
                        <h1 className="text-[18px]">
                          {item?.storage} {item?.unit} Storage
                        </h1>
                        <svg
                          width="81"
                          height="81"
                          viewBox="0 0 81 81"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M81 40.5C81 62.8675 62.8675 81 40.5 81C18.1325 81 0 62.8675 0 40.5C0 18.1325 18.1325 0 40.5 0C62.8675 0 81 18.1325 81 40.5ZM7.96785 40.5C7.96785 58.467 22.533 73.0322 40.5 73.0322C58.467 73.0322 73.0322 58.467 73.0322 40.5C73.0322 22.533 58.467 7.96785 40.5 7.96785C22.533 7.96785 7.96785 22.533 7.96785 40.5Z"
                            fill="#5C70E1"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M39.9783 37.4273C42.329 38.8869 44.4526 39.5774 46.2752 39.4137C46.5936 45.7213 44.216 49.4459 40.0027 51C35.9341 49.5454 33.5276 45.981 33.7058 39.3182C35.8457 39.4282 37.9445 38.975 39.9783 37.4273ZM45.2702 35.2041C45.1118 35.2807 44.9508 35.3658 44.7924 35.4548C44.3165 35.7284 43.8463 36.0622 43.3664 36.4458L42.3422 35.2976C42.6956 34.9762 43.0785 34.6837 43.4847 34.425C43.8082 34.2176 44.1469 34.033 44.4963 33.8758C44.636 33.8072 44.7756 33.743 44.9193 33.6828C44.2444 32.5117 43.273 31.672 42.1731 31.1541C41.0726 30.6377 39.8412 30.4387 38.6417 30.5526C37.4504 30.6651 36.2931 31.0894 35.3369 31.8172C34.2304 32.6565 33.3899 33.9131 33.0665 35.5772L32.9649 36.0975L32.4358 36.1886C31.9173 36.2776 31.4542 36.4 31.0479 36.5557C30.6543 36.705 30.3029 36.8895 29.9962 37.1069C29.751 37.281 29.5392 37.4761 29.3594 37.6875C28.8029 38.3402 28.5449 39.159 28.551 39.9883C28.5662 42.0195 29.9546 43.5995 31.9726 43.8746H32.0336C32.1448 44.4054 32.2748 44.9139 32.4226 45.4004H31.9472L31.8497 45.3919C31.2851 45.3213 30.7727 45.191 30.3075 45.0024C28.2778 44.1791 27.0159 42.124 27.0001 39.9923C26.992 38.8192 27.3642 37.6522 28.1686 36.707C28.4286 36.4 28.7353 36.1184 29.0862 35.8697C29.495 35.5792 29.9627 35.3349 30.4913 35.1339C30.8554 34.9946 31.2449 34.8787 31.6552 34.7857C32.1204 32.9739 33.1132 31.5789 34.3888 30.6109C35.5822 29.7049 37.0188 29.1766 38.4975 29.0378C39.9702 28.8985 41.4855 29.1433 42.8459 29.7835C44.3287 30.4825 45.6236 31.6451 46.4641 33.2808C46.8023 33.2286 47.141 33.2017 47.4772 33.2057C48.899 33.2161 50.2701 33.7141 51.3492 34.8538C51.5757 35.0921 51.7895 35.3618 51.9906 35.6622C52.6675 36.6821 53.0144 38.0442 52.9996 39.3764C52.9849 40.6848 52.6249 41.9862 51.8885 42.9438C51.4086 43.5677 50.7927 44.0776 50.0543 44.482C49.3611 44.8616 48.5558 45.1531 47.6534 45.3631C47.8179 44.8228 47.9581 44.2577 48.0723 43.6672C48.5182 43.5234 48.9254 43.3528 49.2906 43.1533C49.8471 42.8488 50.3021 42.4777 50.6424 42.032C51.1715 41.3415 51.432 40.3654 51.4427 39.364C51.4554 38.3133 51.1928 37.2582 50.683 36.4915C50.5425 36.2784 50.3831 36.0778 50.2067 35.8921C49.4429 35.0862 48.474 34.7335 47.4665 34.7275C46.7408 34.721 45.9857 34.8931 45.2702 35.2041ZM40.0469 39.6247C41.6368 40.6117 43.0724 41.0788 44.3054 40.9684C44.5202 45.2327 42.9124 47.7515 40.0641 48.8027C40.0458 48.7962 40.0281 48.7897 40.0103 48.7828V39.652L40.0469 39.6247ZM39.9813 38.4521C42.0446 39.7336 43.9083 40.3395 45.5084 40.1963C45.5952 45.6068 43.5954 48.5425 40.0027 49.9747C36.5363 48.639 34.4431 45.8904 34.4756 40.1122C36.3535 40.2087 38.1959 39.8107 39.9813 38.4521Z"
                            fill="#6F6969"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
        {/* {selected === "CloudUsage" && (
          <div className='overflow-y-auto'>
            {" "}
            <div className="flex items-center gap-4 w-full overflow-y-auto">
              <VendorSearch />
              <div className="w-full max-w-[270px]">
                <CloudType selected={type} setSelected={setType} />
              </div>
            </div>
            <CloudsTable data={data}/>{" "}
          </div>
        )}
        {selected === "CloudUsage" && data?.totalPages>1 && (
          <div className="flex items-center justify-center w-full mt-10">
            <PageNation
              totalpage={data?.totalPages}
              page={page}
              setPage={setPage}
            />
          </div>
        )} */}
        {cloudData?.clouds?.length === 0 && !isLoading && (
          <NodataWithText subText={"Cloud"} text={"Cloud"} />
        )}
        {selected === "Clouds" && cloudData?.totalPages > 1 && (
          <div className="flex items-center justify-center w-full mt-10">
            <PageNation
              totalpage={cloudData?.totalPages}
              page={page}
              setPage={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Clouds
