import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import { connectToDatabase } from "@utils/database"
import User from "@models/user"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      clientId: process.env.GOOGLE_ID,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email })
      session.user.id = sessionUser._id.toString()
      return session
    },
    async signIn({ profile }) {
      console.log("PROFILE:", profile)
      try {
        await connectToDatabase()

        //check if user exists
        const userExists = await User.findOne({ email: profile.email })

        // if user doesnt exists create one
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          })
        }
        return true
      } catch (error) {
        console.log("Error: ", error)
      }
    },
  },
})

export { handler as GET, handler as POST }
