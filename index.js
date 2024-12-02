import express from "express";
import { Server } from "socket.io";
import http from "http";

export default (req, res) => {
    const app = express();
    const server = http.createServer(app);
    const io = new Server(server);
    io.on("connection", (socket) => {
        socket.on("user-joined-chat", succmsg => {
            socket.broadcast.emit("user-joined", succmsg)
            console.log(`User who connected: ${succmsg}`)
        });
        socket.on("message", message => {
            socket.emit("send-message", message)
            socket.broadcast.emit("recieve-message", message)
        });
        socket.on("user-left-chat", dismsg => {
            socket.disconnect(true)
            console.log(`User who disconnected: ${dismsg}`)
            socket.broadcast.emit("user-left", dismsg)
        });
    });
    app.set("view engine", "ejs");
    app.use(express.static("public"));

    app.get("/", (req, res) => {
        res.render("template")
    });

    server.listen(2000, () => {
        console.log("Server is running on port 2000")
    });

    res.status(200).send("Serverless function for vercel")
}