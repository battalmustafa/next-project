import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let indexesCreated = false

async function createIndexes(client: MongoClient) {
  console.log("Checking if indexes are created...")

  if (indexesCreated) {
    console.log("Indexes already created, skipping index creation.")
    return client
  }

  try {
    const db = client.db("dev")
    console.log("Creating indexes for 'users' collection...")
    await Promise.all([
      db.collection("users").createIndexes([{ key: { email: 1 }, unique: true }])
    ])
    indexesCreated = true
    console.log("Indexes created successfully.")
  } catch (error) {
    console.error("Error creating indexes:", error)
    throw new Error("Failed to create indexes.")
  }

  return client
}

export async function getMongoClient() {
  if (!global._mongoClientPromise) {
    console.log("No cached MongoDB client found. Creating a new connection...")
    const client = new MongoClient(uri)

    try {
      console.log("Connecting to MongoDB...")
      global._mongoClientPromise = client.connect().then(async (client) => {
        console.log("MongoDB connected successfully.")
        return await createIndexes(client)
      })
    } catch (error) {
      console.error("Error connecting to MongoDB:", error)
      throw new Error("MongoDB connection failed.")
    }
  } else {
    console.log("Using cached MongoDB client.")
  }

  console.log("Returning MongoDB client promise.")
  return await global._mongoClientPromise
}

export async function getMongoDb() {
  try {
    console.log("Getting MongoDB database...")
    const mongoClient = await getMongoClient()
    console.log("Returning MongoDB database instance.")
    return mongoClient.db("dev")
  } catch (error) {
    console.error("Error getting MongoDB database:", error)
    throw new Error("Failed to get MongoDB database.")
  }
}
