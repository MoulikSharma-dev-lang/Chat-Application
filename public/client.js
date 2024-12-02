//CONNECTING SOCKET.IO WITH FRONTEND JAVASCRIPT
const socket = io("http://localhost:2000");

//GETTING HTML ELEMENTS
const MessageContainer = document.querySelector(".messages");
const MessageData = document.getElementById('message');
const SendButton = document.querySelector("#sendbtn");
const DiconnectButton = document.querySelector("#disbtn");

//GETTING USERS
const User = prompt("Enter your name:");
localStorage.setItem(User, "Chat-Users");
console.log(localStorage);

socket.emit("user-joined-chat", `${User}`)
socket.on("user-joined", name => {
    let MessageContainerChild = document.createElement("p")
    MessageContainerChild.innerHTML = `${name} joined the chat!`
});

//FUNCTION WHICH WILL APPEND A PARAGRAPH WITH THE MESSAGE AND COLOR
const AppendChild = (message, color) => {
    let MessageContainerChild = document.createElement("p")
    MessageContainerChild.innerHTML = `<b>${User}</b>: ${message}`
    MessageContainerChild.classList.add("message")
    MessageContainerChild.classList.add(color)
    MessageContainer.append(MessageContainerChild)
};

//HANDLING SOCKET.IO EVENTS
SendButton.addEventListener("click", e => {
    e.preventDefault()
    const Value = MessageData.value
    if (Value == "") {
        alert("Please write your message")
    } else {
        socket.emit("message", Value)
    }
});
socket.on("send-message", data => {
    AppendChild(data, "green")
    MessageData.value = ""
});
socket.on("recieve-message", data => {
    AppendChild(data, "red")
});
DiconnectButton.addEventListener("click", e => {
    e.preventDefault()
    socket.emit("user-left-chat", `${User}`)
});
socket.on("user-left", name => {
    let MessageContainerChild = document.createElement("p")
    MessageContainerChild.innerHTML = `${name} left the chat!`
    MessageContainer.append(MessageContainerChild)
})