$("#submitter").on("click", () => {
  let messageBox = $("#message-field");
  let room = $("#room-name");

  let text = `${room.text()}`.toLowerCase();

  socket.emit(text, messageBox.val());
  messageBox.val("");
});

$("#changer").on("click", () => {
  console.log("Changer clicked");

  let messageBox = $("#room-changer");
  let room = $("#room-name");

  let text = `${messageBox.val()}`.toLowerCase();

  room.text(text);
});
