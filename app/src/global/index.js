import angular from 'angular';

import readableNumber from './filters/readableNumber.filter';
import FormatUtil from './utils/FormatUtil';

export default angular
	.module('rentetoolApp.globalResources', [])
	.filter('readableNumber', readableNumber)
	.factory('FormatUtil', FormatUtil)
	.name;
