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
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.quiz.findUnique({
      where: {
        id: params.quizId,
        courseId: params.courseId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const lastQuestion = await db.question.findFirst({
      where: {
        quizId: params.quizId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastQuestion ? lastQuestion.position + 1 : 1;

    const question = await db.question.create({
      data: {
        title,
        quizId: params.quizId,
        position: newPosition,
      },
    });

    return NextResponse.json(question);
  } catch (error) {
    console.log("[QUIZZES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
