/*import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import clientPromise from "../../../lib/mongodb"

export default NextAuth({
    session: {
        jwt: true,
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const client = await clientPromise
                const db = await client.db()
                const collection = await db.collection("users")
                const user = await collection.findOne({ email: credentials.email })
                if (!user) {
                    throw new Error("No user found")
                }
                const isValid = await bcrypt.compare(credentials.password, user.password)
                if (!isValid) {
                    throw new Error("Invalid password")
                }
                return user
            }
        })
    ],
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
        error: "/login",
    },
    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
            if (user) {
                token.id = user._id
            }
            return token
        }
    },
    database: process.env.NEXT_PUBLIC_MONGODB_URI,
})

const loginUser = async (email, password) => {
}
*/