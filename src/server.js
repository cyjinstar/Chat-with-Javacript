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
    socket["UserID"] = "Noname"
    socket.onAny((event) => {
        console.log(`Socket Event : ${event}`)
    });
    socket.on("enter_room", (UserID, roomName, done) => {
        socket.join(roomName);
        socket["UserID"]=`${UserID}`;
        done();
        socket.to(roomName).emit("welcome", socket.UserID);
    });
    socket.on("disconnecting", () => {
        socket.rooms.forEach(room => {
            socket.to(room).emit("bye", socket.UserID)
        });
    });
    socket.on("new_message", (msg, room, done) => {
        socket.to(room).emit("new_message", `${socket.UserID}: ${msg}`);
        done();
    });
    socket.on("UserID", (UserID) => (socket["UserID"] = UserID));
});

console.log("SEVER_RUNNING_SUCCESS!");
const handleListen = () => console.log("Listening on http://localhost:3000");

httpServer.listen(3000, handleListen);

{
    type:"message";
    payload:"hello";
}
{
    type:"UserID";
    payload:"hello";
}