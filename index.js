const express = require("express");
const app = express();
const http = require("http");
const expressServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(expressServer);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("message", (message) => {
    socket.broadcast.emit("message", message);
  });
});

const port = process.env.PORT || 3000;

expressServer.listen(port, () => {
  console.log("listening on *:3000");
});
