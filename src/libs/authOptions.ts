// src/libs/authOptions.ts
import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "user@email.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any) {
                if (!credentials) throw new Error("No se proporcionaron credenciales");

                const { email, password } = credentials;

                const userFound = await prisma.user.findUnique({ where: { email } });
                if (!userFound) throw new Error("Usuario no encontrado");

                const isPasswordValid = await bcrypt.compare(password, userFound.password);
                if (!isPasswordValid) throw new Error("Contraseña incorrecta");

                const { password: _pwd, ...userData } = userFound;

                return {
                    id: userData.id + "",
                    name: userData.name,
                    email: userData.email,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.id = user.id;
            return token;
        },
        async session({ session, token }) {
            if (session.user) session.user.id = token.id as string;
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
    },
};
