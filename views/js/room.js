const socket = io("");
const username = sessionStorage.username;
let messages = $("#messages");
let messageBox = $("#message-field");

const roomName = `${$("#name").text()}`
  .split("Room: ")[1]
  .slice(0, this.length - 4);

const addMessage = (msg, username, timeStamp) => {
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

const sendMessage = () => {
  let msg = messageBox.val();

  socket.emit("send", { roomName, msg, username });
  addMessage(msg, username, new Date());

  messageBox.val("");
};

$("#submitter").on("click", sendMessage);

$("#message-field").keypress((event) =>
  event.keyCode == 13 && messageBox.val() !== "" ? sendMessage() : ""
);

socket.on("output", ({ msg, username, timeStamp }) =>
  addMessage(msg, username, timeStamp)
);

socket.on("newPerson", (username) => {
  console.log(`${username} has joined us.`);
});

window.onload = () => {
  socket.emit("joined", { roomName, username });
};
