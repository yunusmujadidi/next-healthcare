import { useDropzone } from "react-dropzone";
import { useUploadThing } from "@/lib/uploadthing";
import { LucideUploadCloud } from "lucide-react";
import Image from "next/image";
import React, { useCallback } from "react";

type FileUploaderProps = {
  value: string | undefined;
  onChange: (url: string) => void;
};

export const FileUploader = ({ value, onChange }: FileUploaderProps) => {
  const { startUpload } = useUploadThing("imageUploader");

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const uploadedFiles = await startUpload(acceptedFiles);
      if (uploadedFiles && uploadedFiles[0]) {
        onChange(uploadedFiles[0].url);
      }
    },
    [onChange, startUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="text-12-regular flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-dashed border-dark-500 bg-dark-400 p-7"
    >
      <input {...getInputProps()} />
      {value ? (
        <Image
          src={value}
          width={1000}
          height={1000}
          alt="uploaded file"
          className="max-h-[400px] overflow-hidden object-contain"
        />
      ) : (
        <>
          <LucideUploadCloud size={24} />
          <div className="file-upload_label">
            <p className="text-14-regular">
              <span className="text-green-500">Click to upload </span>
              or drag and drop
            </p>
            <p>SVG, PNG, JPG, or GIF (max 4MB)</p>
          </div>
        </>
      )}
    </div>
  );
};
