import { H3Error } from "h3"
import { UserData } from "~/types/user"
import User from "~/server/models/user"
import { checkAccessToken } from "~/server/utils/check-token"

export default defineEventHandler(async (event) => {
  try {
    const userID = await checkAccessToken(event)
    
    if(!userID) return createError({ statusCode: 401, statusMessage: "Unauthorized" })

    const user = await User.findById(userID).select("-password")
    if(!user) return createError({ statusCode: 404, statusMessage: "User not found" })

    return user as unknown as UserData
  } catch (error) {
    return createError({ statusCode: 500, statusMessage: "Internal Server Error" })
  }
})
