import { PrismaClient } from "@prisma/client"

export default defineEventHandler(async (event) => {
  try {

    const cookie = getCookie(event, "authorization")
    
    if(!cookie) return createError({ statusCode: 401, statusMessage: "User is not authorized" })


    const decodedToken = verifyToken(cookie)  
    if(!decodedToken) return createError({ statusCode: 401, statusMessage: "User session is not valid" })
    
    const prisma = new PrismaClient()
    const user = await prisma.users.findUniqueOrThrow({
      where: {
        id: decodedToken.id
      }
    })
    if(!user) return createError({ statusCode: 404, statusMessage: "User not found" })

    const token = signToken({ id: user.id })    
    return token
    
  } catch (error) {
    console.log(error);
    
    return createError({ statusCode: 500, statusMessage: "Internal Server Error" })
  }
})
