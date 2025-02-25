let socket;

document.addEventListener("DOMContentLoaded", function () {
  initializeWebSocket();
});

function initializeWebSocket() {
  socket = new WebSocket("ws://localhost:5000/ws");

  socket.onopen = function () {
    console.log("Соединение установлено");
  };

  socket.onmessage = function (event) {
    let response = JSON.parse(event.data);
    document.getElementById("output").textContent = response.response;
  };

  socket.onclose = function () {
    console.log("Соединение закрыто, повторное подключение...");
    setTimeout(initializeWebSocket, 100);
  };

  socket.onerror = function (error) {
    console.error("Ошибка WebSocket:", error);
  };
}

function sendMessage(message) {
  if (socket.readyState === WebSocket.OPEN) {
    console.log("Sending message:", JSON.stringify(message));
    socket.send(JSON.stringify(message));
  } else {
    console.error("WebSocket не в состоянии OPEN. Текущее состояние:", socket.readyState);
  }
}

function hash() {
  let text = document.getElementById("inputText").value;

  let message = { action: "hash", text: text};
  sendMessage(message);
}


