import { getServerSession } from "next-auth";
import { Session } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

// export interface SessionUser {
//   userId?: string | null;
//   name?: string | null;
//   email?: string | null;
//   image?: string | null;
// }

export type SessionUser = Session["user"];

export const getLoggedInUser = async (): Promise<SessionUser | null> => {
  const session = await getServerSession(options);
  const user = session?.user;
  if (user) {
    return user;
  }
  return null;
};
