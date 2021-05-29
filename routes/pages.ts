import { Router } from "express";
// import { database } from "./queries";

export const router: Router = Router();

// accessing past messages

router.get("/room/:room", (req, res) => {
  res.render("pages/room.ejs", { roomName: req.params.room });
});

// page redirects

router.get("/room/:room", (req, res) => {
  res.render("pages/room.ejs", { roomName: req.params.room });
});

router.get("/", (_, res) => {
  res.render("pages/home.ejs", { roomName: null });
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
