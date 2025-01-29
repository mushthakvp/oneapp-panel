import axios from "axios";
import { toast } from 'react-toastify';

const cloudName = "di46w9l9u";
const uploadPreset = "my_preset";

const addProductUploadFile = async (files) => {
  const maxSizeInBytes = 10 * 1024 * 1024;
  const filteredFiles = files.filter(file => file.size <= maxSizeInBytes);

  if (filteredFiles.length !== files.length) {
    toast.info("Some files exceeded the 10 MB size limit and were not uploaded.");
  }

  const formData = new FormData();
  const preset = uploadPreset;
  const resourceType = "image";

  const uploadPromises = filteredFiles.map(file => {
    formData.append("file", file);
    formData.append("upload_preset", preset);
    return axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload?resource_type=${resourceType}`,
      formData
    );
  });

  try {
    const responses = await Promise.all(uploadPromises);
    const urls = responses.map(response => response.data.secure_url);
    return urls;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

export { uploadFile };