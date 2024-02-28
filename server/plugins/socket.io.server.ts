import { Server } from "socket.io";
import Prisma from "@prisma/client";

interface Message {
  content: string;
  user_id: number;
  conversation_id: number;
}

interface Typing {
  user_id: number;
  conversation_id: number;
}

export default defineNitroPlugin((nitroApp) => {
  let socketServer: Server;
  socketServer = new Server(3001, {
    serveClient: false,
    cors: {
      origin: "*",
    },
  });
  const prisma = new Prisma.PrismaClient();

  socketServer.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      setTimeout(() => {
        socketServer = new Server(3001, {
          serveClient: false,
          cors: {
            origin: "*",
          },
        });
      }, 1000);
    }
  });

  socketServer.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("message", async (message: Message) => {
      const m = await prisma.messages.create({
        data: message,
      });
      socketServer.emit("message", m);
    });

    socket.on("isTyping", (t: Typing) => {
      socketServer.emit("isTyping", t);
    });
  });
});
