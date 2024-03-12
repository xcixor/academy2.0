import { db } from "@/lib/db";
import { Role } from "@prisma/client";

export const getCoaches = async () => {
  try {
    const coaches = await db.user.findMany({
      where: {
        role: Role.COACH,
      },
      include: {
        profile: true,
      },
    });
    return coaches;
  } catch (error) {
    console.log("[GET_COACHES]", error);
    return [];
  }
};
