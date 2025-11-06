const cookieCounter = document.getElementById("clicks");
const cookieBtn = document.getElementById("cookieBtn");
const buy0Btn = document.getElementById("buy0");

const socket = io();

socket.on("clicks", (msg) => {
    cookieCounter.textContent = `Clicks: ${msg}`;
});

buy0Btn.addEventListener("click", async () => {
    const response = await fetch("/buy/1");
    const responseJson = await response.json();
    if (responseJson.message == "item bought"){
        location.reload();
    }
});

cookieBtn.addEventListener("click", () => {
    socket.emit("click");
});