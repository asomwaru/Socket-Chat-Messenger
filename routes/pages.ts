import { Router } from "express";
import { active_rooms, is_available } from "./queries";

export const router: Router = Router();

// page redirects

router.get("/room/:room", (req, res) => {
  res.render("pages/room.ejs", { roomName: req.params.room });
});

router.get("/room/:room/available", async (req, res) => {
  let open: boolean = await is_available(req.params.room);

  res.send({ open });
});

router.get("/", async (_, res) => {
  let available = await active_rooms();

  res.render("pages/home.ejs", { roomName: null, rooms: available });
});

router.get("/home", (_, res) => {
  res.redirect("/");
});

router.get("/login", (_, res) => {
  res.render("pages/login.ejs");
});

router.get("/contact", (_, res) => {
  res.send("Contact page");
  //   res.render("pages/contact.ejs");
});

router.get("/about", (_, res) => {
  res.send("About page");
  //   res.render("pages/about.ejs");
});
