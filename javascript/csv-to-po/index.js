const fs = require('fs');
const {
	convertCSVToArray
} = require('convert-csv-to-array');

const readCSV = (fileName, callback) => {
	fs.readFile(fileName, "utf8", (err, data) => {
		 if (err) {
		 	throw err;
		 }
		callback(data)
	})
}

readCSV('./storage/Dating-HU-Translations.csv', (data) => {
	// console.log('csv', data)
	const arrayofObjects = convertCSVToArray(data, {
		separator: ',',
	})
	console.log('arrayofObjects', arrayofObjects)
})

// alternative method: https://www.csvjson.com/csv2json