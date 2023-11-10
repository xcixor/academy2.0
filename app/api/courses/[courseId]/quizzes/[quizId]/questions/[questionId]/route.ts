import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";

export async function PATCH(
  req: Request,
  {
    params,
  }: { params: { courseId: string; quizId: string; questionId: string } }
) {
  try {
    const user = await getLoggedInUser();
    const userId = user?.userId;
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
  }: { params: { courseId: string; quizId: string; questionId: string } }
) {
  try {
    const user = await getLoggedInUser();
    const userId = user?.userId;

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

    const deletedCourse = await db.question.delete({
      where: {
        id: params.questionId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
