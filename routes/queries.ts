import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

export interface Message {
  room_id: number;
  message: string;
  username: string;
  sent_date: Date;
}

export interface Room {
  room_name: string;
  users: number;
}

export const database = new Client({
  user: process.env.DB_USERNAME,
  password: `${process.env.DB_PASSWORD}`,
  host: process.env.DB_URL,
  database: process.env.DB_DATABASE,
  port: parseInt(`${process.env.DB_PORT}`),
});

// Database helper functions

export async function active_rooms() {
  const query: string = `SELECT * FROM rooms WHERE users>0;`;

  return (await database.query(query, [])).rows;
}

export async function get_ID(room_name: string) {
  const query: string = `SELECT id FROM rooms WHERE room_name=$1::text;`;

  return (await database.query(query, [room_name])).rows[0].id;
}

// Update the database

export async function save_message(msg: Message) {
  const query: string = `INSERT INTO messages(room_id, msg, username, sent_date) VALUES($1::int, $2::text, $3::text, $4::timestamp)`;

  await database.query(query, [
    msg.room_id,
    msg.message,
    msg.username,
    msg.sent_date,
  ]);
}

export async function update_rooms(room_name: string, value: number) {
  const query: string = `UPDATE rooms SET users=users+$1::int WHERE room_name=$2::text`;

  await database.query(query, [value, room_name]);
}

export async function recent_messages(room_name: string, date: Date) {
  let info = await get_ID(room_name).then(async (id) => {
    const query: string = `SELECT * FROM messages WHERE room_id=$1::int AND sent_date<$2::timestamp LIMIT 15;`;

    return (await database.query(query, [id, date])).rows;
  });

  return info;
}

export async function is_available(room_name: string) {
  const query: string = `SELECT users FROM rooms WHERE room_name=$1::text`;

  let val: boolean =
    (await database.query(query, [room_name])).rows[0].users == 0;

  return val;
}
