"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Profile from "@components/Profile"

const MyProfile = () => {
  const { data: session } = useSession()
  const [posts, setPosts] = useState([])
  const handleEdit = async () => {}
  const handleDelete = async (post) => {
    console.log("deleted")
    const response = await fetch(`/api/prompt/${post._id}`, {
      method: "DELETE",
    })
    console.log(response)
  }

  const fetchPosts = async () => {
    // const response = await fetch(`/api/users/${session?.user.id}/posts`)
    const response = await fetch(`/api/users/${session?.user.id}/posts`)
    const data = await response.json()
    setPosts(data)
  }
  useEffect(() => {
    if (session?.user.id) {
      fetchPosts()
    }
  }, [session?.user.id])

  return (
    <Profile
      name={"My"}
      desc="Welcome to your personlized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
