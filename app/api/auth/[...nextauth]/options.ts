import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { env } from "@/lib/env";
import { db } from "@/lib/db";

interface CustomSessionCallbackData {
  session: Session;
  token: JWT;
}

type CredentialsUser = {
  user: {
    iss: string;
    azp: string;
    aud: string;
    sub: string;
    email: string;
    email_verified: boolean;
    at_hash: string;
    name: string;
    picture: string;
    given_name: string;
    locale: string;
    iat: number;
    exp: number;
    role: string;
    id: string;
  };
};

type CustomJwtCallbackData = {
  token: JWT;
  user: Session["user"] | null;
};

export const options = {
  providers: [
    GoogleProvider({
      profile(profile: GoogleProfile) {
        let userRole = "Google User";

        return {
          ...profile,
          role: userRole,
          id: profile.sub,
        };
      },
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials) {
            return null;
          }
          const foundUser = await db.user.findUnique({
            where: { email: credentials?.email },
          });

          if (foundUser) {
            const match = await bcrypt.compare(
              credentials.password,
              foundUser.password!!,
            );

            if (match) {
              const { password, ...userWithoutPassword } = foundUser;
              return userWithoutPassword;
            }
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: CustomJwtCallbackData) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: CustomSessionCallbackData) {
      if (session?.user) {
        session.user.role = token.role;
        const sessionUser = await db.user.findUnique({
          where: { email: session.user.email!! },
        });
        session.user.id = sessionUser?.id!!;
        session.user.userId = sessionUser?.id!!;
        session.user.isAdmin = sessionUser?.isAdmin!!;
        session.user.isCoach = sessionUser?.isCoach!!;
        session.user.isStaff = sessionUser?.isStaff!!;
      }

      return session;
    },
    async signIn({ user }: CredentialsUser) {
      try {
        // check if user already exists
        const userExists = await db.user.findUnique({
          where: { email: user.email },
        });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await db.user.create({
            data: {
              email: user.email,
              name: user.name.replace(" ", "").toLowerCase(),
              image: user.picture,
            },
          });
        }

        return true;
      } catch (error: any) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
};
