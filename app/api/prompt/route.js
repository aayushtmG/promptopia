import Prompt from "@models/prompt"
import { connectToDatabase } from "@utils/database"

export const GET = async (request) => {
  try {
    await connectToDatabase()

    const allPrompts = await Prompt.find().populate("creator")
    return new Response(JSON.stringify(allPrompts), { status: 200 })
  } catch (error) {
    return new Response("Failed to fetch posts", { status: 500, error })
  }
}
