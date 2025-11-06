import express, { Request, Response } from "express";
import http from "http";
import { WebSocketServer, WebSocket } from "ws";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const server = http.createServer(app);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootdir = path.join(__dirname, "..");
let clicks = 0;
let countBy = 1;

const wss = new WebSocketServer({ server });


wss.on("connection", (ws): void => {
    ws.send(clicks);
    setInterval(() => {
        ws.send(clicks)
    }, 1000);
    ws.on("message", (message): void => {
        clicks = clicks + countBy;
        ws.send(clicks);
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

app.get("/set/:balance", (req: Request, res: Response): void => {
    clicks = Number(req.params.balance);
    res.json({ message: "added money" });
});

server.listen(5050);