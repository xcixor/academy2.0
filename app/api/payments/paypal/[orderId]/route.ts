import { NextResponse, NextRequest } from "next/server";
import { sandboxURLs } from "../constants";
import { generateAccessToken } from "../token/generateAccessToken";
import { db } from "@/lib/db";
import { PurchaseStatus } from "@prisma/client";
// import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { orderId: string } },
) {
  const orderId = params.orderId;

  if (!orderId) {
    return new NextResponse("Internal server error", { status: 500 });
  }

  const { ORDERS_API_URL } = sandboxURLs;
  const accessToken = await generateAccessToken();

  try {
    const response = await fetch(`${ORDERS_API_URL}/${orderId}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
    const { id, status } = await response.json();
    if (id && status === "COMPLETED") {
      await db.purchase.update({
        where: { orderID: id },
        data: { status: PurchaseStatus.COMPLETED },
      });
      return NextResponse.json({ id, status });
    } else {
      return new NextResponse("Purchase was not completed", { status: 500 });
    }
  } catch (error) {
    console.log("[ORDER_CAPTURE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
