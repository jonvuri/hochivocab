var fs = require('fs');
var csv = require('csv');


var escape = function(string) {
	return ('' + string).replace(/["'\\\n\r\u2028\u2029]/g, function (character) {
		switch (character) {
			case '"':
			case "'":
			case '\\':
				return '\\' + character;
			case '\n':
				return '\\n';
			case '\r':
				return '\\r';
			case '\u2028':
				return '\\u2028';
			case '\u2029':
				return '\\u2029';
		}
	});
};


csv()
	.from.path('./main.csv', {columns: ['chinese', 'english', 'category', 'examples', 'pinyin']})
	.to('./result.html')
	.transform(function (row, index) {
		if (index === 0)
			return '';
		
		var props = [];

		props.push('index: "' + index + '"');

		if (row.chinese)
			props.push('chinese: "' + escape(row.chinese) + '"');

		if (row.pinyin)
			props.push('pinyin: "' + escape(row.pinyin) + '"');

		if (row.english)
			props.push('english: "' + escape(row.english) + '"');

		if (row.category)
			props.push('category: "' + escape(row.category) + '"');

		if (row.examples)
			props.push('examples: "' + escape(row.examples) + '"');

		return 'vocabList[' + (index - 1) + '] = {' + props.join(', ') + '};\n';
	});