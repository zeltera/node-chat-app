let socket = io();
socket.on('connect', () => {
	console.log("connected to server");
	
	/*
	socket.emit('createMessage', {
		"from": "user321",
		"text": "user321 sent a message",
	});
	*/
});

socket.on('disconnect', () => {
	console.log("disconnected from server");
});

socket.on('newMessage', (message) => {
	console.log('newMessage', message);
	let li = $('<li></li>');
	li.text(`${message.from}: ${message.text}`);
	$('#messages').append(li);
});

socket.on('newLocationMessage', (message) => {
	console.log('newMessage', message);
	let li = $('<li></li>');
	li.html(`${message.from}: <a href="${message.url}" target="_blank">${message.url}</a>`);
	$('#messages').append(li);
});


$("#message-form").on("submit", (e)=> {
	e.preventDefault();
	socket.emit('createMessage', {
		from: 'User',
		text: $('[name=message]').val()
	}, (data)=>{
		
	});
});

let sendLocation = $("#sendLocation");
sendLocation.on("click", (e)=>{
	if(!navigator.geolocation){
		return alert("Geolocation not supported by your browser");
	};
	navigator.geolocation.getCurrentPosition(function(position){
		console.log(position);
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		})
	}, function(err){
		alert("Unable to fetch location");
	})
});