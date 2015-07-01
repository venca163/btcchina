/*
 * GENERAL FUNCTIONS
 */
var chalk = require('chalk');

module.exports = {
	
	extend: function(target) {
		
		target = target || {};
		
		var sources = [].slice.call(arguments, 1);
		sources.forEach(function (source) {
			for (var prop in source) {
				target[prop] = source[prop];
			}
		});
		return target;
	},
	
	isArray: function (obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	},
	
	succ: function() {
		return console.log(chalk.green.apply(this, arguments));
	},
	
	err: function() {
		return console.log(chalk.red.apply(this, arguments));
	}
	
};

