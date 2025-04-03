import React, { useCallback } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useDropzone } from "react-dropzone";
import { Paper, Typography } from "@mui/material";

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onImageUpload(file);
      }
    },
    [onImageUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxSize: 3 * 1024 * 1024, // 3 MB
  });

  return (
    <Paper
      {...getRootProps()}
      elevation={3}
      sx={{
        p: 4,
        textAlign: "center",
        cursor: "pointer",
        borderRadius: "12px",
      }}
    >
      <input {...getInputProps()} />
      <UploadFileIcon sx={{ color: "#2196f3" }} />
      <Typography variant="body1" sx={{ mb: 0.5, color: "#333" }}>
        Link or drag and drop
      </Typography>
      <Typography variant="caption" sx={{ color: "gray" }}>
        PNG, JPG (max. 3MB)
      </Typography>
      {isDragActive && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          Drop the image here...
        </Typography>
      )}{" "}
    </Paper>
  );
};

export default ImageUpload;
