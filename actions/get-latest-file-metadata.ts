import { FileUploader } from "@/lib/gcp/gcp";
import { DOWNLOAD_EXPIRY_IN_SECONDS } from "@/lib/gcp/gcp-utils";
import { db } from "@/lib/db";

export async function getLatestFileMetaData(assetId: string) {
  const metaData = await db.gCPData.findFirst({
    where: {
      assetId: assetId,
    },
  });
  if (metaData) {
    const targetDate = metaData.urlExpiryDate; // Replace with your target date

    const currentDate = new Date(); // Get the current date
    const twoDaysFromNow = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 2,
    ); // Calculate 2 days from now

    if (targetDate <= twoDaysFromNow) {
      console.log("The target date is 2 days or less from today's date.");
      const uploader = new FileUploader(
        metaData.blobName,
        metaData.assetType,
        "PUT",
        DOWNLOAD_EXPIRY_IN_SECONDS,
      );
      const url = await uploader.generateSignedDownloadUrl();
      if (url) {
        const updatedStorageMetaData = db.gCPData.update({
          where: {
            id: metaData.id,
          },
          data: {
            downloadUrl: url,
            urlExpiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
        return updatedStorageMetaData;
      }
    }
  }

  return metaData;
}
