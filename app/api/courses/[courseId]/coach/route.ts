import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const user = await getLoggedInUser();
    const userId = user?.id;
    const { courseId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
      include: {
        attachments: {
          orderBy: {
            createdAt: "desc",
          },
        },
        chapters: {
          orderBy: {
            position: "asc",
          },
        },
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COACH_COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
