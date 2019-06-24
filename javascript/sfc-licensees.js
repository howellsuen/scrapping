const puppeteer = require("puppeteer");
const fs = require("fs");

const scrapSFCLicensees = async pageNum => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.goto(
		`https://webb-site.com/dbpub/SFClicensees.asp?p=${pageNum}&s=namup&h=Y&d=&a=0`
	);
	// execute standard javascript in the context of the page.
	const data = await page.evaluate(() => {
		const tdList = Array.from(document.querySelectorAll("td"));
		return tdList.map(td => td.textContent);
	});

	await browser.close();

	const temp = [];
	const numOfFields = 7;

	for (let i = 0; i < data.length; i += numOfFields) {
		temp.push(data.slice(i, i + numOfFields));
	}
	// console.log("temp", temp);
	const result = temp.filter(e => {
		return e[4] === "RO"; // select RO role only
	});

	result.map(e => {
		e.splice(0, 1); // remove extra fields
		e.splice(1, 2);
		e.splice(3, 1);
		// console.log("e", e);
		e[0] = e[0].split(","); // start spliting name string (last, first, middle, Chinese name)
		e[0][1] = e[0][1]
			.trimStart() // remove beginning white space
			.replace(/\([\w:\d]*\)/, ""); // remove string in brackets
		if (e[0][1].match(/([^A-Za-z\d\s-,.])/)) {
			// if contain Chinese characters, no middle name
			e[0][1] = e[0][1].replace(/([^A-Za-z\d\s-,.])/, ",,$1");
			// console.log("e[0][1]-if", e[0][1]);
		} else {
			e[0][1] = e[0][1].replace(/\s/, ","); // add ',' after first name
			e[1] = "," + e[1];
			// console.log("e[1]", e[1]);
		}
		// console.log("e[0][1]", e[0][1]);
		return e;
	});
	// console.log("result", result);
	return result.join("\n");
};

const pageNumList = [1440, 1441, 1445, 49572, 21177, 45382, 14215]; // set required page numbers to scrap

pageNumList.forEach(pageNum => {
	scrapSFCLicensees(pageNum).then(result => {
		fs.writeFile(
			`./sfc-licensees-data/sfc-licensees-${pageNum}.csv`,
			result,
			function (err) {
				if (err) throw err;
				console.log("Done!");
			}
		);
	});
})
