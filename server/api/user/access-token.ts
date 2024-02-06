import User from "~/server/models/user"

export default defineEventHandler(async (event) => {
  try {
    const header = getHeader(event, "cookie")
    if(!header || !header.startsWith("authorization")) return createError({ statusCode: 401, statusMessage: "Unauthorized" })
    
    const authorization = header.split("=")[1]
    const decodedToken = verifyToken(authorization)  
    if(!decodedToken) return createError({ statusCode: 401, statusMessage: "User session is not valid" })
    
    const user = await User.findById((decodedToken as any).id)
    if(!user) return createError({ statusCode: 404, statusMessage: "User not found" })

    const token = signToken({ id: user.id })    
    return token
    
  } catch (error) {
    return createError({ statusCode: 500, statusMessage: "Internal Server Error" })
  }
})
