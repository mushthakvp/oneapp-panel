import { toast } from "react-toastify";

export const validateFields = (addData) => {
  let isValid = true;

  // Validate Coupon Name
  if (!addData.couponName.trim()) {
    toast.error("Coupon Name is required");
      isValid = false;
      return
  }

  // Validate Minimum Price
  if (
    !addData.minimumPrice.trim() ||
    isNaN(addData.minimumPrice) ||
    parseFloat(addData.minimumPrice) <= 0
  ) {
    toast.error("Valid Minimum Price is required");
      isValid = false;
      return
  }

  // Validate Description
  if (!addData.description.trim()) {
    toast.error("Description is required");
      isValid = false;
      return
  }

  // Validate Use Count Per User
  if (
    !addData.useCountPerUser.trim() ||
    isNaN(addData.useCountPerUser) ||
    parseInt(addData.useCountPerUser) <= 0
  ) {
    toast.error("Valid Use Count Per User is required");
      isValid = false;
      return

  }

  // Validate Maximum Users
  if (
    !addData.maximumUsers.trim() ||
    isNaN(addData.maximumUsers) ||
    parseInt(addData.maximumUsers) <= 0
  ) {
    toast.error("Valid Maximum Users is required");
      isValid = false;
      return
  }

  // Validate Discount
  if (
    !addData.discount.trim() ||
    isNaN(addData.discount) ||
    parseFloat(addData.discount) <= 0
  ) {
    toast.error("Valid Discount is required");
      isValid = false;
      return
  }

  // Validate Discount Type
  if (!addData.discountType.trim()) {
    toast.error("Discount Type is required");
      isValid = false;
      return
  }

  // Validate Start Date
  if (!addData.startDate.trim()) {
    toast.error("Start Date is required");
      isValid = false;
      return
  }

  // Validate End Date
  if (!addData.endDate.trim()) {
    toast.error("End Date is required");
      isValid = false;
      return
  }

  // Check that end date is after start date
  if (
    addData.startDate &&
    addData.endDate &&
    new Date(addData.startDate) > new Date(addData.endDate)
  ) {
    toast.error("End Date must be after Start Date");
      isValid = false;
      return
  }

  return isValid;
};
