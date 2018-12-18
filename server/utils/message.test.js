const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', ()=>{
	it('should generate the correct message object', ()=> {
		let from = 'Ady';
		let text = "some text";
		let message = generateMessage(from, text);
		
		expect(typeof message.createdAt).toBe('number');
		expect(message).toMatchObject({from, text});
	})
});