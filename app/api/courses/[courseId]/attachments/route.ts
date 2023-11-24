import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";
import { FileUploader, generateSignedUrl } from "@/lib/gcp";
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
    const { file } = data;

    let customLocation = `courses/${params.courseId}/attachments`;
    const contentType: string = file.type;

    const uploader = new FileUploader(
      file.name,
      customLocation,
      contentType,
      "PUT",
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
      },
    });
    return NextResponse.json(attachment);
  } catch (error) {
    console.log("COURSE_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
