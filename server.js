const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = require("./app");

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Socket.io connected...");
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});

const port = process.env.PORT || 3000;
const appServer = httpServer.listen(port, () => {
  console.log(`Listening on Port:${3000}`);
});

module.exports = io;
