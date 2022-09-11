import { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors"
//Database connection
import clientPromise from '../../lib/mongodb'

//Database schema
/*
    Collection Portfolio
    [{
        "_id": {
            "$oid": "631102f03a93ff232d36926c"
        },
        "post": [
            {
            "_id": 1,
            "date": "",
            "title": "Titulo 1",
            "text": "Texto 1",
            "media": 111
            },
            {
            "_id": 2,
            "date": "",
            "title": "Titulo 1",
            "text": "Texto 1",
            "media": 111
            },
            {
            "_id": 3,
            "date": "",
            "title": "Titulo 1",
            "text": "Texto 1",
            "media": 111
            },
            {
            "_id": 4,
            "date": "",
            "title": "Titulo 1",
            "text": "Texto 1",
            "media": 111
            },
            {
            "_id": 5,
            "date": "",
            "title": "Titulo 1",
            "text": "Texto 1",
            "media": 111
            },
            {
            "_id": 6,
            "date": "",
            "title": "Titulo 1",
            "text": "Texto 1",
            "media": 111
            },
            {
            "_id": 7,
            "date": "",
            "title": "Titulo 1",
            "text": "Texto 1",
            "media": 111
            }
        ],
        "info": {
            "title": "TITLE",
            "seo": "SEO"
        }
        }]
*/


export default async (req: NextApiRequest, res: NextApiResponse) => {
    await NextCors(req, res, {
        // Options
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })

    //res.json({ message: "Hello Everyone!" })

    const client = await clientPromise

    /*const { slug } = req.body
    const admins = await client.collection('admin').get()
    const adminData = admins.docs.map(doc => doc.data())
    res.json(adminData)*/

    const db = client.db('hex')
    const collection = db.collection('portfolio')
    const result = await collection.find({}).toArray()
    //Filter post
    res.json(result)
}