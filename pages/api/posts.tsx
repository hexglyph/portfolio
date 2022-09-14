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
    case "DELETE":
      // Delete post from database
      let id = req.body.id
      await posts.deleteOne({ _id: id })
      res.status(200).json({ success: true })
      break
    case "PUT":
      // Update post in database
      let updatedPost = req.body
      await posts.updateOne(
        { _id: updatedPost._id },
        { $set: { title: updatedPost.title, content: updatedPost.content } }
      )
      res.status(200).json({ success: true })
      break
    
  }
}