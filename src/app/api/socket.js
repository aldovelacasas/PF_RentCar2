import { Server } from "socket.io";

export default function SocketHandler(req, res) {
  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on("send-mes", (obj) => {
      io.emit("receive-mes", obj);
    });
  });

  console.log("Setting Socket");
  res.send();
}
