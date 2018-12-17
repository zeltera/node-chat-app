let socket = io();
socket.on('connect', () => {
	console.log("connected to server");
	
	socket.emit('createMessage', {
		"from": "user321",
		"text": "user321 sent a message",
	});
});

socket.on('disconnect', () => {
	console.log("disconnected from server");
});

socket.on('newMessage', (message) => {
	console.log('newMessage', message);
});