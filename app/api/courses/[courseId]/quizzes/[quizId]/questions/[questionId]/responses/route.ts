import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";

export async function POST(
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

    const courseOwner = await db.quiz.findUnique({
      where: {
        id: params.quizId,
        courseId: params.courseId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { optionId } = await req.json();
    const { questionId } = params;

    const question = await db.response.upsert({
      where: {
        userId_questionId: { userId, questionId },
      },

      create: {
        optionId: optionId,
        questionId: questionId,
        userId: userId,
      },
      update: {
        optionId: optionId,
        questionId: questionId,
        userId: userId,
      },
    });

    return NextResponse.json(question);
  } catch (error) {
    console.log("[RESPONSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
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

    const courseOwner = await db.quiz.findUnique({
      where: {
        id: params.quizId,
        courseId: params.courseId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { questionId } = params;

    const response = await db.response.findFirst({
      where: {
        userId,
        questionId,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.log("[RESPONSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
