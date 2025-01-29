import { toast } from "react-toastify";

export const validateFields = (data, selected) => {
  // Initialize as true, and update only if an error is found
  let isValid = true;

  // Common validations for all sections
  if (!data?.field) {
    toast.error("Field is required");
     return isValid = false;
      
  }

  // Validate based on the selected field
  if (selected === "Product") {
    if (!data?.product) {
      toast.error("Product is required");
      return  isValid = false;
        
    }
    if (!data?.startDate) {
      toast.error("Start date is required");
      return isValid = false;
    }
    if (!data?.endDate) {
      toast.error("End date is required");
     return isValid = false;
    }
  }

  if (selected === "Section") {
    if (!data?.section) {
      toast.error("Section is required");
     return isValid = false;
    }
    if (!data?.startDate) {
      toast.error("Start date is required");
     return isValid = false;
    }
    if (!data?.endDate) {
      toast.error("End date is required");
    return  isValid = false;
    }
  }

  if (selected === "Category") {
    if (!data?.category) {
      toast.error("Category is required");
     return isValid = false;
    }
    if (!data?.startDate) {
      toast.error("Start date is required");
     return isValid = false;
    }
    if (!data?.endDate) {
      toast.error("End date is required");
     return isValid = false;
    }
  }

  if (selected === "Subcategory") {
    if (!data?.subCategory) {
      toast.error("Subcategory is required");
     return isValid = false;
    }
    if (!data?.startDate) {
      toast.error("Start date is required");
     return isValid = false;
    }
    if (!data?.endDate) {
      toast.error("End date is required");
     return isValid = false;
    }
  }

  // Return true only if all validations pass
  return isValid;
};
