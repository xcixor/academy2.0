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
  },
) {
  try {
    const user = await getLoggedInUser();
    const userId = user?.id;
    const { isAnswer, ...values } = await req.json();

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

    const option = await db.option.update({
      where: {
        id: params.optionId,
        questionId: params.questionId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(option);
  } catch (error) {
    console.log("[OPTION_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
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
  },
) {
  try {
    const user = await getLoggedInUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const option = await db.option.findUnique({
      where: {
        id: params.optionId,
        questionId: params.questionId,
      },
    });

    if (!option) {
      return new NextResponse("Not found", { status: 404 });
    }

    const deletedOption = await db.option.delete({
      where: {
        id: params.optionId,
      },
    });

    return NextResponse.json(deletedOption);
  } catch (error) {
    console.log("[OPTION_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
