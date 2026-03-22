import { randomUUID } from "node:crypto";
import { WebSocketServer } from "ws";
import { prisma } from "@repo/db/client";

const server = new WebSocketServer({ port: 3001 });

server.on("connection", (socket) => {
  void (async () => {
    try {
      const user = await prisma.user.create({
        data: {
          username: `ws_${Date.now()}_${randomUUID()}`,
          password: randomUUID(),
        },
      });

      socket.send(`You are connected to the server as ${user.username}`);
    } catch (error) {
      console.error("Failed to create websocket user:", error);
      socket.send("Connected, but failed to create user in database.");
    }
  })();
});

console.log("WebSocket server listening on port 3001");