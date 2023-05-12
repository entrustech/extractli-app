import axios from "axios";

const API_BASE_URL = 'http://localhost:3000';
//const API_BASE_URL = process.env.REACT_APP_API_URL;

export const handleEmail = async (email) => {
    try {
      const response = await axios.post(API_BASE_URL + "/api/submitEmail", { email });
      console.log("Email submitted successfully");
      return response;
    } catch (error) {
      console.error("Failed to submit email:", error);
      throw error; // It's important to re-throw the error so it can be caught in the calling function
    }
  };

export const uploadFile = async (file, fileType) => {
  const endpoint = getEndpoint(fileType);
  const formData = new FormData();
  formData.append("file", file);

  return await axios.post(endpoint, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const getEndpoint = (fileType) => {
  if (fileType.startsWith("image/")) {
    return API_BASE_URL + "/api/upload/image";
  } else if (fileType === "application/pdf") {
    return API_BASE_URL + "/api/upload/pdf";
  } else if (
    fileType === "application/msword" ||
    fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return API_BASE_URL + "/api/upload/word";
  } else if (fileType === "text/plain") {
    return API_BASE_URL + "/api/upload/txt";
  } else if (fileType === "application/json") {
    return API_BASE_URL + "/api/upload/json";
  } else if (fileType === "text/xml") {
    return API_BASE_URL + "/api/upload/xml";
  } else {
    console.log(fileType);
    throw new Error("Unsupported file type");
  }
};
