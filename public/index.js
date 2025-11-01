const cookieCounter = document.getElementById("clicks");
const cookieBtn = document.getElementById("cookieBtn");
const buy0Btn = document.getElementById("buy0");
const wss = new WebSocket(`ws://${location.hostname}:5050`);

wss.addEventListener("message", (event) => {
    cookieCounter.textContent = `Clicks: ${event.data}`;
});

buy0Btn.addEventListener("click", async () => {
    const response = await fetch("/buy/1");
    const responseJson = await response.json();
    if (responseJson.message == "item bought"){
        location.reload();
    }
});

cookieBtn.addEventListener("click", () => {
    wss.send("click");
});