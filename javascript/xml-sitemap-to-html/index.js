const fs = require("fs");
const {
    convertCSVToArray
} = require('convert-csv-to-array');
const exec = require('child_process').exec;

const readCSV = (fileName, callback) => {
    fs.readFile(fileName, "utf8", (err, data) => {
        if (err) {
            throw err;
        }
        callback(data)
    })
}
// use https://www.convertcsv.com/xml-to-csv.htm to convert sitemap.xml to csv file first
// alternative method: https://www.csvjson.com/csv2json
readCSV('./storage/pdfbear-sitemap.csv', (data) => {
    // console.log('csv', data)
    const arrayofObjects = convertCSVToArray(data, {
        separator: ',',
    })
    // console.log('arrayofObjects', arrayofObjects)
    arrayofObjects.forEach(e => {
        const url = e.loc
        // skip the first line with csv headers
        if (url) {
            const regex = /\//g
            const resultName = url.replace(regex, '-')
            const command = `cd results; curl -k ${url} > ${resultName}.html`
            exec(command, function (error, stdout, stderr) {
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });
        }
    })
})

