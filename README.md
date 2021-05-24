# Chat messenger using Socket.io

This is a chat messenger using Node.js and Typescript as the server backend. The web sockets were handled with the socket.io library. PostgreSQL was used to save messages and keep up with chat room data like the amount of people in a room, who is specifically in the room, etc. This was a simple personal project so there are a lot of things that could have been done better.

## Features

- Simple messaging like IRC
- Saved chat logs

## Possible features

- Saving usernames and passwords
  - _Your username is not your personal username meaning that someone can use your username as well_
- Private/hidden rooms with passwords
- Direct links to rooms
- Some security features
- Have time dates adjust to user's timezone

## Technologies used

- Node.js
- Express
- Typescript
- Javascript/HTML/CSS
- Socket.io library
- PostgreSQL
- Docker
- Docker compose
- Yarn

## PostgreSQL Database

_I do not have much experience on how database organization/design is supposed to be._

There is a main database that holds all of the rooms with a few attributes. Those attributes are the room name, amount of people in the room, and a boolean value for if a room is active or not. The room name points to another database that has the individual messages saved. The tables that are referred from the room names have a message, a timestamp, and who said that message.

## Issues or Possible Ones

- Altering the localStorage can possibly cause issues since that's how the username is being saved
- Rework the database to be more efficient (Ex: using id's for rooms, messages, etc.)
- Encrypt text for privacy reasons
