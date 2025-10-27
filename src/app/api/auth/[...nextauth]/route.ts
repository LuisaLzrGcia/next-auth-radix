import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "user@email.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any, req) {
                if (!credentials) throw new Error("No se proporcionaron credenciales");

                const { email, password } = credentials;

                // Buscar usuario por email
                const userFound = await prisma.user.findUnique({ where: { email } });

                if (!userFound) {
                    throw new Error("Usuario no encontrado");
                }

                // Verificar contraseña
                const isPasswordValid = await bcrypt.compare(password, userFound.password);
                if (!isPasswordValid) {
                    throw new Error("Contraseña incorrecta");
                }

                // Excluir la contraseña antes de devolver el usuario
                const { password: _pwd, ...userData } = userFound;

                return {
                    ...userData,
                    id: String(userData.id), // convertir id a string si es necesario
                };
            }

        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
});

export { handler as GET, handler as POST };
