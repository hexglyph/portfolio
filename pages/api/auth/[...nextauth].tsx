/* eslint-disable */
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getCsrfToken, signIn } from "next-auth/react"
import bcrypt from "bcrypt"
import clientPromise from "../../../lib/mongodb"
import axios from "axios"


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
                role: { label: "Role", type: "text", placeholder: "admin" }
            },
            async authorize(credentials) {
                const client = await clientPromise
                const db = await client.db("hex")
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
    callbacks: {
       
        async session(session, token) {
            const client = await clientPromise
            const db = await client.db("hex")
            const collection = await db.collection("users")
            console.log(session.session.user.email)
            let user = await collection.findOne({ email: session.session.user.email })
            session.session.user.role = user.role
            console.log(session.session.user)

            return session
        }
    },
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    pages: {
        signIn: "/admin",
        error: "/login",
    },
    database: process.env.MONGODB_URI,
})

const loginUser = async ({password, user}) => {
    const response = await axios.post('http://localhost:3000/api/auth/signin', {
        email: user,
        password: password
    })
    return response.data
}