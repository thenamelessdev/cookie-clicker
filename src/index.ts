import express, { Request, Response } from "express";
import { WebSocketServer, WebSocket } from "ws";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootdir = path.join(__dirname, "..");
let clicks = 0;
let countBy = 1;

const wss = new WebSocketServer({ port: 8080 });


wss.on("connection", (ws): void => {
    console.log("websocket connected");
    ws.send(clicks);
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
            countBy = 2;
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

app.listen(5050);