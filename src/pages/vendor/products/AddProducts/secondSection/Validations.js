import { toast } from "react-toastify";

export const validateVariant = (variant) => {
  let isValid = true; // Track overall validity

  // Loop through all variants and validate each one
  for (let i = 0; i < variant.length; i++) {
    const currentVariant = variant[i];

    // Check if there is at least one image in the current variant (non-empty)
    const requiredImage = currentVariant.images.some((img) => img !== ""); // Check if at least one image is filled
    if (!requiredImage) {
      isValid = false;
      toast.error(`At least one image is required for variant ${i + 1}!`);
      break; // Exit the loop as the validation has failed
    }

    // Validate fields in the sizes object (assuming you want to validate all sizes for the current variant)
    for (let j = 0; j < currentVariant.sizes.length; j++) {
      const size = currentVariant.sizes[j];
      if (
        !size.size ||
        !size.price ||
        !size.quantity) {
        isValid = false;
        toast.error(
          `Please fill in all the size fields (size, price, quantity,) for variant ${i + 1
          }, size ${j + 1}.`
        );
        break; // Exit inner loop as the validation has failed
      }
    }

    // Validate color and colorCode fields for each variant
    if (!currentVariant.color || !currentVariant.colorCode) {
      isValid = false;
      toast.error(
        `Please fill in the color and color code for variant ${i + 1}.`
      );
      break; // Exit the loop as the validation has failed
    }
  }

  // Return the overall validity status
  return isValid;
};


export const validateProduct = (product) => {
  let isValid = true;

  // Validate each field and show a specific toast if any field is empty
  if (!product.brand) {
    isValid = false;
    toast.error("Brand is required!");
    return;
  }

  if (!product.name) {
    isValid = false;
    toast.error("Name is required!");
    return;
  }

  if (!product.section) {
    isValid = false;
    toast.error("Section is required!");
    return;
  }

  if (!product.description) {
    isValid = false;
    toast.error("Description is required!");
    return;
  }

  if (!product.category) {
    isValid = false;
    toast.error("Category is required!");
    return;
  }
  if (!product.subCategory) {
    isValid = false;
    toast.error("Subcategory is required!");
    return;
  }

  if (!product.states.length) {
    isValid = false;
    toast.error("States are required!");
    return;
  }

  return isValid; // Return whether all fields are valid
};
export const validateSpecification = (specification) => {
  let isValid = true;

  // Iterate over the specification array and check if each field is filled
  specification.forEach((item, index) => {
    if (!item.title) {
      isValid = false;
      toast.error(`Title is required for specification #${index + 1}`);
      return;
    }

    if (!item.solution) {
      isValid = false;
      toast.error(`Solution is required for specification #${index + 1}`);
      return;
    }
  });

  return isValid; // Return whether all specifications are valid
};

export const validateEstimated = (estimated) => {
  let isValid = true;

  // Check if isReturn is true and returnDuration is empty
  if (estimated.isReturn && !estimated.returnDuration) {
    isValid = false;
    toast.error("Return duration is required when returns are enabled.");
    return
  }

  // Check if estimatedDeliveryTime and tax are filled
  if (!estimated.estimatedDeliveryTime) {
    isValid = false;
    toast.error("Estimated delivery time is required.");
    return
  }
  if (!estimated.tax) {
    isValid = false;
    toast.error("Tax is required.");
    return
  }

  return isValid; // Return whether all fields are valid
};
export const cleanData = (data) => {
  if (Array.isArray(data)) {
    // If the data is an array, filter out any null or empty string values
    return data
      .filter((item) => item !== null && item !== "") // Remove null and empty strings
      .map((item) => cleanData(item)); // Recursively clean any nested arrays or objects
  } else if (typeof data === "object" && data !== null) {
    // If the data is an object, recursively clean its properties
    const cleanedObject = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        // Recursively clean nested values
        const cleanedValue = cleanData(value);
        // Only add the key-value pair if the value is not null or empty
        if (cleanedValue !== null && cleanedValue !== "") {
          cleanedObject[key] = cleanedValue;
        }
      }
    }
    return cleanedObject;
  }
  // Return value as is if it's a primitive (string, number, etc.)
  return data;
};