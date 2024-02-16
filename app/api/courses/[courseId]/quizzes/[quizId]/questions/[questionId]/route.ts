import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";

export async function PATCH(
  req: Request,
  {
    params,
  }: { params: { courseId: string; quizId: string; questionId: string } },
) {
  try {
    const user = await getLoggedInUser();
    const userId = user?.id;
    const { isPublished, ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const questionOwner = await db.question.findUnique({
      where: {
        id: params.questionId,
        quizId: params.quizId,
      },
    });

    if (!questionOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const question = await db.question.update({
      where: {
        id: params.questionId,
        quizId: params.quizId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(question);
  } catch (error) {
    console.log("[QUESTION_QUIZ_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: { params: { courseId: string; quizId: string; questionId: string } },
) {
  try {
    const user = await getLoggedInUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.question.findUnique({
      where: {
        id: params.questionId,
        quizId: params.quizId,
      },
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const deletedQuestion = await db.question.delete({
      where: {
        id: params.questionId,
      },
    });

    return NextResponse.json(deletedQuestion);
  } catch (error) {
    console.log("[QUESTION_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  {
    params,
  }: { params: { courseId: string; quizId: string; questionId: string } },
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

    const quizOwner = await db.quiz.findUnique({
      where: {
        id: params.quizId,
        courseId: params.courseId,
      },
    });

    if (!courseOwner || !quizOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const question = await db.question.findUnique({
      where: { id: params.questionId },
      include: { options: true, responses: true },
    });
    return NextResponse.json(question);
  } catch (error) {
    console.log("[QUIZ_ID_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
