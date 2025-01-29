import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material';
import ImagePicker from './ImagePicker';
import SelectFieldDrp from './SelectFieldDrp';
import Section from './Section';
import ProductSearch from './ProductSearch';
import Category from './category/Category';
import SubSection from './subSection/SubSection';
import { validateFields } from './validateFields';
import { useAddAdminBanner } from '../../../../api/useDataControllerAdmin';
import { useImageUpload } from '../../../../api/useDataController';
import { toast } from 'react-toastify';

function AddBannerModal({ editData, setEditData,isOpen,setIsOpen }) {
    const [selected, setSelected] = React.useState('Select field')
    const { mutate: imageMUtate, isPending: imagePending, } = useImageUpload()
   
    const [image, setImage]=useState('')
  const [addData, setAddData] = React.useState({
   action:'add',
  field: "",
  section:'',
  category: '',
  subCategory: '',
  product: '',
  image: '',
  startDate: "",
  endDate:  "",

  });
  useEffect(() => {
   
    return () => {
     
      setAddData({
        action: "add",
        field: "",
        section: "",
        category: "",
        subCategory: "",
        product: "",
        image: "",
        startDate: "",
        endDate: "",
      });
      setEditData({});
      setSelected('Select field')
      setImage('')
    }
  },[])
  useEffect(() => {
      if (editData && editData._id) {
        console.log(editData);
        
      setSelected(editData.field)
      setAddData({
        action: "update",
        field: editData?.field || "",
        section: editData?.section || "",
        category: editData?.category || "",
        subCategory: editData?.subCategory || "",
        product: editData?.product || "",
        image: editData?.image || "",
        startDate: editData?.startDate
          ? new Date(editData.startDate).toISOString().split("T")[0] // Convert to yyyy-MM-dd
          : "",
        endDate: editData?.endDate
          ? new Date(editData.endDate).toISOString().split("T")[0] // Convert to yyyy-MM-dd
          : "",
        isShowInUser: editData?.isShowInUser ?? true, // Ensure a boolean value if undefined
        id: editData?._id || "", // Ensure ID is set to empty string if undefined
      });
    } else {
      // Optionally clear the form if editData is invalid
      setAddData({
        action: "add",
        field: "",
        section: "",
        category: "",
        subCategory: "",
        product: "",
        image: "",
        startDate: "",
        endDate: "",
      });
    }
  }, [editData]);
  const { mutate, error, isPending } = useAddAdminBanner();
    const handleSubmit = () => {   
    
      
    if (!editData) {
      const isValid = validateFields(addData, selected);

      if (!isValid) return;
      imageMUtate(image, {
        onSuccess: (data) => {
        const postData={...addData,image:data?.url}
          mutate(postData, {
            onSuccess: (data) => {
              toast.success(" Banner Added Successfully");
            //   setEditData({});
              setAddData({
                action: "add",
                field: "",
                section: "",
                category: "",
                subCategory: "",
                product: "",
                image: "",
                startDate: "",
                endDate: "",
              });
              setIsOpen(false);
            },
            onError: (error) => {
              toast.error(error.message);
            },
          });
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
     
    } else {
        if (image) {
             imageMUtate(image, {
               onSuccess: (data) => {
                 const postData = { ...addData, image: data?.url };
                 mutate(postData, {
                   onSuccess: (data) => {
                     toast.success(" Banner Added Successfully");
                       setEditData({});
                     setAddData({
                       action: "add",
                       field: "",
                       section: "",
                       category: "",
                       subCategory: "",
                       product: "",
                       image: "",
                       startDate: "",
                       endDate: "",
                     });
                     setIsOpen(false);
                   },
                   onError: (error) => {
                     toast.error(error.message);
                   },
                 });
               },
               onError: (error) => {
                 toast.error(error.message);
               },
             }); 
        
        } else {
             mutate(addData, {
               onSuccess: (data) => {
                 toast.success("Banner Updated Successfully");
                 setEditData("");
                 setEditData({});
                 setAddData({
                   action: "add",
                   couponName: "",
                   minimumPrice: "",
                   description: "",
                   useCountPerUser: "",
                   maximumUsers: "",
                   discount: "",
                   discountType: "",
                   startDate: "",
                   endDate: "",
                   isShowInUser: true,
                 });
                 setIsOpen(false);
               },
               onError: (error) => {
                 toast.error(error.message);
               },
             });
        }
     
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => {
         
      setAddData({
        action: "add",
        field: "",
        section: "",
        category: "",
        subCategory: "",
        product: "",
        image: "",
        startDate: "",
        endDate: "",
      });
      setEditData({});
      setSelected('Select field')
      setImage('')
        setIsOpen(false)
      }}
      className="flex items-center overflow-y-auto justify-center font-urbanist p-2 sm:p-4 capitalize"
    >
      <div className="bg-containerWhite rounded-md w-full max-w-[483px] outline-none mt-32 sm:mt-0">
        <p className="p-3 relative text-center border-b border-inputBorder text-[20px] font-[600] outline-none">
          Create Banner   <span className='absolute right-3 opacity-60 cursor-pointer'
          onClick={()=>setIsOpen(false)}
          >X</span>
        </p>
        <div className="mt-2 p-2 md:p-4 md:px-6 w-full text-lowercase">
          <ImagePicker imageSet={editData?.image} image={image} setImage={setImage} />
          <div className="w-full mt-5">
            <p className="text-sm mb-1">select field</p>{" "}
            {/* Automatically lowercased */}
            <SelectFieldDrp
              selected={selected}
              setSelected={setSelected}
              postData={addData}
              setPostData={setAddData}
            />
          </div>

          {selected.toLocaleLowerCase() !== "product" && (
            <div className="w-full mt-4">
              <p className="text-sm mb-1">section</p>
              <Section selected={addData} setSelected={setAddData} />
            </div>
          )}
          {selected.toLocaleLowerCase() !== "section" && (
            <>
              <div className="w-full mt-4">
                <p className="text-sm mb-1">product</p>
                <ProductSearch selected={addData} setSelected={setAddData} />
              </div>
              {selected.toLocaleLowerCase() !== "product" && (
                <div className="flex items-center gap-4 w-full mt-5">
                  <div className="w-full">
                    <p className="text-sm mb-1">category</p>
                    <Category
                      sectionId={addData?.section}
                      selected={addData}
                      setSelected={setAddData}
                    />
                  </div>
                  {selected.toLocaleLowerCase() !== "category" && (
                    <div className="w-full">
                      <p className="text-sm mb-1">subcategory</p>
                      <SubSection selected={addData} setSelected={setAddData} />
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          <div className="flex items-center gap-4 w-full mt-5">
            <div className="w-full">
              <p className="text-sm mb-1">start date</p>
              <input
                type="date"
                name="startDate"
                value={addData.startDate}
                onChange={handleChange}
                className="border border-inputBorder p-2 w-full outline-none h-10 rounded-md mb-4"
              />
            </div>
            <div className="w-full">
              <p className="text-sm mb-1">end date</p>
              <input
                type="date"
                name="endDate"
                value={addData.endDate}
                onChange={handleChange}
                className="border border-inputBorder p-2 w-full outline-none h-10 rounded-md mb-4"
              />
            </div>
          </div>

          <button
            disabled={isPending || imagePending}
            onClick={handleSubmit}
            className="w-full p-2 bg-buttonColor text-white rounded-md mb-4 mt-4"
          >
            {isPending || imagePending ? "loading...." : " submit"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddBannerModal
