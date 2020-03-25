import { Met } from '../src/met.js';

describe('Jest', () => {

	test('Jest works properly', () => {
		expect(0).toEqual(0);
	});

});

describe('Met object', () => {

	test('Met object pulls data successfully', () => {
		let met = new Met();
		window.items = [];
		met.callback = (item) => { window.items.push(item); console.log(item);	}
		met.search('rembrandt','1600','1700');
		expect(window.items.length).toEqual(36);
	});
	
});