import { NextResponse } from "next/server";
import { File } from "form-data";
import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";
import { FileUploader } from "@/lib/gcp";
import axios from "axios";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const user = await getLoggedInUser();
    const userId = user?.userId;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    const data = Object.fromEntries(formData);
    const { file }: { file: File } = data as { file: File };

    let blobName = `courses/${params.courseId}/attachments/${file.name}`;
    const contentType: string = file.type;
    const downloadExpiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const uploader = new FileUploader(
      blobName,
      contentType,
      "PUT",
      downloadExpiryDate,
    );

    const cloudResponse = await uploader.uploadFile(file);

    if (cloudResponse.status !== 200) {
      return new NextResponse("Internal Error", { status: 500 });
    }

    const attachment = await db.attachment.create({
      data: {
        url: cloudResponse.downloadUrl,
        name: file.name,
        courseId: params.courseId,
        type: contentType,
      },
    });

    const gcpData = await db.gCPData.create({
      data: {
        assetId: attachment.id,
        urlExpiryDate: downloadExpiryDate,
        blobName: blobName,
      },
    });
    await db.attachment.update({
      where: {
        id: attachment.id,
      },
      data: {
        gCPDataId: gcpData.id,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("COURSE_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
