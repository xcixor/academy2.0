import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const user = await getLoggedInUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        chapters: true,
      },
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const { isFree } = await req.json();

    if (isFree) {
      await Promise.all(
        course.chapters.map(async (chapter) => {
          if (!chapter.isFree) {
            return await db.chapter.update({
              where: {
                id: chapter.id,
              },
              data: {
                isFree: true,
              },
            });
          }
          return chapter;
        }),
      );
      await db.course.update({
        where: {
          id: course.id,
        },
        data: {
          isFree: true,
          price: 0,
        },
      });
    } else {
      await db.course.update({
        where: {
          id: course.id,
        },
        data: {
          isFree: false,
        },
      });
    }

    return NextResponse.json({ message: "Success" });
  } catch (error) {
    console.log("[COURSE_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
