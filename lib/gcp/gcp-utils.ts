import { getFileExtension } from "../files";
import { FileUploader } from "./gcp";

const UPLOAD_EXPIRY_IN_SECONDS = new Date(Date.now() + 24 * 60 * 60 * 1000);
export const DOWNLOAD_EXPIRY_IN_SECONDS = new Date(
  Date.now() + 7 * 24 * 60 * 60 * 1000,
);

export async function uploadFile(file: File, fileName: string) {
  const contentType: string = getFileExtension(file);
  console.log(contentType,'yipeee')
  const downloadExpiryDate = UPLOAD_EXPIRY_IN_SECONDS;
  const uploader = new FileUploader(
    fileName,
    contentType,
    "PUT",
    downloadExpiryDate,
  );
  const cloudResponse = await uploader.uploadFile(file);
  return cloudResponse;
}
