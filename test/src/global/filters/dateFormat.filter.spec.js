import jasmine from 'jasmine-core';

import readableNumberFilter from 'readableNumber.filter';

var describe = jasmine.describe;
var it = jasmine.it;
var expect = jasmine.expect;

describe('readableNumber Filter', function () {
	describe('readableNumber Filter formatting', () => {
		it('it should support optional arguments', function () {
			expect(readableNumberFilter("50.3")).toEqual("50,30");
		});
	});
});
