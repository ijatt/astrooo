import User from "~/server/models/user"
import { checkPassword } from "~/server/utils/check-password"
import { UserSignInRequest } from "~/types/user"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<UserSignInRequest | null>(event)
    if(!body) return createError({ statusCode: 400, statusMessage: "Bad Request" })

    const user = await User.findOne({ email: body.email }).select("+password")
    if(!user) return createError({ statusCode: 404, statusMessage: "User not found" })

    const isPasswordValid = await checkPassword(body.password, user.password)
    if(!isPasswordValid) return createError({ statusCode: 401, statusMessage: "Invalid password" })

    const token = signToken({ id: user.id })
    setCookie(event, 'authorization', token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    })

    return user.username
  } catch (error) {
    return createError({ statusCode: 500, statusMessage: "Internal Server Error" })
  }
})
