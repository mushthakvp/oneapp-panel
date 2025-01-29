import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ImageProgressModal({
  percentage,
  success,
  error,
  setPercentage,
  setSuccess,
  setEdit,
  isEdit,
}) {
  const navigate = useNavigate();

  // Using state to store the initial isEdit value
  const [actionType, setActionType] = useState(isEdit);

  // Set actionType when isEdit changes
  useEffect(() => {
    setActionType(isEdit);
    console.log(isEdit);
    
  }, [isEdit]);

  useEffect(() => {
    if (success) {
      // 
      setTimeout(() => {
        setPercentage(0);
        navigate("/products");
        setEdit(false);
      }, 4250);
    }
  }, [success, error]);

  return (
    <Modal
      open={percentage && !error}
      className="flex items-center justify-center"
    >
      <div className="flex flex-col items-center p-3 sm:p-6 bg-white rounded-md w-full max-w-[329px] outline-none">
        {!success && (
          <>
            <p className="text-md opacity-60">Image Uploading...</p>
            <div className="w-full h-[5px] bg-[#E7E7E7] rounded-md mt-4">
              <div
                style={{ width: `${percentage}%` }}
                className="h-full bg-buttonColor rounded-md"
              />
            </div>
            <p className="mt-2 text-sm">{percentage}% completed</p>
          </>
        )}
        {success && (
          <>
            <img src="/tick.gif" className="max-h-[150px]" alt="" />
            <h1 className="text-[24px] font-[700] text-center">
              Product {actionType ? "Updated" : "Added"}!
            </h1>
            <p className="text-[12px] opacity-65 mt- text-center">
              Your Product successfully
              <br /> {actionType ? "Updated" : "Added"}
            </p>
          </>
        )}
      </div>
    </Modal>
  );
}
export default ImageProgressModal;