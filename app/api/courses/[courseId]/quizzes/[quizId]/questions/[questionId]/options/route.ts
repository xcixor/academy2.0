import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";

export async function POST(
  req: Request,
  {
    params,
  }: { params: { courseId: string; quizId: string; questionId: string } },
) {
  try {
    const user = await getLoggedInUser();
    const userId = user?.id;
    const { title } = await req.json();

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

    const lastOption = await db.option.findFirst({
      where: {
        questionId: params.questionId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastOption ? lastOption.position + 1 : 1;

    const question = await db.option.create({
      data: {
        title,
        questionId: params.questionId,
        position: newPosition,
      },
    });

    return NextResponse.json(question);
  } catch (error) {
    console.log("[QUIZZES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
