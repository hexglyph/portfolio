// posts.js
import clientPromise from "../../lib/mongodb"

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db("hex")
  let posts = await db.collection("posts")

  switch (req.method) {
    case "POST":
      // Add post to database
      let post = req.body
      await posts.insertOne(post)
      res.status(200).json({ success: true })      
      break
    case "GET":
      const allPosts = await db.collection("posts").find({}).toArray()
      res.json({ status: 200, data: allPosts })
      break
    /*case "PUT":
      bodyObject = JSON.parse(req.body)
      myPost = await db.collection("posts").updateOne({ _id: bodyObject._id }, { $set: bodyObject })
      res.json(myPost)
      break
    case "DELETE":
      bodyObject = JSON.parse(req.body)
      myPost = await db.collection("posts").deleteOne({ _id: bodyObject._id })
      res.json(myPost)
      break    
    */
  }
}