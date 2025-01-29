import React, { useState, useEffect } from "react";
import PageHeading from "../../../components/pageHeding/PageHeading";
import ImagePicker from "./ImagePicker";
import VideoPicker from "./VideoPicker";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddVideos, useGetProductSearch, useImageUpload, useUpdateVideo } from "../../../api/useDataController";
import { toast } from "react-toastify";
import SearchProduct from "./SearchProduct";
import { updateCommission } from "../../../api/adminServices";

function AddVideos() {
  const editedData = useLocation().state?.data
  const navigate= useNavigate()
  const [prev, setPrev] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const {mutate:updateMutate,isPending:updatePending} = useUpdateVideo();
  const [prevImage, setPrevImage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    thumpImage: "",
    video: "",
    products: [],
    storage: 0,
  });
  useEffect(() => {
    if (editedData) {
      console.log(editedData,'{{{{{{');
      
     setFormData({
       title:editedData?.title|| "",
      //  thumpImage:editedData?.thumpImage|| "",
       //  video:editedData?.video|| "",
     
       products: editedData?.products?.map(product => product._id) || [],
       storage:editedData?.storage|| 0,
     });
      setPrevImage(editedData?.thumpImage)
      setPrev(editedData?.video);
   }
 },[editedData])
  const { mutate: imageMutate, isPending: imagePending, error } = useImageUpload();
  useEffect(() => {
    if (error) {
      console.log(error);
      
    }
  },[error])
  const [errorData, setErrorData] = useState({
    title: "",
    thumpImage: "",
    video: "",
    products: "",
  });
 const {mutate,isPending} =useAddVideos()
  // Calculate video storage size whenever video changes
  useEffect(() => {
    calculateVideoStorage();
  }, [formData.video]);

  const calculateVideoStorage = () => {
    let videoSize = 0;

    // Calculate only video size in MB
    if (formData.video instanceof File) {
      videoSize = formData.video.size / (1024 * 1024); // Convert to MB
    }

    // Update storage with only video size
    setFormData((prev) => ({ ...prev, storage: Number(videoSize) }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: "",
      thumpImage: "",
      video: "",
      products: "",
    };

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters long";
      isValid = false;
    }

    // Thumbnail validation
    if (!formData.thumpImage) {
      newErrors.thumpImage = "Thumbnail image is required";
      isValid = false;
    }

    // Video validation
    if (!formData.video) {
      newErrors.video = "Video is required";
      isValid = false;
    }

    // Products validation
    if (formData.products.length === 0) {
      newErrors.products = "Product is required";
      isValid = false;
    }

    setErrorData(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
console.log(formData);
    if (editedData) {
      EditData(formData);
      return
    }
    if (validateForm()) {
      imageMutate(formData?.thumpImage, {
        onSuccess: (imageData) => {
          imageMutate(
            formData?.video,
            {
              onSuccess: (videoUrl) => {
                mutate(
                  {
                    title: formData?.title,
                    thumpImage: imageData?.secure_url,
                    video: videoUrl?.secure_url,
                    products: formData?.products,
                    storage: formData?.storage,
                  },
                  {
                    onSuccess: () => {
                      toast.success("Videos added successfully");
                      setFormData({
                        title: "",
                        thumpImage: "",
                        video: "",
                        products: [],
                        storage: 0,
                      });
                      setPrev('')
                      setPrevImage('')
                      selectedProducts([])
                    },
                  }
                );
              },
            },
          
          );
      }
    })
    }
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, title: value }));
    if (value.trim()) {
      setErrorData((prev) => ({ ...prev, title: "" }));
    }
  };
const EditData = () => {
  // Helper function to handle image mutation
  const handleImageMutation = async (file) => {
    if (!file) return null;
    try {
      const result = await new Promise((resolve, reject) => {
        imageMutate(file, {
          onSuccess: (imageData) => resolve(imageData?.secure_url),
          onError: (error) => reject(error),
        });
      });
      return result;
    } catch (error) {
      console.error("Image mutation failed:", error);
      return null;
    }
  };

  // Main async function to handle all mutations
  const handleAllMutations = async () => {
    try {
      // Initialize variables for URLs
      let imageUrl = null;
      let videoUrl = null;

      // Handle image and video uploads in parallel if both exist
      const uploadPromises = [];

      if (formData?.thumpImage) {
        uploadPromises.push(handleImageMutation(formData.thumpImage));
      }

      if (formData?.video) {
        uploadPromises.push(handleImageMutation(formData.video));
      }

      // Wait for all uploads to complete if any exist
      if (uploadPromises.length > 0) {
        const results = await Promise.all(uploadPromises);

        // Assign results based on what was uploaded
        if (formData?.thumpImage) {
          imageUrl = results[0];
        }
        if (formData?.video) {
          videoUrl = formData?.thumpImage ? results[1] : results[0];
        }
      }

      // Call final mutation with available URLs
      updateMutate(
        {
          id: editedData?._id,
          title: formData?.title,
          thumpImage: imageUrl,
          video: videoUrl,
          products: formData?.products,
          storage: formData?.storage,
        },
        {
          onSuccess: () => {
            toast.success("Videos added successfully");
            setFormData({
              title: "",
              thumpImage: "",
              video: "",
              products: [],
              storage: 0,
            });
            setPrev("");
            navigate(-1)
          },
        }
      );
    } catch (error) {
      console.error("Mutation process failed:", error);
      toast.error("Failed to update video");
    }
  };

  // Start the mutation process
  handleAllMutations();
};
  return (
    <div>
      <div className="flex items-center gap-4">
        <svg
          className="cursor-pointer"
          onClick={() => navigate(-1)}
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30 18H6M6 18L15 9M6 18L15 27"
            stroke="black"
            strokeWidth="1.98214"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <PageHeading title={"Add Video"} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-containerWhite rounded-md border border-inputBorder mt-[26px] p-[35px]"
      >
        <div>
          <p className="mb-2">Title</p>
          <input
            type="text"
            value={formData.title}
            onChange={handleTitleChange}
            className="w-full border border-inputBorder rounded-md h-12 outline-none p-2"
            placeholder="Enter Title"
          />
          {errorData.title && (
            <p className="text-sm text-red-500 mt-1">{errorData.title}</p>
          )}
        </div>

        <div className="flex items-center w-full h-full mt-[37px] flex-col md:flex-row gap-10 lg:gap-[46px]">
          <div className="w-full">
            <ImagePicker prev={prevImage} setPrev={setPrevImage} formData={formData} setFormData={setFormData} />
            {errorData.thumpImage && (
              <p className="text-sm text-red-500 mt-1">
                {errorData.thumpImage}
              </p>
            )}
          </div>
          <div className="w-full">
            <VideoPicker setFormData={setFormData} formData={formData} prev={prev} setPrev={setPrev}/>
            {errorData.video && (
              <p className="text-sm text-red-500 mt-1">{errorData.video}</p>
            )}
          </div>
        </div>

    

        <p className="mt-[26px]">Add Products</p>
      <SearchProduct formData={formData} setFormData={setFormData} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts}/>
        {errorData.products && (
          <p className="text-sm text-red-500 mt-1">{errorData.products}</p>
        )}
        <div className="flex items-center justify-center w-full mt-7">
          <button
            type="submit"
            disabled={isPending||imagePending||updatePending}
            className="max-w-[352px] w-full p-3 rounded-md text-white bg-buttonColor disabled:opacity-50"
          >
            {isPending ||imagePending||updatePending? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddVideos;



