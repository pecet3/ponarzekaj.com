"use client";
import React, { useState } from "react";
import axios from "axios";
import { UploadButton } from "@/utils/uploadthing";
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
      <Icons.Image className="absolute top-0.5 right-0.5 z-10" size={20} />
      📷
      <div className="">
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
          className="ut-button:bg-blue-600 ut-button:text-xs ut-allowed-content:hidden ut-button:w-8 ut-button:h-8"
        />
      </div>
    </div>
  );
};

export default UploadthingButton;
