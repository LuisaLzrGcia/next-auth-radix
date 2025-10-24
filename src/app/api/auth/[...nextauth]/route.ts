import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "user@email.com" },
                password: { label: "Password", type: "password" }
            },
            // async authorize(credentials, req) {
            //     const res = await fetch("/your/endpoint", {
            //         method: 'POST',
            //         body: JSON.stringify(credentials),
            //         headers: { "Content-Type": "application/json" }
            //     })
            //     const user = await res.json()

            //     if (res.ok && user) {
            //         return user
            //     }
            //     return null
            // }
            async authorize() {
                return null
            }
        })
    ],
    pages: {
        signIn: '/auth/login'
    },
    secret: process.env.NEXTAUTH_SECRET,

})

export { handler as GET, handler as POST }