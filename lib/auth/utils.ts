import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export interface SessionUser {
  userId?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export const getLoggedInUser = async (): Promise<SessionUser | null> => {
  const session = await getServerSession(options);
  const user = session?.user;
  if (user) {
    return {
      userId: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    };
  }
  return null;
};
