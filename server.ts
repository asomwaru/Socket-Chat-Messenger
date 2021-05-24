// https://medium.com/weekly-webtips/building-a-multiroom-chat-application-in-node-js-8a8adca5acf2

import path from "path";
import cors from "cors";
import express from "express";
import { Server as ioserver } from "socket.io";
import { urlencoded } from "body-parser";
import { router as pages } from "./routes/pages";
import { Server } from "http";

const port: number = 8080;

const app = express();
const server = new Server(app);
const io = new ioserver(server);

app.use("/static", express.static(path.join(__dirname, "views")));
app.use(urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(cors());

app.use(pages);

io.on("connection", (socket) => {
  socket.on("joined", ({ room, username }) => {
    socket.join(room);

    socket.broadcast.to(room).emit("newPerson", username);
  });

  socket.on("send", ({ msg, username, room }) => {
    const currentTime: Date = new Date();

    socket.broadcast.to(room).emit("output", { msg, username, currentTime });
  });

  socket.on("disconnect", () => {
    // console.log("Someone has left");
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
