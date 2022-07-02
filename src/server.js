import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set('view engine', "pug");
app.set("views",__dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req,res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
    socket.on("enter_room", (roomName, done) => {
        console.log(roomName);
        setTimeout(() => {
            done("hi");
        },1000);
    });
});

// const sockets = [];
// wss.on("connection", (socket) => {
//     sockets.push(socket);
//     socket["id"] = "Undefied"
//     console.log("Connected from the Browser.");
//     socket.on("close", () => console.log("Disconnected from the Browser."));
//     socket.on("message", (msg) => {
//         const message = JSON.parse(msg);
//         switch (message.type){
//             case "new_message":
//                 sockets.forEach((aSocket) => 
//                 aSocket.send(`${socket.id}: ${message.payload}`));
//                 break;
//             case "id" : 
//                 socket["id"] = message.payload;
//                 if(message.payload === ""){
//                     socket["id"] = "Undefied"
//                 }
//                 break;
//         }
//     });
// });


console.log("SEVER_RUNNING_SUCCESS!");
const handleListen = () => console.log("Listening on http://localhost:3000");

httpServer.listen(3000, handleListen);

{
    type:"message";
    payload:"hello";
}
{
    type:"id";
    payload:"hello";
}