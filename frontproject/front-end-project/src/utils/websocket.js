// Create WebSocket connection.
const socket = new WebSocket("ws://43.138.82.31:8081/websocket/1");

// Connection opened
socket.addEventListener("open", function (event) {
  socket.send("Hello Server!");
});

// Listen for messages
socket.addEventListener("message", function (event) {
  console.log("Message from server ", event.data);
});

export default socket;
