import React, { useEffect, useState } from 'react'
import { useGetVendorCloud, usePurchaseCloud } from '../../../api/useDataController';
import PageNation from '../../../components/pagenation/PageNation';
import ShimmerProductCard from '../../../components/loading/productsShimmer/ShimmerProductCard';
import NodataWithText from '../../../components/nodata/NodataWithText';
import PaymentTypeModal from '../../../components/paymentType/PaymentTypeModal';
import { toast } from 'react-toastify';

function Clouds() {
  const { mutate, isPending } = usePurchaseCloud();
  const [paymentType, setPaymentType] = useState('')
  const [selectCloudId,setSelectedCloudId] = useState('')
  const [page, setPage] = useState(1)
  const { data: cloudData, isLoading } = useGetVendorCloud(page);
  console.log(cloudData?.clouds);
  useEffect(() => {
    if (paymentType) {
      
      mutate({ cloudId: selectCloudId, paymentType: paymentType }, {
        onSuccess: (data) => {
          toast?.success(data?.message);
          setPaymentType('')
          setSelectedCloudId('')
          console.log(data?.url);
          if (data?.url) {
            window.open(data?.url, '_blank');
          }
        }
      }, {
        onError: () => {
          setPaymentType('')
          setSelectedCloudId('')
        }
      });
    }
  },[paymentType])
  return (
    <div className="bg-containerWhite rounded-md border border-inputBorder  p-[35px] font-urbanist">
      <PaymentTypeModal
        open={selectCloudId}
        setOpen={setSelectedCloudId}
        paymentType={paymentType}
        setPaymentType={setPaymentType}
      />
      <div className="w-full text-center">
        <h1 className="text-lg md:text-xl lg:text-4xl relative after:content-[''] after:absolute after:left-[48%]  after:block after:w-[60px] after:h-0.5 after:-bottom-2 after:bg-black">
          Please Purchase Cloud Storage
        </h1>
        <p className="mt-6 text-[13px] md:text-[16px] opacity-60 ">
          Purchase cloud storage to be able to add videos into the app.
        </p>
      </div>
      {/* grid */}
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
                <div className="flex gap-3 items-center">
                  <img
                    src={item?.image}
                    className="max-w-[77px] max-h-[67px] rounded-xl"
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
                <div className="flex flex-col gap-4 mt-[74px]">
                  {item?.specification?.length > 0 &&
                    item?.specification?.map((benifit) => {
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
                <div className="flex items-center justify-center mt-[50px] gap-4 mb-20">
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
                <div className="absolute bottom-0 w-full left-0 flex items-center justify-center mb-5">
                  <button
                    onClick={() => {setSelectedCloudId(item?._id)}}
                    disabled={isPending}
                    className="h-[53px] bg-buttonColor rounded-full text-white mt-[30px] max-w-[90%]  w-full"
                  >
                    {isPending ? "Loading..." : "Buy now"}
                  </button>
                </div>
              </div>
            );
          })}
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => {
            return <ShimmerProductCard />;
          })}
      </div>
      {cloudData?.totalPages > 1 && (
        <div className="flex items-center justify-center w-full mt-10">
          <PageNation totalpage={cloudData?.totalPages} setPage={setPage} />
        </div>
      )}
      {!isLoading && cloudData?.clouds?.length === 0 && (
        <NodataWithText subText={"Cloud"} />
      )}
    </div>
  );
}

export default Clouds
