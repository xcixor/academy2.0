import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";

export async function POST(req: NextRequest) {
  try {
    const user = await getLoggedInUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { calendlyURL } = await req.json();

    if (!calendlyURL) {
      return new NextResponse("Url is required", { status: 403 });
    }

    const requisite = await db.coachRequisites.upsert({
      where: { coachId: user.id },
      create: {
        coachId: user.id,
        calendlyURL,
      },
      update: { calendlyURL },
    });

    return NextResponse.json(requisite);
  } catch (error) {
    console.log("[REQUISITE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
