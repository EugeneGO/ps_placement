const settings = require('./settings.json');

function getOrderId(fileName) {
	return fileName.split('-')[0];
}

function getDeviceType(fileName) {
	let deviceId = fileName.split('-')[2];
	let deviceModel = deviceId[0];
	let deviceSize = deviceId[1];
	let deviceType;

	if (deviceModel === '5') {
		deviceType = 'five';
	} else if (deviceSize === '1') {
		deviceType = 'plus';
	} else {
		deviceType = 'others';
	}

	return deviceType;
}

function createFileSetting(fileName, place) {
	let fnParams = fileName.split('-');
	let orderId = fnParams[0];
	let inkType = fnParams[3].split('.')[0];

	let tablePlace = settings.coordinates[place];

	return {
		fileName,
		orderId,
		inkType,
		place,
		tablePlace
	}
}

function getPlaceNumbers(files) {

	let fileType, orderId, prevId, typePlaceArray, place, fileSettings;
	let res = [];
	let deviceTypeSettings = {
		five: settings.deviceTypePlaces.five.slice(),
		plus: settings.deviceTypePlaces.plus.slice(),
		others: settings.deviceTypePlaces.others.slice()
	};


	for (let i = 0; i < files.length; i++) {
		fileType = getDeviceType(files[i]);
		orderId = getOrderId(files[i]);

		if (orderId !== prevId && typePlaceArray) {
			typePlaceArray.shift();
		}

		typePlaceArray = deviceTypeSettings[fileType];
		place = typePlaceArray[0];
		fileSettings = createFileSetting(files[i], place);
		res.push(fileSettings);
		prevId = orderId;

	}

	return res;

	/*let res = [];
	let place = 0;
	let currentId, prevId;


	for (let i = 0; i < files.length; i++ ){
		let fileSettings;
		currentId = getOrderId(files[i]);
		if (currentId !== prevId) {
			place+=1;
		}
		fileSettings = createFileSetting(files[i], place);
		res.push(fileSettings);
		prevId = currentId;
	}

	return res;*/
}

module.exports = getPlaceNumbers;


