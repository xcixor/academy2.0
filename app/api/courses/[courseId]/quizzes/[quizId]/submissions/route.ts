import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";

export async function POST(
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
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownQuiz = await db.quiz.findUnique({
      where: {
        id: params.quizId,
      },
    });

    if (!ownQuiz) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const submission = await db.submission.create({
      data: {
        quizId: params.quizId,
        userId: userId,
      },
    });

    return NextResponse.json(submission);
  } catch (error) {
    console.log("[QUIZZES_SUBMISSION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
