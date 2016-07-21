import angular from 'angular';
import 'angular-mocks';

import testModule from '../../../../app/src/global/index';

const { module, inject } = angular.mock;

describe('readableNumber Filter', () => {
	beforeEach(module(testModule));

	let $filter;

	beforeEach(inject((_$filter_) => {
		$filter = _$filter_;
	}));

	describe('readableNumber Filter formatting', () => {
		it('it should support optional arguments', () => {
			const result = $filter('readableNumber')("50.3");
			expect(result).toEqual("50,30");
		});
	});
});
