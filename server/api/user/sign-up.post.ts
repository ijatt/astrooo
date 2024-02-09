import { Prisma } from "@prisma/client" 
import prisma from "~/server/db/prisma";
import { UserRequest } from "~/types/user";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<UserRequest>(event);
    if (body === null) {
      return createError({ statusCode: 400, statusMessage: "Bad Request" })
    }

    if (!prisma) {
      return createError({ statusCode: 500, statusMessage: "Internal Server Error" })
    }

    const user = await prisma.users.create({
      data: {
        email: body.email,
        username: body.username,
        password: await hashPassword(body.password),
        first_name: body.firstName,
        last_name: body.lastName
      }
    })

    return user.id
    
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return createError({ statusCode: 400, statusMessage: "Email already exists" })
      } else {
        return createError({ statusCode: 500, statusMessage: "Internal Server Error" })
      }
    }
  }
})
