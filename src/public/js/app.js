const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(message) {
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
}

function backendDone(msg) {
    console.log("msg : ",msg);
}

function handleMessageSubmit(event) {
    event.preventDefault();
    const input = room.querySelector("#msg input");
    socket.emit("new_message", input.value, roomName, () => {
        addMessage(`You: ${input.value}`);
        input.value = "";
    });
}

function handleIDSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("#UserID");
    socket.emit("UserID", input.value);
    
}

function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room : ${roomName}`
    const msgform = room.querySelector("#msg");
    msgform.addEventListener("submit", handleMessageSubmit);
}

function handleRoomSubmit(event) {
    event.preventDefault();
    const UserIDform = form.querySelector("#UserID");
    const roomInput = form.querySelector("#roomName");
    UserIDform.addEventListener("submit", handleIDSubmit);
    socket.emit(
        "enter_room",
        UserIDform.value,
        roomInput.value,
        showRoom
    );
    roomName = roomInput.value;
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user) => {
    addMessage(`${user} joined!`);
})

socket.on("bye", (left) => {
    addMessage(`${left} left 😢`);
})

socket.on("new_message", addMessage);
socket.on("room_change", (rooms) => {
    const roomList = welcome.querySelector("ul");
    roomList.innerHTML = "";
    if(rooms.length === 0){
        return;
    }
    rooms.forEach(room => {
        const li = document.createElement("li");
        li.innerText = room;
        roomList.append(li);
    });
});
