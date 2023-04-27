import React from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import "./Dropzone.css";

const Dropzone = ({ updateDisplay }) => {
  const getEndpoint = (fileType) => {
    if (fileType.startsWith("image/")) {
      return "/upload/image";
    } else if (fileType === "application/pdf") {
      return "/upload/pdf";
    } else if (
      fileType === "application/msword" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return "/upload/word";
    } else {
      throw new Error("Unsupported file type");
    }
  };

  const handleDrop = async (acceptedFiles) => {
    try {
      const file = acceptedFiles[0];
      const endpoint = getEndpoint(file.type);
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        const { text } = response.data;
        const previewUrl = URL.createObjectURL(file);
        const fileType = file.type.startsWith("image/") ? "image" : "pdf";
        updateDisplay(text, file.name, previewUrl, fileType);
      }
    } catch (err) {
      console.error("An error occurred while uploading the file:", err);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  return (
    <div>
      <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} />
        <p>
          Drag and drop an image, pdf, doc or docx file here, or click to select
          a file
        </p>
      </div>
    </div>
  );
};

export default Dropzone;
