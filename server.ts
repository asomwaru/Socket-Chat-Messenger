import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Server } from "http";
import { urlencoded } from "body-parser";
import { Server as ioserver } from "socket.io";

import * as db from "./routes/queries";
import { router as pages } from "./routes/pages";

dotenv.config();

const port: number = parseInt(`${process.env.PORT}`) | 8080;
const app = express();
const server = new Server(app);
const io = new ioserver(server);
const database = db.database;

database
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(err));

app.use("/static", express.static(path.join(__dirname, "views")));
app.use(urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(cors());

app.use(pages);

io.sockets.on("connection", (socket) => {
  let room: string = "";

  socket.on("joined", async ({ room_name, username }) => {
    socket.join(room_name);

    socket.broadcast.to(room_name).emit("new_person", username);

    room = room_name;

    await db.update_rooms(room_name, 1);

    const td = new Date("2021-05-28 18:16:27.965");

    console.log(await db.recent_messages("main", td));
  });

  socket.on("send", ({ room_name, msg, username }) => {
    const time_stamp: Date = new Date();

    socket.broadcast
      .to(room_name)
      .emit("output", { msg, username, time_stamp });

    db.get_ID(room_name).then(async (id) => {
      const message: db.Message = {
        room_id: id,
        message: msg,
        username: username,
        sent_date: time_stamp,
      };

      await db.save_message(message);
    });
  });

  socket.on("disconnect", async () => {
    await db.update_rooms(room, -1);
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
