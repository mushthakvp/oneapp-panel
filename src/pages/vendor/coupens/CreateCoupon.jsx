import { Modal } from "@mui/material";
import React, { useEffect } from "react";
import DisContTypeSelection from "./DisContTypeSelection";
import CheckBoxComponent from "./CheckBoxComponent";
import { useAddCoupon } from "../../../api/useDataController";
import { validateFields } from "./validation";
import { toast } from "react-toastify";

function CreateCoupon({ isOpen, setIsOpen,editData,setEditData }) {
  const [addData, setAddData] = React.useState({
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
 useEffect(() => {
   if (editData && editData._id) {
     // Ensure editData is valid and contains the required ID
     setAddData({
       action: "update",
       couponName: editData?.couponName || "",
       minimumPrice: editData?.minimumPrice || "",
       description: editData?.description || "",
       useCountPerUser: editData?.useCountPerUser || "",
       maximumUsers: editData?.maximumUsers || "",
       discount: editData?.discount || "",
       discountType: editData?.discountType || "",
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
       id: "",
     });
   }
 }, [editData]);
const {mutate,error,isPending} = useAddCoupon();
    const handleSubmit = () => {
        console.log(addData);
        if(!editData){ if (!validateFields(addData)) return;
        console.log(addData);
        mutate(addData, {
          onSuccess: (data) => {
            toast.success("Coupon Added Successfully");
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
        } else {
            mutate(addData, {
              onSuccess: (data) => {
                toast.success("Coupon Updated Successfully");
                setEditData('');
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
      onClose={() => setIsOpen(false)}
      className="flex items-center justify-center font-urbanist p-4"
    >
      <div className="bg-containerWhite rounded-md w-full max-w-[633px] outline-none">
        <p className="p-5 text-center border-b border-inputBorder text-[20px] font-[600] outline-none">
          Create Coupon
        </p>
        <div className="mt-2 p-4 px-6 w-full">
          <div className="flex items-center gap-4 w-full">
            <div className="w-full">
              <p className="text-sm mb-1">Coupon Name</p>
              <input
                type="text"
                name="couponName"
                value={addData.couponName}
                onChange={handleChange}
                placeholder="Enter Coupon Name"
                className="border border-inputBorder p-2 w-full outline-none h-10 rounded-md mb-4"
              />
            </div>
            <div className="w-full">
              <p className="text-sm mb-1">Minimum Price</p>
              <input
                type="text"
                name="minimumPrice"
                value={addData.minimumPrice}
                onChange={handleChange}
                placeholder="Enter Minimum Price"
                className="border border-inputBorder p-2 w-full outline-none h-10 rounded-md mb-4"
              />
            </div>
          </div>
          <div className="w-full">
            <p className="text-sm mb-1">Description</p>
            <textarea
              name="description"
              value={addData.description}
              onChange={handleChange}
              placeholder="Enter Description"
              className="border border-inputBorder p-2 w-full outline-none min-h-[74px] rounded-md mb-4"
            />
          </div>
          <div className="flex items-center gap-4 w-full">
            <div className="w-full">
              <p className="text-sm mb-1">No: of Times User Can Use</p>
              <input
                type="text"
                name="useCountPerUser"
                value={addData.useCountPerUser}
                onChange={handleChange}
                placeholder="EX: 01"
                className="border border-inputBorder p-2 w-full outline-none h-10 rounded-md mb-4"
              />
            </div>
            <div className="w-full">
              <p className="text-sm mb-1">Maximum Users</p>
              <input
                type="text"
                name="maximumUsers"
                value={addData.maximumUsers}
                onChange={handleChange}
                placeholder="EX: 24 Users"
                className="border border-inputBorder p-2 w-full outline-none h-10 rounded-md mb-4"
              />
            </div>
          </div>
          <div>
            <p className="text-sm mb-1">Discount</p>
            <DisContTypeSelection selected={addData} setSelected={setAddData} />
          </div>
          <div className="flex items-center gap-4 w-full">
            <div className="w-full">
              <p className="text-sm mb-1">Start Date</p>
              <input
                type="date"
                name="startDate"
                value={addData.startDate}
                onChange={handleChange}
                className="border border-inputBorder p-2 w-full outline-none h-10 rounded-md mb-4"
              />
            </div>
            <div className="w-full">
              <p className="text-sm mb-1">End Date</p>
              <input
                type="date"
                name="endDate"
                value={addData.endDate}
                onChange={handleChange}
                className="border border-inputBorder p-2 w-full outline-none h-10 rounded-md mb-4"
              />
            </div>
          </div>
          <CheckBoxComponent selected={addData} setSelected={setAddData} />
          <button
            onClick={handleSubmit}
            className="w-full p-2 bg-buttonColor text-white rounded-md mb-4 mt-4"
          >
           {isPending?"Loading....":" Submit"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default CreateCoupon;
