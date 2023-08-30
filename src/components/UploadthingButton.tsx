"use client";
import React, { useState } from "react";
import axios from "axios";
import { UploadButton } from "@/utils/uploadthing";
import "@uploadthing/react/styles.css";
import { Icons } from "./ui/Icons";
interface UploadthingButtonProps {
  setImageUrl: (fileUrl: string) => void;
}

const UploadthingButton: React.FC<UploadthingButtonProps> = ({
  setImageUrl,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="relative hover:cursor">
      <Icons.Image className="absolute top-0 right-0" size={20} />
      <div className="opacity-50">
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            if (typeof res === "undefined") return;
            const url = res[0]?.url as string;
            setImageUrl(url);
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
          className=""
        />
      </div>
    </div>
  );
};

export default UploadthingButton;
