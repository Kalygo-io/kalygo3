import { errorReporter } from "@/shared/errorReporter";
import {
  XCircleIcon,
  DocumentDuplicateIcon,
  DocumentIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  files: File[] | null;
  setFiles: Dispatch<SetStateAction<File[] | null>>;
}

export function ChooseFile(props: Props) {
  const { files, setFiles } = props;
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFiles(files);
  }, []);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      const dataTransferFiles = e.dataTransfer?.files;
      for (let i = 0; i < dataTransferFiles.length; i++) {
        if (!["text/plain"].includes(dataTransferFiles[i]?.type)) {
          setDragActive(false);
          return;
        }
      }
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (files && files.length >= 1) {
        return;
      }

      if (e.dataTransfer.files) {
        const validFiles = Array.from(e.dataTransfer.files).filter((file) =>
          ["text/plain"].includes(file.type)
        );
        setFiles((prevFiles) =>
          prevFiles ? [...prevFiles, ...validFiles] : validFiles
        );
      }
    } catch (e) {
      errorReporter(e);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      e.preventDefault();

      if (files && files.length >= 1) {
        return;
      }

      if (e.target.files) {
        setFiles((prevFiles) =>
          prevFiles
            ? // @ts-ignore
              [...prevFiles, ...Array.from(e.target.files)]
            : // @ts-ignore
              Array.from(e.target.files)
        );
      }
    } catch (e) {
      errorReporter(e);
    }
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      // Here you would typically make an API call to upload the files
      // For now, we'll just simulate success
      console.log("Files uploaded:", files);

      // Clear files after successful upload
      setFiles(null);
      if (inputRef.current) inputRef.current.value = "";
    } catch (e) {
      errorReporter(e);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="col-span-full flex justify-center">
          <form id="form-file-upload" onSubmit={(e) => e.preventDefault()}>
            <div
              id="label-file-upload"
              className={`relative mt-0 flex justify-center rounded-lg border border-dashed border-gray-700 mb-4 px-6 pt-2 pb-6 ${
                dragActive ? "bg-gray-800" : ""
              }`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <div>
                <Square2StackIcon
                  className="mx-auto h-12 w-12 text-white"
                  aria-hidden="true"
                />

                <div className="mb-2 mt-2 flex items-center justify-center text-sm leading-6">
                  <label
                    htmlFor="input-file-upload"
                    className="relative cursor-pointer rounded-md font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                  >
                    <button
                      type="button"
                      className="rounded bg-blue-600 px-2 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      onClick={() => {
                        inputRef.current?.click();
                      }}
                    >
                      Select TXT file
                      <input
                        ref={inputRef}
                        type="file"
                        id="input-file-upload"
                        multiple={true}
                        onChange={handleChange}
                        accept=".txt"
                        className="sr-only"
                      />
                    </button>
                  </label>
                </div>
                <p className="text-xs leading-5 text-gray-400">
                  <sup>*</sup>Supports .txt
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ul role="list" className="divide-y divide-gray-700">
        {files &&
          files.map((file, index) => (
            <li
              key={index}
              className="flex items-center justify-between gap-x-2 py-5"
            >
              <div className="flex items-start gap-x-2 truncate">
                <p className="text-sm font-semibold leading-6 truncate text-white">
                  {file.name}
                </p>
                <XCircleIcon
                  className="h-6 w-6 cursor-pointer text-gray-400 hover:text-red-400"
                  onClick={() => {
                    const newFileList = files.filter((_, i) => i !== index);
                    setFiles(newFileList);
                    if (inputRef.current) inputRef.current.value = "";
                  }}
                />
              </div>
            </li>
          ))}
      </ul>

      {/* Upload Button and Progress */}
      {files && files.length > 0 && (
        <div className="mt-6 space-y-4">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading..." : "Upload to Knowledge Base"}
          </button>

          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Uploading files...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
