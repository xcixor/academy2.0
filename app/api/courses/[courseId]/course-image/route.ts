import { NextResponse } from "next/server";
import { File } from "form-data";
import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";
import { FileUploader } from "@/lib/gcp";
import { MAX_IMAGE_SIZE, ALLOWED_IMAGE_TYPES } from "@/constants";
import { createFileMetaData } from "@/app/api/actions/create-file-metadata";
import validateImageFile from "@/lib/files";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } },
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

    // let blobName = `courses/${params.courseId}/attachments/${file.name}`;
    // const contentType: string = file.type;
    // const downloadExpiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    // const uploader = new FileUploader(
    //   blobName,
    //   contentType,
    //   "PUT",
    //   downloadExpiryDate,
    // );

    // const cloudResponse = await uploader.uploadFile(file);

    //   validate image
    const { status, message } = validateImageFile(
      file,
      ALLOWED_IMAGE_TYPES,
      MAX_IMAGE_SIZE,
    );
    if (status !== 200) {
      return new NextResponse(JSON.stringify(message[0]), { status: 400 });
    }

    // if (cloudResponse.status !== 200) {
    //   return new NextResponse("Internal Error", { status: 500 });
    // }

    const fileName = `courses/${params.courseId}/image/${file.name}`;
    const dbResponse = await createFileMetaData({
      file,
      assetId: params.courseId,
      fileName,
    });

    // await db.gCPData.create({
    //   data: {
    //     assetId: params.courseId,
    //     urlExpiryDate: downloadExpiryDate,
    //     blobName: blobName,
    //     assetName: file.name,
    //     assetType: contentType,
    //   },
    // });

    // const course = await db.course.update({
    //   where: {
    //     id: params.courseId,
    //   },
    //   data: {
    //     imageUrl: cloudResponse.downloadUrl,
    //   },
    // });

    // return NextResponse.json(course);

    if (dbResponse.status === 200) {
      return new NextResponse(JSON.stringify(dbResponse.message), {
        status: 200,
      });
    } else {
      return new NextResponse(dbResponse.message, { status: 500 });
    }
  } catch (error) {
    console.log("COURSE_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
