import { MongoClient } from 'mongodb'

let cachedClient = null
let cachedDb = null

async function connectToDatabase(uri) {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  //Deprecated, use .slice instead
  //const db = await client.db(new URL(uri).pathname.substr(1))
  const db = await client.db(uri?.slice(uri.lastIndexOf('/') + 1))

  cachedClient = client
  cachedDb = db

  return { client, db }
}

export default async function clientPromise (req, res) {
  const { client, db } = await connectToDatabase(process.env.MONGODB_URI)

  const collection = db.collection('portfolio')

  const portfolio = await collection.find({}).toArray()

  res.status(200).json({ portfolio })
}

