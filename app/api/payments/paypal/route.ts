import { NextResponse, NextRequest } from "next/server";
import { sandboxURLs } from "./constants";
import { generateAccessToken } from "./token/generateAccessToken";
import { db } from "@/lib/db";
import { getLoggedInUser } from "@/lib/auth/utils";

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("************** in create route");
  const { ORDERS_API_URL } = sandboxURLs;
  const accessToken = await generateAccessToken();
  if (!accessToken) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await getLoggedInUser();
  const userId = user?.userId;

  const { courseId } = await req.json();
  console.log(courseId, "***********  **************8 %%%%%%%%%%%%");

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const payload = {
    intent: "CAPTURE",
    // change this block and dynamically get the order amount from session
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "10.00",
        },
      },
    ],
  };
  try {
    const response = await fetch(ORDERS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    console.log(`Create Order Call- ${JSON.stringify(data.status)}`);
    // Once order is created store the data using Prisma
    if (data.status === "CREATED") {
      await db.purchase.create({
        data: {
          orderID: data.id,
          userId,
          courseId,
        },
      });
      return NextResponse.json(data);
    } else {
      return new NextResponse("Purchase unsuccessful", { status: 500 });
    }
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
