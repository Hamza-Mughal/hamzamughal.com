var socket = io.connect("http://localhost:8023");
console.log(socket);

socket.on("connection", function(data) {
	console.log("TEST");
   socket.emit("join", "Hello World from client");
});

jmcdowal@gmu.edu