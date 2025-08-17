import { errorReporter } from "@/shared/errorReporter";
import {
  XCircleIcon,
  DocumentDuplicateIcon,
  DocumentIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  callUploadChatWithTxt,
  UploadResponse,
} from "@/services/callUploadChatWithTxt";
import { successToast, errorToast } from "@/shared/toasts";

interface Props {
  files: File[] | null;
  setFiles: Dispatch<SetStateAction<File[] | null>>;
  onUploadSuccess?: () => void;
}

export function ChooseFile(props: Props) {
  const { files, setFiles } = props;
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResults, setUploadResults] = useState<UploadResponse[]>([]);
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
    setUploadResults([]);

    try {
      const results: UploadResponse[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const progress = Math.round(((i + 1) / files.length) * 100);
        setUploadProgress(progress);

        try {
          const result = await callUploadChatWithTxt(file);
          results.push(result);

          if (result.success) {
            successToast(
              `Successfully uploaded ${result.filename}: ${result.successful_uploads} chunks created`
            );
          } else {
            errorToast(`Failed to upload ${result.filename}: ${result.error}`);
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Upload failed";
          errorToast(`Failed to upload ${file.name}: ${errorMessage}`);
          results.push({
            filename: file.name,
            total_chunks_created: 0,
            successful_uploads: 0,
            failed_uploads: 1,
            namespace: "chat_with_txt",
            file_size_bytes: file.size,
            success: false,
            error: errorMessage,
          });
        }
      }

      setUploadResults(results);

      // Clear files after upload attempt
      setFiles(null);
      if (inputRef.current) inputRef.current.value = "";

      // Call onUploadSuccess callback if provided
      if (props.onUploadSuccess) {
        props.onUploadSuccess();
      }
    } catch (e) {
      errorReporter(e);
      errorToast("Upload failed. Please try again.");
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

          {/* Upload Results */}
          {!uploading && uploadResults.length > 0 && (
            <div className="mt-4 space-y-3">
              <h4 className="text-sm font-semibold text-white">
                Upload Results:
              </h4>
              {uploadResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    result.success
                      ? "bg-green-900/20 border-green-700/30"
                      : "bg-red-900/20 border-red-700/30"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-white">
                        {result.filename}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {result.successful_uploads} chunks uploaded successfully
                        {result.failed_uploads > 0 &&
                          `, ${result.failed_uploads} failed`}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        result.success ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {result.success ? "✓ Success" : "✗ Failed"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
