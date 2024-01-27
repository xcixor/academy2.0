import { NextResponse } from "next/server";
import { File } from "form-data";
import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";
import { FileUploader } from "@/lib/gcp";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const user = await getLoggedInUser();
    const userId = user?.id;

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

    let blobName = `courses/${params.courseId}/chapters/${params.chapterId}/video/${file.name}`;
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

    const existingGCPVideo = await db.gCPData.findFirst({
      where: {
        assetId: params.chapterId,
      },
    });

    if (existingGCPVideo) {
      await db.gCPData.delete({
        where: {
          id: existingGCPVideo.id,
        },
      });
    }

    const gcpData = await db.gCPData.create({
      data: {
        assetId: params.chapterId,
        urlExpiryDate: downloadExpiryDate,
        blobName: blobName,
        assetName: file.name,
        assetType: contentType,
      },
    });

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
      },
      data: {
        gCPDataId: gcpData.id,
        videoUrl: cloudResponse.downloadUrl,
      },
    });

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("COURSE_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
