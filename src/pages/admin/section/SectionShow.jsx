import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PageHeading from '../../../components/pageHeding/PageHeading';
import category from '../../../assets/category/category.png';
import { useAddAdminSection, useGetSection } from '../../../api/useDataControllerAdmin';
import PageNation from '../../../components/pagenation/PageNation';
import TableShimmer from '../../../components/loading/shimmer/TableShimmer';
import { Rtt } from '@mui/icons-material';
import NodataWithText from '../../../components/nodata/NodataWithText';
import { convertUTCToLocal } from '../../../utils/dateFormate';
import { Delete } from 'lucide-react';
import DeleteModal from '../../../components/modals/DeleteModal';
import { toast } from 'react-toastify';
function SectionShow() {
  const navigate = useNavigate();
  const [EditLeaveIcon, setEditLevelIcon] = React.useState(false);
  const [deleteId, setDeleteId] = useState('')
  const [deleteOpen,setDeleteOpen] = useState(false);
   const [deleteLeaveIcon, setDeleteLevelIcon] = React.useState(false);
  const [page,setPage] = React.useState(1);
  const { data, isLoading, error } = useGetSection(page);
  const {mutate:deleteSection} = useAddAdminSection();
  console.log(data);
  console.log(error);
  const handleDelete = () => {
    deleteSection({ status: "delete", id:deleteId }, {
      onSuccess: () => {
        toast.success("Section deleted successfully");
        setDeleteOpen(false);
      },
    });
  }
  return (
    <div>
      <PageHeading title="Category" />
      <div className="bg-containerWhite mt-[15px] p-[22px] rounded-md min-w-[750px] overflow-x-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-[18px] font-[600]">All Categories List</h1>
          <button
            onClick={() => navigate("/admin/add-section")}
            className="text-[14px] rounded-md text-white bg-buttonColor flex items-center justify-center p-2 px-4"
          >
            Create Section
          </button>
        </div>
        {/* table  */}

        <table className="text-left w-full mt-4 min-w-[700px] mb-5">
          <thead className="bg-[#F8FAFC] rounded-r-lg">
            <th className="text-[14px] px-3 p-2 font-[14px] opacity-60 ">
              Section
            </th>
            <th className="text-[14px] px-3 p-2 font-[14px] opacity-60 ">
              Created Date
            </th>
            <th className="text-[14px] px-3 p-2 font-[14px] opacity-60 rounded-r-lg">
              Action
            </th>
          </thead>

          {isLoading ? (
            <TableShimmer columnCount={3} rowCount={5} />
          ) : (
            <tbody>
              {data?.sections?.length > 0 &&
                data?.sections?.map((data, index) => {
                  console.log(data);
                  return (
                    <tr className="border-b border-inputBorder py-3">
                      <td className="text-[14px] px-3 p-2 font-[14px] w-[33%]">
                        <div className="flex items-center gap-3">
                          <img
                            src={data?.image}
                            className="w-[42px] h-[42px]"
                            alt=""
                          />
                          {data?.name}
                        </div>
                      </td>

                      <td className="text-[14px] px-3 p-2 font-[14px] w-[33%]">
                        {convertUTCToLocal(data?.createdAt)}
                      </td>
                      <td className="text-[14px] px-3 p-2 font-[14px] w-[33%]">
                        <div className="flex items-center gap-3">
                          <button
                            onMouseLeave={() => setEditLevelIcon("")}
                            onMouseEnter={() => setEditLevelIcon(index)}
                            onClick={() =>
                              navigate("/admin/add-section", {
                                state: { data: data },
                              })
                            }
                          >
                            {EditLeaveIcon !== index ? (
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
                                  fill-opacity="1"
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
                            onMouseLeave={() => setDeleteLevelIcon("")}
                            onMouseEnter={() => setDeleteLevelIcon(index)}
                            onClick={() => {
                              setDeleteId(data._id);
                              setDeleteOpen(true);
                            }}
                          >
                            {deleteLeaveIcon !== index ? (
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
                            ) : (
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
                                  fill-opacity="1"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M18.3094 11.25H21.6908C21.9072 11.2499 22.0957 11.2498 22.2737 11.2782C22.977 11.3905 23.5856 11.8291 23.9146 12.4608C23.9978 12.6207 24.0573 12.7996 24.1256 13.0049L24.2373 13.3398C24.2562 13.3965 24.2616 13.4126 24.2661 13.4252C24.4413 13.9093 24.8953 14.2366 25.4099 14.2496C25.4235 14.25 25.44 14.25 25.5001 14.25H28.5001C28.9143 14.25 29.2501 14.5858 29.2501 15C29.2501 15.4143 28.9143 15.75 28.5001 15.75H11.5C11.0858 15.75 10.75 15.4143 10.75 15C10.75 14.5858 11.0858 14.25 11.5 14.25H14.5001C14.5601 14.25 14.5767 14.25 14.5902 14.2496C15.1049 14.2366 15.5589 13.9094 15.734 13.4252C15.7386 13.4125 15.7439 13.3968 15.7629 13.3398L15.8745 13.005C15.9428 12.7996 16.0023 12.6207 16.0856 12.4608C16.4145 11.8291 17.0231 11.3905 17.7264 11.2782C17.9044 11.2498 18.093 11.2499 18.3094 11.25ZM17.0082 14.25C17.0597 14.149 17.1053 14.044 17.1446 13.9355C17.1565 13.9025 17.1682 13.8674 17.1832 13.8223L17.283 13.5229C17.3742 13.2494 17.3952 13.1936 17.416 13.1536C17.5257 12.9431 17.7285 12.7969 17.963 12.7594C18.0075 12.7523 18.067 12.75 18.3553 12.75H21.6448C21.9331 12.75 21.9927 12.7523 22.0372 12.7594C22.2716 12.7969 22.4745 12.9431 22.5842 13.1536C22.605 13.1936 22.626 13.2494 22.7171 13.5229L22.8169 13.8222L22.8556 13.9355C22.8949 14.0441 22.9405 14.149 22.992 14.25H17.0082Z"
                                  fill="white"
                                />
                                <path
                                  d="M13.9151 17.4501C13.8875 17.0369 13.5302 16.7241 13.1169 16.7517C12.7036 16.7793 12.3909 17.1366 12.4184 17.5499L12.8819 24.5017C12.9674 25.7844 13.0364 26.8205 13.1984 27.6336C13.3668 28.4789 13.6532 29.185 14.2448 29.7385C14.8364 30.2919 15.5599 30.5308 16.4146 30.6425C17.2366 30.7501 18.275 30.7501 19.5606 30.75H20.4395C21.7251 30.7501 22.7635 30.7501 23.5856 30.6425C24.4402 30.5308 25.1638 30.2919 25.7554 29.7385C26.347 29.185 26.6334 28.4789 26.8018 27.6336C26.9638 26.8206 27.0328 25.7844 27.1183 24.5017L27.5818 17.5499C27.6093 17.1366 27.2966 16.7793 26.8833 16.7517C26.47 16.7241 26.1126 17.0369 26.0851 17.4501L25.6251 24.3493C25.5353 25.6971 25.4713 26.6349 25.3307 27.3406C25.1943 28.025 25.004 28.3873 24.7306 28.6431C24.4572 28.8989 24.083 29.0647 23.391 29.1552C22.6776 29.2485 21.7376 29.25 20.3868 29.25H19.6134C18.2626 29.25 17.3226 29.2485 16.6092 29.1552C15.9172 29.0647 15.543 28.8989 15.2696 28.6431C14.9962 28.3873 14.8058 28.025 14.6695 27.3406C14.5289 26.6349 14.4649 25.6971 14.375 24.3493L13.9151 17.4501Z"
                                  fill="white"
                                />
                                <path
                                  d="M17.4255 19.2538C17.8376 19.2125 18.2052 19.5133 18.2464 19.9254L18.7464 24.9254C18.7876 25.3376 18.4869 25.7051 18.0747 25.7463C17.6626 25.7875 17.295 25.4868 17.2538 25.0747L16.7538 20.0747C16.7126 19.6625 17.0133 19.295 17.4255 19.2538Z"
                                  fill="white"
                                />
                                <path
                                  d="M22.5747 19.2538C22.9869 19.295 23.2876 19.6625 23.2464 20.0747L22.7464 25.0747C22.7052 25.4868 22.3376 25.7875 21.9255 25.7463C21.5133 25.7051 21.2126 25.3376 21.2538 24.9254L21.7538 19.9254C21.795 19.5133 22.1626 19.2125 22.5747 19.2538Z"
                                  fill="white"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          )}
        </table>
        {!isLoading && data?.sections?.length === 0 && (
          <NodataWithText subText={"Section"} text={"No Section"} />
        )}
      {data?.totalPages>1&&  <PageNation setPage={setPage} totalpage={data?.totalPages} />}
      </div>
      <DeleteModal
        handleDelete={handleDelete}
        isOpen={deleteOpen}
        setIsOpen={setDeleteOpen}
      />
    </div>
  );
}

export default SectionShow
