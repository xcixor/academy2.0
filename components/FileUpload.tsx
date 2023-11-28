"use client";

import { useState } from "react";

import Dropzone from "react-dropzone";
import { CheckCircle2, Cloud, FileIcon, StopCircle } from "lucide-react";
import { Progress } from "./ui/progress";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { File } from "buffer";

interface FileUploadProps {
  uploadUrl: string;
  isFileEditing: boolean;
  toggleEdit?: () => void;
}

const UploadDropzone = ({
  uploadUrl,
  toggleEdit,
  isFileEditing,
}: FileUploadProps) => {
  const router = useRouter();

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const startUpload = async function (acceptedFile: File) {
    try {
      let formData = new FormData();
      formData.append("file", acceptedFile);
      if (isFileEditing) {
        await axios.patch(uploadUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post(uploadUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      toggleEdit();
      toast.success("Course updated");
      router.refresh();
      setIsError(false);
    } catch(error) {
      console.log(error, '#CLIENT ERROR')
      toast.error("Something went wrong");
    } finally {
      setIsUploading(false);
      setIsError(true);
    }
  };

  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 500);

    return interval;
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFile) => {
        setIsUploading(true);

        const progressInterval = startSimulatedProgress();

        // handle file uploading
        try {
          await startUpload(acceptedFile[0]);
          clearInterval(progressInterval);
          setUploadProgress(100);
        } catch (error) {
          console.log(error);
          setUploadProgress(95);
        }
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps({ onClick: (evt) => evt.preventDefault() })}
          className="m-4 h-64 rounded-lg border border-dashed border-gray-300"
        >
          <div className="flex h-full w-full items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <Cloud className="mb-2 h-6 w-6 text-zinc-500" />
                <p className="mb-2 text-sm text-zinc-700">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-zinc-500">PDF 4MB</p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div className="flex max-w-xs items-center divide-x divide-zinc-200 overflow-hidden rounded-md bg-white outline outline-[1px] outline-zinc-200">
                  <div className="grid h-full place-items-center px-3 py-2">
                    <FileIcon className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="h-full truncate px-3 py-2 text-sm">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className="mx-auto mt-4 w-full max-w-xs">
                  <Progress
                    indicatorColor={
                      uploadProgress === 100 ? "bg-green-500" : ""
                    }
                    value={uploadProgress}
                    className="h-1 w-full bg-zinc-200"
                  />
                  {uploadProgress === 100 ? (
                    <div className="flex items-center justify-center gap-1 pt-2 text-center text-sm text-zinc-700">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                    </div>
                  ) : null}
                </div>
              ) : null}

              {isError ? (
                <div className="mx-auto mt-4 w-full max-w-xs">
                  <Progress
                    indicatorColor="bg-red-500"
                    value={95}
                    className="h-1 w-full bg-zinc-200"
                  />

                  <div className="flex items-center justify-center gap-1 pt-2 text-center text-sm text-zinc-700">
                    <StopCircle className="h-3 w-3 text-red-500" />
                  </div>
                </div>
              ) : null}

              <input
                {...getInputProps()}
                type="file"
                id="dropzone-file"
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

export const FileUpload = ({
  uploadUrl,
  toggleEdit,
  isFileEditing,
}: FileUploadProps) => {
  return (
    <UploadDropzone
      uploadUrl={uploadUrl}
      toggleEdit={toggleEdit}
      isFileEditing={isFileEditing}
    />
  );
};
