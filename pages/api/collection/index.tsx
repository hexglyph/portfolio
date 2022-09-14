// Collection API - Create, Delete, Update, Get
import clientPromise from "../../../lib/mongodb"

export default async function handler(req, res) {
    const client = await clientPromise
    const db = client.db("hex")
    
    switch (req.method) {
        case "POST":
        // Add collection to database, get collection name from req.body and create collection in database
        let collection = req.body
        await db.createCollection(collection.name)
        res.status(200).json({ success: true })      
        break
        case "GET":
        // Get collection from database, get collection name from req.query and get collection from database
        let collectionName = req.query.name
        let getCollection = await db.collection(collectionName).find({}).toArray()
        res.json({ status: 200, data: getCollection })        
        break
        case "DELETE":
        // Delete collection from database, get collection name from req.body and delete collection from database
        console.log(req.body.name)
        let collectionNameDelete = req.body.name
        await db.collection(collectionNameDelete).drop()
        res.status(200).json({ success: true })        
        break        
    }
    }
