export default function () {
	var FormatUtil = {
		toReadableNumber: function (number, scale) {
			if (number != null) {
				var decimalen = scale || 2;
				var cleanNumber = parseFloat(number.toString().replace(',', '.'))
				return parseFloat(cleanNumber).toFixed(decimalen).toString().replace('.', ',');
			}
			return null;
		}
	};

	return FormatUtil;
};
