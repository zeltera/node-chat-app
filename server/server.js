const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message.js');

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
	
	// emit an 'admin' message to inform about a new join to the chat
	socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app."));
	
	socket.broadcast.emit('newMessage', generateMessage("Admin", "New user joined."));
	
	socket.on('createMessage', (message, callback)=> {
		console.log(message);
		  
		//this code sends the event for everyone connected
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback('This is calback from server');
		/*
		//this code sends the event for everyone connected, except the sender
		socket.broadcast.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});
		*/
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