import checkoutNodeJssdk from "@paypal/checkout-server-sdk";
import { env } from "./env";

const configureEnvironment = function () {
  const clientId = env.PAYPAL_CLIENT_ID;
  const clientSecret = env.PAYPAL_CLIENT_SECRET;

  return env.NODE_ENV === "production"
    ? new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret)
    : new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
};

const client = function () {
  return new checkoutNodeJssdk.core.PayPalHttpClient(configureEnvironment());
};

export default client;
