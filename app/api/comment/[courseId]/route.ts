import { getLoggedInUser } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await getLoggedInUser();
    const userId = user?.userId;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { message } = await req.json();
    const { courseId } = params;

    const comment = await db.comment.create({
      data: { message: message, userId, courseId },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.log("[COMMENT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
