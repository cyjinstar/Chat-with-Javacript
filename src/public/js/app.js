const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const IDForm = document.querySelector("#id");
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload){
    const msg = {type, payload };
    return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
    console.log("Connect is Stable!👍");
});

socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});

socket.addEventListener("close", () => {
    console.log("Disconnect from Sever.");
});

function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    input.value = "";
}

function handleIDSubmit(event){
    event.preventDefault();
    const input = IDForm.querySelector("input");
    socket.send(makeMessage("id", input.value));
}

messageForm.addEventListener("submit", handleSubmit);
IDForm.addEventListener("submit", handleIDSubmit);