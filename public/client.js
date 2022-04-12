const socket = io();

let textArea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message_area");
let userName = "";

function knowUser() {
  do {
    userName = prompt("Enter A Short Name 😄").trim();
  } while (!userName);
}
knowUser();

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}

function appendMessage(userMsg, msgType, user = "") {
  let currectUserMsg = undefined;
  if (user) {
    currectUserMsg = { ...userMsg };
    currectUserMsg.user = "&#9679" + currectUserMsg.user;
  }

  let mainDiv = document.createElement("div");
  let clsName = msgType;
  mainDiv.classList.add(clsName, "message");
  let markup = `
        <h4 class="user_name">${user ? currectUserMsg.user : userMsg.user}</h4>
        <p>${user ? currectUserMsg.message : userMsg.message}</p>
    `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

// Outgoing Message You->Everyone
function sendMessage(msg) {
  let userMsg = {
    user: userName,
    message: msg.trim(),
  };

  // Append the message
  appendMessage(userMsg, "outgoing", "You");
  textArea.value = "";
  scrollToBottom();

  // Send to server via websocket connection
  socket.emit("message", userMsg);
}

textArea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

// Recieve Messages Everyone->You
socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});
