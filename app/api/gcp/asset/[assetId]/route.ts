import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";
import { DOWNLOAD_EXPIRY_IN_SECONDS } from "@/lib/gcp/gcp-utils";
import { FileUploader } from "@/lib/gcp/gcp";

export async function PUT(req: NextRequest) {
  try {
    const user = await getLoggedInUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { blobName, contentType, assetId, assetName, downloadUrl } =
      await req.json();
    console.log(blobName, contentType, assetId, assetName, downloadUrl);

    if (!blobName || !contentType || !assetId || !assetName || !downloadUrl) {
      return new NextResponse(JSON.stringify({ message: "Bad Request" }), {
        status: 400,
      });
    }

    const existingMetadata = await db.gCPData.findUnique({
      where: {
        assetId: assetId,
      },
    });

    if (existingMetadata) {
      console.log("vill delete **************");
      const uploader = new FileUploader(
        existingMetadata.blobName,
        contentType,
        "PUT",
        DOWNLOAD_EXPIRY_IN_SECONDS,
      );
      await uploader.deleteBlob();
    }

    await db.gCPData.upsert({
      where: { assetId: assetId },
      create: {
        assetId: assetId,
        urlExpiryDate: DOWNLOAD_EXPIRY_IN_SECONDS,
        blobName: blobName,
        assetName: assetName,
        assetType: contentType,
        downloadUrl: downloadUrl,
      },
      update: {
        urlExpiryDate: DOWNLOAD_EXPIRY_IN_SECONDS,
        blobName: blobName,
        assetName: assetName,
        assetType: contentType,
        downloadUrl: downloadUrl,
      },
    });
    return new NextResponse(JSON.stringify({ message: "Success." }), {
      status: 200,
    });
  } catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
