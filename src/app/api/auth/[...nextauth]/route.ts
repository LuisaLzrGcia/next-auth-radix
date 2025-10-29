import { authOptions } from "@/libs/authOptions";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
