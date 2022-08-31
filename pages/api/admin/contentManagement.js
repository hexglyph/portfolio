//Content Management API

import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "../../../lib/mongodb"

export default async function handler(req, res) {
    const client = await clientPromise
    const db = client.db("hex")
    const collection = db.collection("portfolio")
    const { method } = req
    
    switch (method) {
        case "GET":
        try {
            const content = await collection.find({}).toArray()
            res.status(200).json({ success: true, data: content })
        } catch (error) {
            res.status(400).json({ success: false })
        }
        break
        case "POST":
        try {
            const content = await collection.insertOne(req.body)
            res.status(201).json({ success: true, data: content })
        } catch (error) {
            res.status(400).json({ success: false })
        }
        break
        case "PUT":
        try {
            const content = await collection.updateOne({ _id: req.body._id }, { $set: req.body })
            res.status(201).json({ success: true, data: content })
        } catch (error) {
            res.status(400).json({ success: false })
        }
        break
        default:
        res.status(400).json({ success: false })
        break
        
    }
}

