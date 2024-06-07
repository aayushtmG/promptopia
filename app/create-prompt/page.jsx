"use client"

import Form from "@components/Form"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const CreatePrompt = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const [submitting, setIssubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  })

  const createPrompt = () => {}
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt
