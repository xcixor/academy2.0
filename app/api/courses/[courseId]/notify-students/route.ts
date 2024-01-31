import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";
import { Role } from "@prisma/client";

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } },
) {
  try {
    const user = await getLoggedInUser();
    const userId = user?.id;

    if (!userId || !(user.role === Role.COACH)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: { id: params.courseId },
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    const { title, type } = await req.json();
    const message = `A new course "${course.title}" has just been released`;

    // Add filter for students
    const students = await db.user.findMany();
    for (const student of students) {
      const notification = await db.notification.create({
        data: {
          creatorId: userId,
          title,
          message,
          recepientId: student.id,
          type,
        },
      });
      if (!notification) {
        throw new Error("Notification creation failed");
      }
    }

    await db.course.update({
      where: { id: course.id },
      data: { notificationSent: true },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[NOTIFICATION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
