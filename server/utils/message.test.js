const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
	it('should generate the correct message object', ()=> {
		let from = 'Ady';
		let text = "some text";
		let message = generateMessage(from, text);
		
		expect(typeof message.createdAt).toBe('number');
		expect(message).toMatchObject({from, text});
	})
});

describe('generateLocationMessage', ()=>{
	it('should generate the correct location message object', ()=> {
		let from = 'Ady';
		let long = 12;987654
		let lat = 13.1234567;
		let message = generateLocationMessage(from, lat, long);
		let url = `https://google.com/maps/?q=${lat},${long}`
		
		expect(typeof message.createdAt).toBe('number');
		expect(typeof message.url).toBe('string');
		expect(message.url).toBe(url);
	})
});