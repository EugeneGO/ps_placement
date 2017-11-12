function validateFileNames(fileNames) {

	const res = [];

	for (let i = 0; i < fileNames.length; i++) {
		let invalidName = checkFileName(fileNames[i]);
		console.log("invalidName", invalidName);
		if (invalidName) {
			res.push(invalidName);
		}
	}

	function checkFileName(fileName) {
		let errors = [];
		let fnParams = fileName.split('-');
		let oId = isCorrectOrderId(fnParams[0]);
		let pId = isCorrectProdId(fnParams[2]);
		let lType = isCorrectLayerType(fnParams[3]);

		if (typeof oId === 'string') {
			errors.push(oId);
		}
		if (typeof pId === 'string') {
			errors.push(pId);
		}
		if (typeof lType === 'string') {
			errors.push(lType);
		}

		return errors.length ? {
			filename: fileName,
			errors: errors
		} : false

	}

	function isCorrectOrderId(orderId) {
		return !isNaN(orderId) || "Order ID is wrong;";
	}

	function isCorrectProdId(prodId) {

		prodId = prodId.split('_');

		return (!isNaN(prodId[0]) && /black|gold|rose|silver|grey|white|red|pink|clear|transparent/i.test(prodId[1])) || "Prod ID is wrong;";
	}

	function isCorrectLayerType(layerType) {
		return /white|details|cmyk/i.test(layerType) || "Type layer is wrong;";
	}

	function printWrongNames(wrongNamesArr) {
		for (let i = 0; i < wrongNamesArr.length; i++) {
			console.log("Following file: " + wrongNamesArr[i].filename + " has " + wrongNamesArr[i].errors.join(', ') + " error");
		}
	}

	return res.length ? printWrongNames(res) : "All file names are correct!";

}

module.exports = validateFileNames;
