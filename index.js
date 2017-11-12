/**
 * Created by eugeneglazkov on 11/5/17.
 */

const settings = require('./settings.json');
const validateFileNames = require('./validateFileNames');
const getPlaceNumbers = require('./getPlaceNumbers');
const fs = require('fs');
const createPrintSettings = require('./createPrintSettings');


const inputPath = './inputFiles/';
let fileNames = [];
let printSettings;
let validFiles;

let folderContent = fs.readdirSync(inputPath);

console.log(folderContent);
folderContent.forEach(file => ~file.indexOf('.pdf') && fileNames.push(file));

validFiles = validateFileNames(fileNames);

if (typeof validFiles === 'string') {
	printSettings = getPlaceNumbers(fileNames);
	printSettings = JSON.stringify(printSettings);
	createPrintSettings(printSettings);
}


console.log(`

	fileNames: ${fileNames}
	validateFileNames: ${validFiles};
	printSettings: ${JSON.stringify(printSettings)}

`);