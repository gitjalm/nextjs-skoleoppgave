import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient, Roles } from "@/generated/prisma/client";
import { db } from "./db";
import { username, haveIBeenPwned } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        default: "USER",
        enum: Roles,
      },
      username: {
        type: "string",
        unique: true,
      },
    },
  },
  plugins: [
    username(),
    haveIBeenPwned({
      customPasswordCompromisedMessage: "Please choose a more secure password.",
    }),
  ],
});
