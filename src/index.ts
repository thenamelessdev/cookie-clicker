import express, { Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = http.createServer(app);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootdir = path.join(__dirname, "..");
let clicks = 0;
let countBy = 1;
const port = process.env.port || 8080;

const io = new Server(server);


io.on("connection", (socket) => {
    socket.emit("clicks", clicks);
    socket.on("click", (msg) => {
        clicks = clicks + countBy;
        io.emit("clicks", clicks);
    });

});

app.use(express.static(rootdir + "/public"));

app.get("/buy/:id", (req: Request, res: Response): void => {
    const productId = req.params.id;
    
    if (productId == "1"){
        if (clicks >= 100) {
            clicks = clicks - 100;
            countBy = countBy * 2;
            res.json({ message: "item bought" }).status(200);
        }
        else {
            res.json({ error: "not enought balance" }).status(403);
        }
    }
    else {
        res.json({ error: "not found" }).status(404);
    }
});


server.listen({port, host: '0.0.0.0'});