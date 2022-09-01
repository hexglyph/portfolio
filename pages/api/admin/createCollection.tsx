//API Create Collection

import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "../../../lib/mongodb"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise
    const db = await client.db('hex')
    //Create Collection by name from request body
    const collection = await db.createCollection(req.body.name)
    res.status(200).json({ collection })
}
