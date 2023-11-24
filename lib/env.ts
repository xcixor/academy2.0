import zod from "zod";

const envSchema = zod.object({
  DATABASE_URL: zod.string().nonempty(),
  GOOGLE_CLIENT_ID: zod.string().nonempty(),
  GOOGLE_CLIENT_SECRET: zod.string().nonempty(),
  NEXTAUTH_URL: zod.string().nonempty(),
  NEXTAUTH_SECRET: zod.string().nonempty(),
  GS_BUCKET_URL: zod.string().nonempty(),
  GS_CREDENTIALS: zod.string().nonempty(),
  GS_BUCKET_NAME: zod.string().nonempty(),
  GS_LOCATION: zod.string().nonempty(),
});

export const env = envSchema.parse(process.env);
