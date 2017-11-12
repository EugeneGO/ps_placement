/**
 * Created by eugeneglazkov on 11/12/17.
 */
const fs = require('fs');

function createPrintSettings(content) {
	fs.writeFile("./printSettings.json", content, 'utf8', function (err) {
		if (err) {
			return console.log(err);
		}

		console.log("The file was saved!");
	});
}

module.exports = createPrintSettings;