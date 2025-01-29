import axios from "axios";
import { toast } from "react-toastify";

const cloudName = "di46w9l9u";
const uploadPreset = "my_preset";

const uploadFile = async (file) => {
  // const maxSizeInBytes = 10 * 1024 * 1024;
  // // if (file?.size > maxSizeInBytes) {
  // //   toast.info("File size exceeds 10 MB. Please upload a smaller file.");
  // //   return;
  // // }
console.log('teedfsf');

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  console.log(formData);
  console.log(file, "sdfesd");
  const resourceType = file.type.startsWith("image/") ? "image" : "raw";


  try {
    const response = await axios.post(
      `${url}?resource_type=${resourceType}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log("Upload successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Upload error:", error?.response?.data?.error?.message);
    toast.info(error?.response?.data?.error?.message);
    throw error;
  }
};

export { uploadFile };
