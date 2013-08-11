var fs = require('fs');

fs.readFile('./header.html', function (err, header) {
	if (err) throw err;
	fs.readFile('./result.html', function (err, result) {
		if (err) throw err;
		fs.readFile('./footer.html', function (err, footer) {
			if (err) throw err;
			fs.writeFile('./index.html', header + result + footer, function (err) {
				if (err) throw err;
			});
		});
	});
});