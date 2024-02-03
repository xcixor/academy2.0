import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";
import { createFileMetaData } from "@/app/api/actions/create-file-metadata";

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

    const { title } = await req.json();

    const lastAttachment = await db.attachment.findFirst({
      where: {
        courseId: params.courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastAttachment ? lastAttachment.position + 1 : 1;

    const attachment = await db.attachment.create({
      data: {
        title,
        courseId: params.courseId,
        position: newPosition,
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "Success.", attachment }),
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log("COURSE_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
