import React, { useEffect } from 'react'
import PageHeading from '../../../components/pageHeding/PageHeading';
import SectionIconPicker from './SectionIconPicker';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAddAdminSection } from '../../../api/useDataControllerAdmin';
import { toast } from 'react-toastify';

function AddSection() {
  const navigate = useNavigate();
  const editData = useLocation()?.state?.data;
 console.log(editData,'--------------------');
 
  const { mutate, isPending } = useAddAdminSection();
  const [postData, setPostData] = React.useState({
    status: "add",
    name: "",
    description: "",
    image: "",
  });
  useEffect(() => {
    if (editData) {
      setPostData({
        status: "update",
        name: editData?.name,
        id: editData?._id,
        image: editData?.image,
      });
    }
  }, [editData]);
  const handleSubmit = () => {
     if (!postData.name ) {
       toast.error(" Name is required");
       return;
     }
    if (!postData.image) {
       toast.error(" Image is required");
       return;
     }
    // if (!postData.description) {
    //    toast.error(" Description is required");
    //    return;
    //  }
  
    
     mutate(postData,
       {
         onSuccess: (data) => {
           toast.success(data.message);
           setPostData({
             status: "add",
             name: "",
             description: "",
             image: "",
           });
           navigate("/admin/section");
         },
        //  onError: (error) => {
        //    toast.error(error.response.data.message);
        //  },
       }
     );
  }
  return (
    <div className="font-urbanist">
      <div className="flex items-center gap-3 ">
              <svg
                  onClick={() => navigate(-1)}
                  className='cursor-pointer'
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.9998 18H5.99976M5.99976 18L14.9998 9M5.99976 18L14.9998 27"
            stroke="black"
            stroke-width="1.98214"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <PageHeading title="Add Section" />
      </div>
      <div className="bg-containerWhite mt-[15px] p-[22px] rounded-md min-w-[750px] flex flex-col gap-[36px]">
        <div className="flex items-center">
          <div className="w-full max-[30%]">
            Section name <span className="text-buttonColor">*</span>
          </div>
          <input
            placeholder="Enter Section Name"
            value={postData?.name}
            onChange={(e) => setPostData({ ...postData, name: e.target.value })}
            type="text"
            className="w-full min-w-[70%] border border-borderColor bg-transparent rounded-md p-2"
          />
        </div>
              <SectionIconPicker postData={postData} setPostData={setPostData}
              />
      
        <div className="flex items-center justify-center">
          <button disabled={isPending} onClick={() => {
           handleSubmit();
          }} className="w-full max-w-[352px] flex items-center justify-center bg-buttonColor text-white p-2 rounded-md">
            {isPending?'Loading....':  !editData?'Save':'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSection
