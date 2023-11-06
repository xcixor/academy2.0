import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("postSlug");
  try {
    const comments = await db.comment.findMany({
      where: {
        ...(courseId && { courseId }),
      },
      include: { user: true },
    });

    return NextResponse.json(comments);
  } catch (err) {
    console.log("[COMMENT]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
