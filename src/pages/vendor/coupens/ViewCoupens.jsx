import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeading from '../../../components/pageHeding/PageHeading';
import { useAddCoupon, useGetVendorCoupon } from '../../../api/useDataController';
import PageNation from '../../../components/pagenation/PageNation';
import Nodata from '../../../components/nodata/Nodata';
import Descriptions from '../../../components/modals/Descriptions';
import CreateCoupon from './CreateCoupon';
import TableShimmer from '../../../components/loading/shimmer/TableShimmer';
import DeleteModal from '../../admin/vendors/modals/DeleteModal';
import { toast } from 'react-toastify';
import EmptyScreen from '../products/EmptyProductsScreen';


function ViewCoupons() {

  const { mutate, error: deleteError, isPending } = useAddCoupon();
  const navigate = useNavigate();

  const [page, setPage] = React.useState(1)
  const [totalPage, setTotalPage] = React.useState(1)
  const [open, setOpen] = React.useState(false);
  const [editData, setEditData] = React.useState({})
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState('')
  const [openDescription, setOpenDescription] = React.useState(false);
  const [description, setDescription] = React.useState('')
  const { data, isLoading, error } = useGetVendorCoupon(page);
  const [hover, setHover] = React.useState(false);

  const handleDelete = () => {
    mutate({ id: deleteId, action: 'delete' }, {
      onSuccess: (data) => {
        toast.success("Coupon Deleted Successfully");

        setDeleteId('')
        setDeleteOpen(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  }

  useEffect(() => { setTotalPage(data?.totalPage); }, [data])


  return (
    <>
      <CreateCoupon
        isOpen={open}
        setIsOpen={setOpen}
        editData={editData}
        setEditData={setEditData}
      />
      <Descriptions
        open={openDescription}
        setOpen={setOpenDescription}
        descriptions={description}
      />
      <DeleteModal
        isOpen={deleteOpen}
        loading={isPending}
        setIsOpen={setDeleteOpen}
        handleDelete={handleDelete}
      />
      <PageHeading title="Coupons" />

      <div className="mt-[24px] p-5 sm:p-[26px] rounded-lg border border-naveBorder bg-containerWhite flex flex-col gap-[16px] w-full font-urbanist overflow-y-auto">
        <div className="flex items-center justify-between">
          <h1 className="ext-[18px] font-[600] leading-[21.6px]">
            All Coupons List
          </h1>
          <button
            onClick={() => {
              setEditData("");
              setOpen(true);
            }}
            className="bg-buttonColor text-white p-2 rounded-md"
          >
            Create Coupon
          </button>
        </div>

        <table className="w-full min-w-[700px] text-left font-urbanist capitalize">
          <thead className="bg-[#F8FAFC] h-10 text-left font-[600] text-[14px] leading-[16.8px]">
            <th className="px-2 pl-4 rounded-l-lg">Coupon Name</th>
            <th className="px-1 pl-4">Description</th>
            <th className="px-1 pl-4">Min. Price</th>
            <th className="px-1 ">No:of Times user use</th>
            <th className="px-1 pl-4">Maximum User</th>
            <th className="px-1 pl-4 ">Discount</th>
            <th className="px-1 pl-4 ">Start Date</th>
            <th className="px-1 pl-4 ">End Date</th>
            <th className="px-1 pl-4 rounded-r-lg">Action</th>
          </thead>
          {isLoading ? (
            <TableShimmer columnCount={9} rowCount={13} />
          ) : (
            <tbody className="text-left font-[500] text-[14px] leading-[16.8px]">
              {data?.coupon?.length > 0 ? (
                data?.coupon?.map((item, index) => (
                  <tr
                    className="h-[84px] border-b border-b-inputBorder cursor-pointer"
                    onClick={() =>
                      navigate("/coupon-detail", {
                        state: { couponId: item?._id },
                      })
                    }
                  >
                    <td className="px-2 pl-4">{item?.couponName}</td>
                    <td
                      onClick={(e) => {
                        e.stopPropagation();
                        setDescription(item?.description);
                        setOpenDescription(true);
                      }}
                      className="p-5 pl-4 underline cursor-pointer"
                    >
                      {
                        item?.description &&
                        item?.description
                          .split(" ") // Split the description by period (.)
                          .slice(0, 2) // Get the first two sentences
                          .join(".") + // Join them back together with a period
                        (item?.description.split(".").length > 1
                          ? "..."
                          : "") // Add "..." if there are more than two sentences
                      }
                    </td>
                    <td className="px-2 pl-4">{item?.minimumPrice}</td>
                    <td className="px-2 pl-4">{item?.useCountPerUser}</td>
                    <td className="px-2 pl-4 ">{item?.maximumUsers}</td>
                    <td className="px-2 pl-4">{item?.discount}</td>
                    <td className="px-2 pl-4">
                      {item?.startDate && item?.startDate.split("T")[0]}
                    </td>
                    <td className="px-2 pl-4">
                      {item?.startDate && item?.endDate.split("T")[0]}
                    </td>
                    <td className="px-2 pl-4">
                      <div className="flex gap-2 items-center">
                        <button
                          handleHover={() => setHover(true)}
                          handleLeave={() => setHover(false)}
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditData(item);
                            setOpen(true);
                          }}
                        >
                          {!hover ? (
                            <svg
                              className="svg-icon"
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="20"
                                cy="20"
                                r="20"
                                fill="#FF6C2F"
                                fill-opacity="0.1"
                              />
                              <path
                                d="M27.2271 16.9757L23.0244 12.773M27.2271 16.9757L21.9753 22.2274C21.2832 22.9194 20.4432 23.4658 19.4788 23.6321C18.505 23.8001 17.2966 23.856 16.7203 23.2797C16.144 22.7034 16.1999 21.4949 16.3679 20.5212C16.5342 19.5568 17.0806 18.7168 17.7726 18.0247L23.0244 12.773M27.2271 16.9757C27.2271 16.9757 30.379 13.8237 28.2776 11.7223C26.1763 9.621 23.0244 12.773 23.0244 12.773M28.8614 19.9307C28.8614 26.7601 26.7601 28.8614 19.9307 28.8614C13.1013 28.8614 11 26.7601 11 19.9307C11 13.1013 13.1013 11 19.9307 11"
                                stroke="#FF6C2F"
                                stroke-width="1.11071"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="svg-icon"
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="20"
                                cy="20"
                                r="20"
                                fill="#2f4eff0f"
                                fill-opacity="0.1"
                              />
                              <path
                                d="M27.2271 16.9757L23.0244 12.773M27.2271 16.9757L21.9753 22.2274C21.2832 22.9194 20.4432 23.4658 19.4788 23.6321C18.505 23.8001 17.2966 23.856 16.7203 23.2797C16.144 22.7034 16.1999 21.4949 16.3679 20.5212C16.5342 19.5568 17.0806 18.7168 17.7726 18.0247L23.0244 12.773M27.2271 16.9757C27.2271 16.9757 30.379 13.8237 28.2776 11.7223C26.1763 9.621 23.0244 12.773 23.0244 12.773M28.8614 19.9307C28.8614 26.7601 26.7601 28.8614 19.9307 28.8614C13.1013 28.8614 11 26.7601 11 19.9307C11 13.1013 13.1013 11 19.9307 11"
                                stroke="white"
                                stroke-width="1.11071"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteId(item?._id);
                            setDeleteOpen(true);
                          }}
                        >
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="20"
                              cy="20"
                              r="20"
                              fill="#EF5F5F"
                              fill-opacity="0.1"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M18.3094 11.25H21.6908C21.9072 11.2499 22.0957 11.2498 22.2737 11.2782C22.977 11.3905 23.5856 11.8291 23.9146 12.4608C23.9978 12.6207 24.0573 12.7996 24.1256 13.0049L24.2373 13.3398C24.2562 13.3965 24.2616 13.4126 24.2661 13.4252C24.4413 13.9093 24.8953 14.2366 25.4099 14.2496C25.4235 14.25 25.44 14.25 25.5001 14.25H28.5001C28.9143 14.25 29.2501 14.5858 29.2501 15C29.2501 15.4143 28.9143 15.75 28.5001 15.75H11.5C11.0858 15.75 10.75 15.4143 10.75 15C10.75 14.5858 11.0858 14.25 11.5 14.25H14.5001C14.5601 14.25 14.5767 14.25 14.5902 14.2496C15.1049 14.2366 15.5589 13.9094 15.734 13.4252C15.7386 13.4125 15.7439 13.3968 15.7629 13.3398L15.8745 13.005C15.9428 12.7996 16.0023 12.6207 16.0856 12.4608C16.4145 11.8291 17.0231 11.3905 17.7264 11.2782C17.9044 11.2498 18.093 11.2499 18.3094 11.25ZM17.0082 14.25C17.0597 14.149 17.1053 14.044 17.1446 13.9355C17.1565 13.9025 17.1682 13.8674 17.1832 13.8223L17.283 13.5229C17.3742 13.2494 17.3952 13.1936 17.416 13.1536C17.5257 12.9431 17.7285 12.7969 17.963 12.7594C18.0075 12.7523 18.067 12.75 18.3553 12.75H21.6448C21.9331 12.75 21.9927 12.7523 22.0372 12.7594C22.2716 12.7969 22.4745 12.9431 22.5842 13.1536C22.605 13.1936 22.626 13.2494 22.7171 13.5229L22.8169 13.8222L22.8556 13.9355C22.8949 14.0441 22.9405 14.149 22.992 14.25H17.0082Z"
                              fill="#EF5F5F"
                            />
                            <path
                              d="M13.9151 17.4501C13.8875 17.0369 13.5302 16.7241 13.1169 16.7517C12.7036 16.7793 12.3909 17.1366 12.4184 17.5499L12.8819 24.5017C12.9674 25.7844 13.0364 26.8205 13.1984 27.6336C13.3668 28.4789 13.6532 29.185 14.2448 29.7385C14.8364 30.2919 15.5599 30.5308 16.4146 30.6425C17.2366 30.7501 18.275 30.7501 19.5606 30.75H20.4395C21.7251 30.7501 22.7635 30.7501 23.5856 30.6425C24.4402 30.5308 25.1638 30.2919 25.7554 29.7385C26.347 29.185 26.6334 28.4789 26.8018 27.6336C26.9638 26.8206 27.0328 25.7844 27.1183 24.5017L27.5818 17.5499C27.6093 17.1366 27.2966 16.7793 26.8833 16.7517C26.47 16.7241 26.1126 17.0369 26.0851 17.4501L25.6251 24.3493C25.5353 25.6971 25.4713 26.6349 25.3307 27.3406C25.1943 28.025 25.004 28.3873 24.7306 28.6431C24.4572 28.8989 24.083 29.0647 23.391 29.1552C22.6776 29.2485 21.7376 29.25 20.3868 29.25H19.6134C18.2626 29.25 17.3226 29.2485 16.6092 29.1552C15.9172 29.0647 15.543 28.8989 15.2696 28.6431C14.9962 28.3873 14.8058 28.025 14.6695 27.3406C14.5289 26.6349 14.4649 25.6971 14.375 24.3493L13.9151 17.4501Z"
                              fill="#EF5F5F"
                            />
                            <path
                              d="M17.4255 19.2538C17.8376 19.2125 18.2052 19.5133 18.2464 19.9254L18.7464 24.9254C18.7876 25.3376 18.4869 25.7051 18.0747 25.7463C17.6626 25.7875 17.295 25.4868 17.2538 25.0747L16.7538 20.0747C16.7126 19.6625 17.0133 19.295 17.4255 19.2538Z"
                              fill="#EF5F5F"
                            />
                            <path
                              d="M22.5747 19.2538C22.9869 19.295 23.2876 19.6625 23.2464 20.0747L22.7464 25.0747C22.7052 25.4868 22.3376 25.7875 21.9255 25.7463C21.5133 25.7051 21.2126 25.3376 21.2538 24.9254L21.7538 19.9254C21.795 19.5133 22.1626 19.2125 22.5747 19.2538Z"
                              fill="#EF5F5F"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))) : (
                <tr>
                  <td colSpan="9" className="h-[84px] text-center font-[500] text-gray-500">
                    {/* No orders available */}
                    <EmptyScreen first='No coupons' second='Please check back later' />
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
        {/* {data?.coupon?.length === 0 && !isLoading && <Nodata />} */}
        {totalPage > 1 && (
          <PageNation setPage={setPage} totalpage={totalPage} />
        )}
      </div>
    </>
  );
}

export default ViewCoupons;
