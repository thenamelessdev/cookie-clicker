import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
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
wss.on("connection", (ws) => {
    console.log("websocket connected");
    ws.send(clicks);
    ws.on("message", (message) => {
        clicks = clicks + countBy;
        ws.send(clicks);
    });
});
app.use(express.static(rootdir + "/public"));
app.get("/buy/:id", (req, res) => {
    const productId = req.params.id;
    if (productId == "1") {
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
app.get("/set/:balance", (req, res) => {
    clicks = Number(req.params.balance);
    res.json({ message: "added money" });
});
server.listen(5050);
