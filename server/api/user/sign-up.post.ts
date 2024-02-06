import { UserRequest } from "~/types/user"
import User from "~/server/models/user"
import { hashPassword } from "~/server/utils/hash-password";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<UserRequest | null>(event);
    if (body === null) {
      return createError({ statusCode: 400, statusMessage: "Bad Request" })
    }
   
    const user = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: await hashPassword(body.password),
      username: body.username,
    })   

    return user.id

  } catch (error) {
    return createError({ statusCode: 500, statusMessage: "Internal Server Kontol" })
  }
})
