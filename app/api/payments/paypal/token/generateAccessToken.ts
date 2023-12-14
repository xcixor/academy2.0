import { sandboxURLs } from "../constants";
import { env } from "@/lib/env";

export const generateAccessToken = async () => {
  const { AUTH_API_URL } = sandboxURLs;

  const encodedToken = Buffer.from(
    env.PAYPAL_CLIENT_ID + ":" + env.PAYPAL_CLIENT_SECRET,
  ).toString("base64");
  const response = await fetch(AUTH_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Authorization: "Basic " + encodedToken,
    },
    body: "grant_type=client_credentials",
  });
  const { access_token } = await response.json();
  return access_token;
};
