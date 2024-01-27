import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; quizId: string } },
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
        userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const publishedQuiz = await db.quiz.update({
      where: {
        id: params.quizId,
        courseId: params.courseId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedQuiz);
  } catch (error) {
    console.log("[CHAPTER_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
