import zod from "zod";

const envSchema = zod.object({
  DATABASE_URL: zod.string().min(1, "Please provide DATABASE_URL"),
  GOOGLE_CLIENT_ID: zod.string().min(1, "Please provide GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: zod
    .string()
    .min(1, "Please provide GOOGLE_CLIENT_SECRET"),
  NEXTAUTH_URL: zod.string().min(1, "Please provide NEXTAUTH_URL"),
  NEXTAUTH_SECRET: zod.string().min(1, "Please provide NEXTAUTH_SECRET"),
  GS_BUCKET_URL: zod.string().min(1, "Please provide GS_BUCKET_URL"),
  GS_CREDENTIALS: zod.string().min(1, "Please provide GS_CREDENTIALS"),
  GS_BUCKET_NAME: zod.string().min(1, "Please provide GS_BUCKET_NAME"),
  GS_LOCATION: zod.string().min(1, "Please provide GS_LOCATION"),
  PAYPAL_CLIENT_ID: zod.string().min(1, "Please provide PAYPAL_CLIENT_ID"),
  PAYPAL_CLIENT_SECRET: zod
    .string()
    .min(1, "Please provide PAYPAL_CLIENT_SECRET"),
  NODE_ENV: zod.string().min(1, "Please provide ").default("development"),
});

export const env = envSchema.parse(process.env);
