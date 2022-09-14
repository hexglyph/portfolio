// posts/[id].tsx
import clientPromise from "../../../lib/mongodb"

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
            let postid = req.query.id
            let getpost = await posts.findOne({ id: postid })
            res.json({ status: 200, data: getpost })
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
                { id: updatedPost.id },
                { $set: { 
                    id: updatedPost.id,
                    title: updatedPost.title, 
                    content: updatedPost.content,
                    media: updatedPost.media,
                    fileName: updatedPost.fileName,
                    fileType: updatedPost.fileType
                } }
            )
            res.status(200).json({ success: true })
        break
        
    }
}