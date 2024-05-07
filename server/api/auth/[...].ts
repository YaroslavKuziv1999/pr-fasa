// file: ~/server/api/auth/[...].ts
import CredentialsProvider from "next-auth/providers/credentials";

import { NuxtAuthHandler } from "#auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

// @ts-ignore
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default NuxtAuthHandler({
  adapter: PrismaAdapter(prisma),
  secret: "your-secret-here",
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: "credentials",
      credentials: {
        id: { label: "id", type: "id" },
        email: { label: "email", type: "email" },
        password: { type: "password", label: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          throw createError({
            statusCode: 500,
            statusMessage: "Wrong credentials",
          });
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw createError({
            statusCode: 401,
            statusMessage: "User not found",
          });
        }

        const correctPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        console.log('correctPassword :', user.hashedPassword, credentials.password);
        if (!correctPassword) {
          throw createError({
            statusCode: 401,
            statusMessage: "Password is incorrect",
          });
        }
        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({token, user}) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.jwt = user ? (user as any).access_token || '' : '';
        token.id = user ? user.id || '' : '';
      }
      return Promise.resolve(token);
    },
    session: async ({session, token}) => {
      (session as any).uid = token.id;
      return Promise.resolve(session);
    },
  },
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
});
