import { Met } from '../src/met.js';

function sleep(start, sleep) {
	if (Date.now() < Date.parse(start) + sleep) setTimeout(sleep(start, sleep));
}

describe('Jest', () => {

	test('Jest works properly', () => {
		expect(0).toEqual(0);
	});

});

describe('Met object', () => {
	
	test('Pull data from API', async () => {
		let met = new Met();
		await met.search('rembrandt','1600','1700', '', () => {
			expect(met.count).toEqual(36);
		});

	});

});