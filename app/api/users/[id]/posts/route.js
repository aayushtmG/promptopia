import Prompt from "@models/prompt"
import User from "@models/user"
import { connectToDatabase } from "@utils/database"

export const GET = async (request, { params }) => {
  try {
    await connectToDatabase()
    console.log(params.id)
    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator")
    return new Response(JSON.stringify(prompts))
  } catch (error) {
    return new Response(error)
  }
}
