CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    room_name VARCHAR(20) NOT NULL,
    users INT NOT NULL DEFAULT 0
);

CREATE TABLE messages (
    room_id INT REFERENCES rooms (id),
    message_id SERIAL NOT NULL PRIMARY KEY,
    msg TEXT NOT NULL,
    username VARCHAR(20) NOT NULL,
    sent_date TIMESTAMP NOT NULL
);

CREATE INDEX id_rooms ON rooms (id, room_name);