import Prompt from "@models/prompt"
import { connectToDatabase } from "@utils/database"

export const GET = async (request, { params }) => {
  try {
    await connectToDatabase()

    const prompt = await Prompt.findById(params.id)
    if (!prompt) return new Response("Prompt not found ", { status: 404 })
    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    return new Response(error, { status: 500 })
  }
}

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json()
  try {
    const existingPrompt = await Prompt.findById(params.id)

    if (!existingPrompt)
      return new Response("Prompt doesnt exist!", { status: 404 })

    existingPrompt.prompt = prompt
    existingPrompt.tag = tag

    await existingPrompt.save()

    return new Response(JSON.stringify(existingPrompt), { status: 200 })
  } catch (error) {
    return new Response(error, { status: 500 })
  }
}

export const DELETE = async (request, { params }) => {
  try {
    await connectToDatabase()
    await Prompt.findByIdAndDelete(params.id)
    return new Response(`Deleted ${params.id}`, { status: 200 })
  } catch (error) {
    return new Response(error, { status: 500 })
  }
}
