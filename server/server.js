const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
	console.log('new user connected');
	
	socket.on('disconnect', () => {
		console.log("client disconnected");
	});
	
	socket.on('createMessage', (message)=> {
		console.log(message);
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		})
	});
	
	/*
	socket.emit('newMessage', {
		"from": "user123",
		"text": "this is a message from me",
		"createdAt": new Date().getTime()
	});
	*/
});

server.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});