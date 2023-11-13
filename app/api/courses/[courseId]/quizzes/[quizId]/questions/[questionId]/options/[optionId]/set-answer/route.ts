import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      courseId: string;
      quizId: string;
      questionId: string;
      optionId: string;
    };
  }
) {
  try {
    const user = await getLoggedInUser();
    const userId = user?.userId;

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

    await db.option.updateMany({
      where: {
        NOT: {
          id: params.optionId,
        },
      },
      data: { isAnswer: { set: false } },
    });

    const option = await db.option.update({
      where: {
        id: params.optionId,
        questionId: params.questionId,
      },
      data: {
        isAnswer: true,
      },
    });

    return NextResponse.json(option);
  } catch (error) {
    console.log("[OPTION_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
