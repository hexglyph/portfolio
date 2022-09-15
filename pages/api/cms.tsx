// posts.js
import clientPromise from "../../lib/mongodb"

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db("hex")
  let cms = await db.collection("portfolio")

  switch (req.method) {
    case "GET":
      const allItems = await db.collection("portfolio").find({}).toArray()
      res.json({ status: 200, data: allItems })
      break
    case "PUT":
      // Update post in database
      let updatedCMS = req.body
      await cms.updateOne(
        { _id: updatedCMS._id },
        { $set: {
            logo: updatedCMS.logo,            
            title: updatedCMS.title, 
            description: updatedCMS.description,
            bio: updatedCMS.bio,
            skills: updatedCMS.skills,
            social: updatedCMS.social,
            seo: updatedCMS.seo,
            language: updatedCMS.language
          }
        }
      )
      res.status(200).json({ success: true })
      break
    
  }
}