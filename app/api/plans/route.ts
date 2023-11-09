import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";

export async function GET(req: Request) {
  try {
    const user = await getLoggedInUser();
    const userId = user?.userId;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const plans = await db.plan.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(plans);
  } catch (error) {
    console.log("[plans]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
