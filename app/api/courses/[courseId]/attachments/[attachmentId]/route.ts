import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";
import { deleteGCPObject } from "@/lib/gcp/gcp-utils";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; attachmentId: string } },
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

    const asset = await db.gCPData.findUnique({
      where: {
        assetId: params.attachmentId,
      },
    });
    if (asset) {
      const res = await deleteGCPObject(asset.blobName);
      if (res.status !== 200) {
        return new NextResponse("Internal Error", { status: 500 });
      }
      await db.gCPData.delete({
        where: { assetId: params.attachmentId },
      });
    }
    const attachment = await db.attachment.delete({
      where: {
        courseId: params.courseId,
        id: params.attachmentId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("ATTACHMENT_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; attachmentId: string } },
) {
  try {
    const user = await getLoggedInUser();
    const userId = user?.id;
    const { courseId } = params;
    const values = await req.json();

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

    const course = await db.attachment.update({
      where: {
        id: params.attachmentId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
