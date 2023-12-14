import { NextResponse, NextRequest } from "next/server";
import { sandboxURLs } from "../constants";
import { generateAccessToken } from "./generateAccessToken";

export async function GET(req: NextRequest, res: NextResponse) {
  const { CLIENT_TOKEN_URL } = sandboxURLs;

  const access_token = await generateAccessToken();
  if (!access_token) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const clientTokenResponse = await fetch(CLIENT_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
      "Accept-Language": "en_US",
    },
  });
  const { client_token } = await clientTokenResponse.json();
  return NextResponse.json({ token: client_token });
}
