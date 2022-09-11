//MongoDB
import Adapters from "next-auth/adapters"
import clientPromise from "../lib/mongodb"

export const UserSchema = {
    name: "User",
    collection: "users",
    schema: {
        _id: { type: String, index: true },
        name: { type: String, index: true },
        email: { type: String, index: true },
        image: { type: String, index: true },
        role: { type: String, index: true },
        password: { type: String, index: true },
        emailVerified: { type: Date, index: true },
        createdAt: { type: Date, index: true },
        updatedAt: { type: Date, index: true },
    },
    options: {
        id: "_id",
        indexes: [
            { key: { email: 1 } },
            { key: { name: 1 } },
            { key: { role: 1 } },
        ],
    },
}