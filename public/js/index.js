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
	//console.log('newMessage', message);
	const formatedTime = moment(message.createdAt).format("h:mm a");
	const template= $('#message-template').html();
	let html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formatedTime
	});
	$('#messages').append(html);
});

socket.on('newLocationMessage', (message) => {
	//console.log('newMessage', message);
	const template = $("#location-message-template").html();
	const formatedTime = moment(message.createdAt).format("h:mm a");
	let html = Mustache.render(template, {
		url: message.url,
		from: message.from,
		createdAt: formatedTime
	});
	$('#messages').append(html);
});


$("#message-form").on("submit", (e)=> {
	e.preventDefault();
	socket.emit('createMessage', {
		from: 'User',
		text: $('[name=message]').val()
	}, (data)=>{
		//this code runs if the server got the message
		$('[name=message]').val("");
	});
});

let sendLocation = $("#sendLocation");
sendLocation.on("click", (e)=>{
	if(!navigator.geolocation){
		return alert("Geolocation not supported by your browser");
	};

	sendLocation.attr('disabled', 'disabled').text('Sending location...');

	navigator.geolocation.getCurrentPosition(function(position){
		console.log(position);
		sendLocation.removeAttr('disabled').text('Send location');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		})
	}, function(err){
		alert("Unable to fetch location");
		sendLocation.removeAttr('disabled').text('Send location');
	})
});
