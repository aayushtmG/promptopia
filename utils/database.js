import mongoose from "mongoose"

let isConnected = false

export const connectToDatabase = async () => {
  mongoose.set("strictQuery")

  if (isConnected) {
    console.log("MongoDb is already connected")
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
    })
    isConnected = true

    console.log("Mongodb connected succesfully!")
  } catch (err) {
    console.log(err)
  }
}
