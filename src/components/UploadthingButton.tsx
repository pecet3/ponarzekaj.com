import React from "react";
import axios from "axios";
import { UploadButton } from "@/utils/uploadthing";

interface UploadthingButtonProps {
  onImageUpload: (fileUrl: string) => void;
}

const UploadthingButton: React.FC<UploadthingButtonProps> = ({
  onImageUpload,
}) => {
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files && event.target.files[0];

    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await axios.post("/api/uploadthing", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data && onImageUpload) {
          onImageUpload(response.data.fileUrl);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (typeof res === "undefined") return;
          const url = res[0]?.fileUrl as string;
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
        appearance={{
          button:
            "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400 text-transparent h-4",
          container: "w-8 flex-row rounded-md border-cyan-300 bg-slate-800 m-0",
          allowedContent: "hidden",
        }}
      />
    </div>
  );
};

export default UploadthingButton;
