var stackFormatted = exports;
var colors = require('colors');
require('stack-json');

stackFormatted._createStackTrace = function(error, stack) {
	var spacer = new Array(100).join(' ');
	var widths = [0, 0, 0, 0];

	var lines = stack.frames.map(function(frame) {

		var color = (frame.pkgType === 'main') ? colors.green : (frame.pkgType === 'node') ? colors.grey : null;
		var line = ['' + [frame.pkg.name], '' + [frame.pkg.version], frame.filename + ':' + frame.line + ':' + frame.column, '' + (frame.functionName || '(anon)'), color];

		for (var i = 0; i < 4; i++) {
			widths[i] = Math.max(widths[i], line[i].length);
		}

		return line;
	}).map(function(line) {

		var text = '';
		for (var i = 0; i < 4; i++) {
			text += '  ' + line[i] + spacer.substring(0, widths[i] - line[i].length);
		}

		var color = line[4];
		if (color) {
			text = color(text);
		}

		return text;
	}).join('\n');

	return error.toString() + '\n' + lines;
};

Object.defineProperty(Error.prototype, 'stackFormatted', {
	get: function() {
		var stack = stackFormatted._createStackTrace(this, this.stackJSON);

		// Cache the formatted output.
		Object.defineProperty(this, 'stackFormatted', {
			value: stack
		});

		return stack;
	}
});
