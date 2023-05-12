import React from "react";
import { Box, Typography } from '@mui/material';
import { useDropzone } from "react-dropzone";
import { uploadFile } from "../services/api";
import "./Dropzone.css";

//const API_BASE_URL = 'http://localhost:3000';
const API_BASE_URL = process.env.REACT_APP_API_URL;

const Dropzone = ({ updateDisplay }) => {
  
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
      console.log(fileType)
      throw new Error("Unsupported file type");
    }
  };

  const handleDrop = async (acceptedFiles) => {
    try {
      const file = acceptedFiles[0];
      const response = await uploadFile(file, file.type);

      if (response.status === 200) {
        let text = "";
        let json = "";
        let xml = "";
        const previewUrl = URL.createObjectURL(file);
        let fileType = "";
        if (file.type.startsWith("image/")) {
          fileType = "image";
          text = response.data.text;
        } else if (file.type === "application/pdf") {
          fileType = "pdf";
          text = response.data.text;
        } else if (
          file.type === "application/msword" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          fileType = "doc";
          text = response.data.text;
        } else if (file.type === "text/plain") {
          fileType = "txt";
          text = response.data.text;
        } else if (file.type === "application/json") {
          fileType = "json";
          json = response.data.json;
          text = JSON.stringify(json, null, 2);
          console.log(json)
        } else if (file.type === "text/xml" || file.type === "application/xml") {
          fileType = "xml";
          xml = response.data.xml;
          console.log(xml)
          text = JSON.stringify(xml, null, 2);
          console.log(text)
        } else {
          throw new Error("Unsupported file type");
        }
        updateDisplay(text, file.name, previewUrl, fileType, json, xml);
      }
    } catch (err) {
      console.error("An error occurred while uploading the file:", err);
    }
  };
  
  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  return (
    <Box 
      {...getRootProps()} 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '50px', 
        border: '2px dashed #000', 
        borderRadius: '15px', 
        m: 2, 
        p: 4, 
        backgroundColor: '#ffffff',
        padding: '2rem'
      }}
    >
      <input {...getInputProps()} />
      <Typography variant="body1">
        Drag and drop an image, pdf, doc, docx, txt, json or xml file here to parse, or click to select a file
      </Typography>
      
    </Box>
  );
};

export default Dropzone;
