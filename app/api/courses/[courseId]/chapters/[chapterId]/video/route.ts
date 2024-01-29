import { NextResponse } from "next/server";
import { File } from "form-data";
import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";
import { createFileMetaData } from "@/app/api/actions/create-file-metadata";

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

    let fileName = `courses/${params.courseId}/chapters/${params.chapterId}/video/${file.name}`;

    const dbResponse = await createFileMetaData({
      file,
      assetId: params.chapterId,
      fileName,
    });

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
