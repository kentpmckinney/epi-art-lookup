

describe('Jest', () => {

	beforeEach(() => {
	});

	test('Jest works properly', () => {
		expect(0).toEqual(0);
	});

});

describe('Met object', () => {

	beforeEach(() => {
		let met = Met();
	});

	test('Met object pulls data successfully', () => {
		met.search('rembrandt','1600','1700');
		expect(met.items.length).toEqual(36);
	});
	
});