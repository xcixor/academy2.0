import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";

export async function PATCH(
  req: Request,
  { params }: { params: { sessionId: string } },
) {
  try {
    const user = await getLoggedInUser();
    const userId = user?.userId;
    const { sessionId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const session = await db.session.update({
      where: {
        id: sessionId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(session);
  } catch (error) {
    console.log("[SESSION_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { sessionId: string } },
) {
  try {
    const user = await getLoggedInUser();
    const userId = user?.userId;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const session = await db.session.findUnique({
      where: {
        id: params.sessionId,
      },
    });

    if (!session) {
      return new NextResponse("Not found", { status: 404 });
    }

    const deletedCourse = await db.session.delete({
      where: {
        id: params.sessionId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[SESSION_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
