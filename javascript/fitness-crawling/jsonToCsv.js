const { parse } = require('json2csv');
const fs = require("fs");

const fields = ['id', 'title', 'videoUrl'];
const opts = { fields };
const myData = require('./fitness.json');

const jsonToCsv = async () => {
	try {
		const csv = parse(myData, opts);
		// console.log(csv);
		await fs.writeFile('./fitness.csv',
			csv,
			function (err) {
				if (err) throw err;
			}
		)
	} catch (err) {
		console.error(err);
	}
}

jsonToCsv();