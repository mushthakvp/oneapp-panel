import React, { useEffect, useState } from 'react'
import ProductFirstSection from './ProductFirstSection/ProductFirstSection'
import SecondSection from './secondSection/SecondSection'
import Variants from './productVarients/Variants'
import third from "../../../../assets/products/third.png";
import EstimatedSection from './EstimatedSection/EstimatedSection';
import AddProductOverView from './AddProductOverView/AddProductOverView';
import { uploadFile } from '../../../../api/cloudinary';
import { cleanData, validateEstimated, validateProduct, validateSpecification, validateVariant } from './secondSection/Validations';
import { useAddProducts, useUpdateProducts } from '../../../../api/useDataController';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import ImageProgressModal from './progress/ImageProgressModal';
function ProductForm() {
    const editProduct = useLocation()?.state?.product;
    const { isPending, mutate } = useAddProducts();
  const { isPending: editPending, mutate: editMutate, } = useUpdateProducts();
  const [success, setSuccess] = useState(false);
  const [isEdit,setIsEdit]=useState(false)
  const [error, setError] = useState(false);
    const [selectedStates, setSelectedStates] = React.useState([]);
    const [imagePending, setImageUploadMutate] = useState(false);
  const [selectedBrandName, setSelectedBrandName] = useState('')
  const [percentage, setPercentage] = useState(0);
    const [product, setProduct] = useState({
  brand: "",
  name: "",
  section: "",
  description: "",
        category: "",
  subCategory:'',
  countries: ["india"],
        states: [],
    });
  
    const [specification, setSpecification] = useState([
      {
        title: "",
        solution: "",
      },
    ]);
    const [variant, setVariant] = useState([
      {
        color: "",
        colorCode: "",
        images: ["", "", "", ""],
        sizes: [
          {
            size: "",
            price: "",
            quantity: "",
            offerPrice: "",
            weight: "",
            weightUnit: "",
          },
        ],
      },
    ]);
       const [estimated, setEstimated] = useState({
         estimatedDeliveryTime: "",
         tax: "",
         isReturn: true,
         returnDuration: "",
       });
    useEffect(() => {
     
        
        if (editProduct) {
         setIsEdit(true)
          setSelectedBrandName(editProduct?.brand?.name);
   
        setProduct({
          brand: editProduct.brand?._id,
          name: editProduct?.name,
          subCategory: editProduct?.subCategory?._id,
          section: editProduct?.section?._id,
          description: editProduct?.description,
          category: editProduct?.category?._id,
          countries: editProduct?.countries,
          states: editProduct?.states,
        });
            setSelectedStates(editProduct?.states);
         setSpecification(editProduct.specifications);
        setVariant([
          {
            color: editProduct?.color?.color,
            colorCode: editProduct?.color?.colorCode,
            images: [
      ...editProduct?.images, // Existing images
      ...Array(4 - (editProduct?.images?.length || 0)).fill(""), // Add empty strings based on the length of images
    ],
            sizes: editProduct?.sizes,
          },
        ]);
       setEstimated({
          estimatedDeliveryTime: editProduct?.estimatedDeliveryTime,
          tax: editProduct?.tax,
          isReturn: editProduct?.isReturn,
          returnDuration: editProduct?.returnDuration,
        });
       
      }
    }, [editProduct]);
    const addVariant = () => {
      setVariant([
        ...variant,
        {
          color: "",
          colorCode: "",
          images: ["", "", "", ""],
          sizes: [
            {
              size: "",
              price: "",
              quantity: "",
              offerPrice: "",
              weight: "",
              weightUnit: "",
            },
          ],
        },
      ]);
    };
    const removeVariant = (index) => {
      const updatedVariants = variant.filter((_, i) => i !== index);
      setVariant(updatedVariants);
    };
 

  // Add progress state

 const handleSubmit = async () => {
   setPercentage(0)
   setSuccess(false);
   setImageUploadMutate(true);

   // Validate product, specification, variant, estimated data before proceeding
   if (!validateProduct(product)) {
     setImageUploadMutate(false);
     return;
   }
   if (!validateSpecification(specification)) {
     setImageUploadMutate(false);
     return;
   }
   if (!validateVariant(variant)) {
     setImageUploadMutate(false);
     return;
   }
   if (!validateEstimated(estimated)) {
     setImageUploadMutate(false);
     return;
   }

   const updatedVariants = [...variant];
 
   let totalImages = 0; // Total number of images
   let uploadedImages = 0; // Number of successfully uploaded images

   // Calculate total number of images to be uploaded
  updatedVariants.forEach((variant) => {
    totalImages += variant.images.filter((image) => image !== "").length; // Only count non-empty images
  });

  // Loop over variants and upload non-empty images
  for (let i = 0; i < updatedVariants?.length; i++) {
    const currentVariant = updatedVariants[i];

    // Filter out empty image fields
    const nonEmptyImages = currentVariant.images.filter(
      (image) => image !== ""
    ); // Remove empty fields

    for (let j = 0; j < nonEmptyImages.length; j++) {
      const imageFile = nonEmptyImages[j];

      try {
        setPercentage(1); // Start with progress at 1% for each new image

        // Assume uploadFile is a function that uploads the image and returns the uploaded URL
        const uploadResponse = await uploadFile(imageFile);
        console.log("uploadResponse", uploadResponse);

        // Update the image URL in the current variant
        currentVariant.images[j] = uploadResponse?.url;

        // Increment the count of successfully uploaded images
        uploadedImages++;

        // Calculate the upload progress and update percentage
        const progress = Math.round((uploadedImages / totalImages) * 100);
        setPercentage(progress); // Set the progress state
      } catch (error) {
        console.error("Failed to upload image:", error);
        // Handle image upload failure, you may want to add more error handling
      }
    }
  }
 
   setImageUploadMutate(false);

   // After image upload is complete, proceed with product update logic
   if (editProduct) {
     const firstElement = updatedVariants.shift();
     const remainingVariants = [...updatedVariants];
     console.log("First element:", firstElement);
     console.log("Remaining elements:", remainingVariants);
     let data;

     if (remainingVariants.length >= 1) {
       data = {
         id: editProduct?._id,
         brand: product?.brand,
         name: product?.name,
         section: product?.section,
         description: product?.description,
         category: product?.category,
         subCategory: product?.subCategory,
         images: firstElement?.images,
         color: firstElement?.color,
         colorCode: firstElement?.colorCode,
         sizes: firstElement?.sizes,
         countries: ["india"],
         states: product?.states,
         specifications: specification,
         estimatedDeliveryTime: estimated?.estimatedDeliveryTime,
         isReturn: estimated?.isReturn,
         returnDuration: estimated?.returnDuration,
         tax: parseFloat(estimated?.tax), // convert to number
         variants: remainingVariants.map((variantItem) => ({
           ...variantItem,
           sizes: variantItem.sizes.map((size) => ({
             ...size,
             size: size.size,
             price: parseFloat(size.price) || 0,
             offerPrice: parseFloat(size.offerPrice) || 0,
             quantity: parseInt(size.quantity, 10) || 0,
             weight: parseFloat(size.weight) || 0,
             weightUnit: size.weightUnit || "kg",
           })),
         })),
       };
     } else {
       data = {
         id: editProduct?._id,
         brand: product?.brand,
         name: product?.name,
         section: product?.section,
         description: product?.description,
         category: product?.category,
         subCategory: product?.subCategory,
         images: firstElement?.images,
         color: firstElement?.color,
         colorCode: firstElement?.colorCode,
         sizes: firstElement?.sizes,
         countries: ["india"],
         states: product?.states,
         specifications: specification,
         estimatedDeliveryTime: estimated?.estimatedDeliveryTime,
         isReturn: estimated?.isReturn,
         returnDuration: estimated?.returnDuration,
         tax: parseFloat(estimated?.tax), // convert to number
       };
     }

     const cleanedData = cleanData(data);
     editMutate(cleanedData, {
       onSuccess: (data) => {
         console.log("Product added successfully:", data);
         setSuccess(true);
          
        //  toast.success(data?.message);
         clearData();
       },
       onError: (error) => {
         console.error("Error adding product:", error);
         toast.error(error?.response?.data?.message);
          
         setError(true);
         if (!error?.response?.data?.message) {
           toast.error(error?.message);
         }
       },
     });
     return;
   }

   // For adding a new product
   const data = {
     brand: product?.brand,
     name: product?.name,
     section: product?.section,
     description: product?.description,
     category: product?.category,
     subCategory: product?.subCategory,
     countries: ["india"],
     states: product?.states,
     specifications: specification,
     estimatedDeliveryTime: estimated?.estimatedDeliveryTime,
     isReturn: estimated?.isReturn,
     returnDuration: estimated?.returnDuration,
     tax: parseFloat(estimated?.tax), // convert to number
     variants: updatedVariants.map((variantItem) => ({
       ...variantItem,
       sizes: variantItem.sizes.map((size) => ({
         ...size,
         size: size.size,
         price: parseFloat(size.price) || 0,
         offerPrice: parseFloat(size.offerPrice) || 0,
         quantity: parseInt(size.quantity, 10) || 0,
         weight: parseFloat(size.weight) || 0,
         weightUnit: size.weightUnit || "kg",
       })),
     })),
   };
   console.log(data);


   const cleanedData = cleanData(data);
   mutate(cleanedData, {
     onSuccess: (data) => {
       console.log("Product added successfully:", data);
       //  toast.success(data?.message);
      //  setPercentage(0)
       setSuccess(true);
       clearData();
     },
     onError: (error) => {
       console.error("Error adding product:", error);
       toast.error(error?.response?.data?.message);
        // setPercentage(0);
       setError(true);
       if (!error?.response?.data?.message) {
         toast.error(error?.message);
       }
     },
   });
 };

  const clearData = () => {
      setProduct({
        brand: "",
        name: "",
        section: "",
        description: "",
        category: "",
        countries: ["india"],
        states: [],
      });
      setSelectedStates([]);
      setSpecification([
        {
          title: "",
          solution: "",
        },
      ]);
      setVariant([
        {
          color: "",
          colorCode: "",
          images: ["", "", "", ""],
          sizes: [
            {
              size: "",
              price: "",
              quantity: "",
              offerPrice: "",
              weight: "",
              weightUnit: "",
            },
          ],
        },
      ]);
      setEstimated({
        estimatedDeliveryTime: "",
        tax: "",
        isReturn: true,
        returnDuration: "",
      });
   }
    
    return (
      <div className="flex items-start gap-6 w-full">
        <div className="flex flex-col gap-[26px] w-full">
          <ProductFirstSection
            selectedStates={selectedStates}
            setSelectedStates={setSelectedStates}
            product={product}
            setProduct={setProduct}
            selectedBrandName={setSelectedBrandName}
          />
          <SecondSection
            setSpecification={setSpecification}
            specification={specification}
          />
          <div className="bg-containerWhite flex flex-col gap-6 p-4 sm:p-[30px] font-urbanist w-full border border-inputBorder rounded-md ">
            <h1 className="text-[20px] font-[500] mb-[32px]">
              Product Variations
            </h1>
            {variant.map((item, index) => (
              <>
                <Variants
                  key={index}
                  index={index}
                  setVariants={setVariant}
                  variant={item}
                  variants={variant}
                />
                <div
                  className={`flex items-center ${
                    index > 0 ? "justify-between" : "justify-end"
                  } mt-6`}
                >
                  {index > 0 && (
                    <button
                      onClick={() => {
                        removeVariant(index);
                      }}
                      className="bg-buttonColor p-3 px-4 max-w-[204px] flex items-center justify-center w-full gap-4 text-white text-sm rounded-md"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.75884 0C6.50198 0 6.29398 0.200934 6.29398 0.449096C6.29398 0.697259 6.50196 0.898193 6.7577 0.898193H13.2417C13.4974 0.898193 13.7065 0.697259 13.7065 0.449096C13.7065 0.200934 13.4985 0 13.2417 0H6.75884ZM19.071 2.34645V4.93444L0.928356 4.93334V2.34645L19.071 2.34645ZM6.02795 9.27053H7.50546V15.9706H6.02795V9.27053ZM12.4939 9.27053H13.9725V15.9706H12.4939V9.27053ZM5.5633 8.37236C5.43941 8.37236 5.32121 8.41958 5.23484 8.50303C5.14732 8.58757 5.09845 8.70176 5.09845 8.82144V16.4196C5.09845 16.5382 5.14732 16.6523 5.23484 16.7369C5.32122 16.8214 5.43941 16.8687 5.5633 16.8687L7.9705 16.8676C8.22736 16.8676 8.43536 16.6666 8.43536 16.4185V8.82146C8.43536 8.57331 8.22737 8.37236 7.9705 8.37236L5.5633 8.37236ZM12.0292 8.37236C11.9065 8.37236 11.7883 8.41958 11.7008 8.50303C11.6133 8.58757 11.5644 8.70176 11.5644 8.82144V16.4196C11.5644 16.5382 11.6133 16.6523 11.7008 16.7369C11.7883 16.8214 11.9065 16.8687 12.0292 16.8687L14.4376 16.8676C14.6933 16.8676 14.9013 16.6666 14.9013 16.4185V8.82146C14.9013 8.57331 14.6933 8.37236 14.4376 8.37236L12.0292 8.37236ZM1.91965 5.83157H18.0814V18.6518C18.0814 18.8966 17.8791 19.0954 17.6268 19.102H2.3731C2.12192 19.0954 1.91962 18.8966 1.91962 18.6518L1.91965 5.83157ZM19.5362 1.44826L0.464861 1.44936C0.208002 1.44936 0 1.65029 0 1.89736V5.3823C0 5.63045 0.207987 5.8314 0.464861 5.8314H0.989951V18.6527C0.989951 19.3961 1.61391 19.9989 2.38451 20H17.6155C18.3861 19.9989 19.0101 19.3961 19.0101 18.6527V5.83252L19.5363 5.83143C19.659 5.83143 19.7772 5.78421 19.8647 5.70077C19.9511 5.61622 20 5.50203 20 5.38344V1.89737C20 1.77879 19.9511 1.6646 19.8647 1.58005C19.7772 1.4955 19.6589 1.44826 19.5362 1.44826Z"
                          fill="white"
                        />
                      </svg>
                      Remove Variants
                    </button>
                  )}

                  <button
                    onClick={addVariant}
                    className="bg-[#2f4eff0f1A] border border-buttonColor p-3 px-4 max-w-[204px] flex items-center justify-center w-full gap-4 text-buttonColor text-sm rounded-md"
                  >
                    Add Another Variant
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 0C3.58185 0 0 3.58185 0 8C0 12.4182 3.58185 16 8 16C12.4182 16 16 12.4182 16 8C16 3.58185 12.4182 0 8 0ZM8 15.3846C3.92154 15.3846 0.615385 12.0785 0.615385 8C0.615385 3.92154 3.92154 0.615385 8 0.615385C12.0785 0.615385 15.3846 3.92154 15.3846 8C15.3846 12.0785 12.0785 15.3846 8 15.3846Z"
                        fill="#2f4eff0f"
                      />
                      <path
                        d="M13.0811 7.69359H8.3119V2.92435C8.3119 2.83943 8.24298 2.77051 8.15805 2.77051H7.85036C7.76544 2.77051 7.69652 2.83943 7.69652 2.92435V7.69359H2.92728C2.84236 7.69359 2.77344 7.76251 2.77344 7.84743V8.15512C2.77344 8.24005 2.84236 8.30897 2.92728 8.30897H7.69652V13.0782C7.69652 13.1628 7.76544 13.232 7.85036 13.232H8.15805C8.24298 13.232 8.3119 13.1628 8.3119 13.0782V8.30897H13.0811C13.1657 8.30897 13.235 8.24005 13.235 8.15512V7.84743C13.235 7.76251 13.1657 7.69359 13.0811 7.69359Z"
                        fill="#2f4eff0f"
                      />
                    </svg>
                  </button>
                </div>
              </>
            ))}
          </div>
          <EstimatedSection estimated={estimated} setEstimated={setEstimated} />
          <div className="flex items-center justify-center mt-4">
            <button
              disabled={imagePending || isPending || editPending}
              onClick={handleSubmit}
              className="bg-buttonColor p-2 flex items-center justify-center h-12 px-4 w-full max-w-[341px] text-white rounded-md"
            >
              {imagePending || isPending || editPending
                ? "Loading...."
                : "Save Product"}
            </button>
          </div>
        </div>
        <AddProductOverView
          variants={variant}
          product={product}
          specification={specification}
          brandName={selectedBrandName}
        />
        <ImageProgressModal
          setEdit={setIsEdit}
          isEdit={isEdit}
          error={error}
          success={success}
          percentage={percentage}
          setPercentage={setPercentage}
        />
      </div>
    );
}

export default ProductForm
