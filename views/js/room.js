const socket = io("");
const username = sessionStorage.username;
let messages = $("#messages");
let messageBox = $("#message-field");

const room_name = `${$("#name").text()}`
  .split("Room: ")[1]
  .slice(0, this.length - 4);

const add_message = (msg, username, time_stamp) => {
  const newMsg = `<div class='msg'>
                    <p>${username}:</p> <p>${msg}</p>
                  </div>`;

  messages.append(newMsg);

  $("#messages").animate(
    {
      scrollTop: $("#messages").get(0).scrollHeight,
    },
    0
  );
};

const send_message = async () => {
  let msg = messageBox.val();

  socket.emit("send", { room_name, msg, username });

  add_message(msg, username, new Date());

  messageBox.val("");
};

socket.on("output", ({ msg, username, time_stamp }) =>
  add_message(msg, username, time_stamp)
);

socket.on("new_person", (username) => {
  console.log(`${username} has joined us.`);
});

$("#submitter").on("click", send_message);

$("#message-field").keypress((event) =>
  event.keyCode == 13 && messageBox.val() !== "" ? send_message() : ""
);

window.onload = () => {
  socket.emit("joined", { room_name, username });
};
