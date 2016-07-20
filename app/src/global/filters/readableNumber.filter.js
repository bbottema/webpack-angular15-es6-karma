export default /*@ngInject*/ function (FormatUtil) {
	return function(input, scale, defaultValue) {
		return input ? FormatUtil.toReadableNumber(input, scale) : defaultValue;
	}
};
