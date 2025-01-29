import React, { useEffect, useState } from 'react'
import PageHeading from '../../../components/pageHeding/PageHeading';
import ImagePicker from './ImagePicker';
import { useAddAdminCategory } from '../../../api/useDataControllerAdmin';
import Section from '../banner/modal/Section';
import { toast } from 'react-toastify';
import { useImageUpload } from '../../../api/useDataController';
import { useLocation, useNavigate } from 'react-router-dom';

function AddCategory() {
  const editData = useLocation()?.state?.data
  const navigate=useNavigate()
   const [image, setImage] = useState(null);
  const { mutate, isPending } = useAddAdminCategory();
  const {mutate:imageMutate,isPending:imagePending}=useImageUpload()
  const [postData, setPostData] = useState({
    status: "add",
    name: "",
    section: "",
  });
  useEffect(() => {
    console.log(editData);
    
   if (editData) {
      setPostData({
        status: "update",
        name: editData?.name,
        section: editData?.sectionId?._id,
        image: editData?.image,
        id: editData?._id
      });
     
    }
  }, [editData]);

  const handleSubmit = () => {
   
    if (editData) {
      if (image) {
       imageMutate(image, {
         onSuccess: (data) => {
           const updateData = {
             ...postData,
             image: data?.url,
             sectionId: postData?.section,
           };
           mutate(updateData, {
             onSuccess: (data) => {
               toast.success(data?.message);
               setPostData({
                 status: "add",
                 name: "",
                 section: "",
               });
               navigate(-1);
             },
             onError: (error) => {
               toast.error("category adding failed");
             },
           });
         },
         onError: () => {
           toast.error("Image upload failed");
         },
       });
      }
      else {
         const updateData = {
           ...postData,
           sectionId: postData?.section,
         };
         mutate(updateData, {
           onSuccess: (data) => {
             toast.success(data?.message);
             setPostData({
               status: "add",
               name: "",
               section: "",
             });
             navigate(-1);
           },
           onError: (error) => {
             toast.error("category adding failed");
           },
         });
      }
     }
    else {
       if (!postData?.name) {
         toast.error("Please enter a name.");
         return;
       }
       if (!postData?.section) {
         toast.error("Please select a section.");
         return;
       }
       if (!image) {
         toast.error("Please select a image.");
         return;
       }
       imageMutate(image, {
         onSuccess: (data) => {
           const updateData = {
             ...postData,
             image: data?.url,
             sectionId: postData?.section,
           };
           mutate(updateData, {
             onSuccess: (data) => {
               toast.success(data?.message);
               setPostData({
                 status: "add",
                 name: "",
                 section: "",
               });
               navigate(-1);
             },
             onError: (error) => {
               toast.error("category adding failed");
             },
           });
         },
         onError: () => {
           toast.error("Image upload failed");
         },
       });
   }
  }
    return (
      <div className="font-urbanist">
        <div className="flex items-center gap-3 ">
          <svg
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
          <PageHeading title="Add Category" />
        </div>
        <div className="bg-containerWhite mt-[15px] p-[22px] rounded-md min-w-[750px] flex flex-col gap-[36px]">
          <div className="flex items-center">
            <div className="w-full max-[30%]">
              Category name <span className="text-buttonColor">*</span>
            </div>
            <input
              value={postData?.name}
              onChange={(e) =>setPostData({ ...postData, name: e.target.value })}
              placeholder="Enter Category Name"
              type="text"
              className="w-full min-w-[70%] border border-borderColor bg-transparent rounded-md p-2"
            />
          </div>
          <ImagePicker image={image} setImage={setImage} editData={editData}/>
          <div className="flex items-center">
            <div className="w-full max-[30%]">
              Category name <span className="text-buttonColor">*</span>
            </div>
            <div className="w-full min-w-[70%]">
              <Section selected={postData} setSelected={setPostData} />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button onClick={handleSubmit} className="w-full max-w-[352px] flex items-center justify-center bg-buttonColor text-white p-2 rounded-md">
             {isPending||imagePending?'Loading....':editData?" Save Changes":'Save'}
            </button>
          </div>
        </div>
      </div>
    );
}

export default AddCategory
